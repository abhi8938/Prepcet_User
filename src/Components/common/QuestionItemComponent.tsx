import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

type props = {
  item: any;
  index: number;
};
const ChoiceItem = ({option, correct, type}: any) => {
  return (
    <TouchableRipple
      style={[styles.choiceparent, correct && styles.active]}
      centered={true}
      rippleColor={`${theme.COLORS.HEADER}50`}
      onPress={() => console.log('pressed')}
      borderless={true}>
      <View>
        <Text style={styles.choiceText}>{option}</Text>
        {type === 'IMAGE' && (
          <Image source={{uri: option}} style={styles.choiceImage} />
        )}
      </View>
    </TouchableRipple>
  );
};

const SolutionComponent = ({solution}: any) => {
  return (
    <View style={styles.solutionContainer}>
      <View style={styles.sectionHeadingContainer}>
        <Text style={styles.sectionHeading}>Solution :</Text>
      </View>
      <Text style={styles.noteText}>{solution}</Text>
    </View>
  );
};

const NoteInputComponent = ({onAdd, note, onEdit}: any) => {
  if (note) {
    return (
      <View
        style={[
          styles.solutionContainer,
          {backgroundColor: theme.COLORS.DEFAULT},
        ]}>
        <View style={styles.sectionHeadingContainer}>
          <Text style={styles.sectionHeading}>Your Note :</Text>
          <TouchableRipple
            centered={true}
            rippleColor={`${theme.COLORS.HEADER}50`}
            onPress={() => onEdit()}
            borderless={true}
            style={styles.editTouchable}>
            <AntIcon name={'edit'} size={20} color={theme.COLORS.HEADER} />
          </TouchableRipple>
        </View>
        <Text style={styles.noteText}>{note}</Text>
      </View>
    );
  } else {
    return (
      <TouchableRipple
        style={styles.addNotebutton}
        centered={true}
        rippleColor={`${theme.COLORS.PRIMARY}80`}
        onPress={() => onAdd()}
        borderless={Platform.OS === 'ios' ? false : true}>
        <View style={styles.addNoteContainer}>
          <AntIcon name={'filetext1'} size={20} color={theme.COLORS.HEADER} />
          <Text style={styles.noteText}>Add</Text>
        </View>
      </TouchableRipple>
    );
  }
};

const NoteInputModal = ({onAddNote, note, onRequest, show}: any) => {
  const [Note, setNote] = useState(note);

  const reset = () => {
    setNote('');
    onRequest();
  };

  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.1}
      backdropColor={theme.COLORS.BORDER_TEXT}
      isVisible={show}
      animationInTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      onBackdropPress={() => reset()}
      animationOutTiming={500}
      onSwipeComplete={() => reset()}
      swipeDirection={['down']}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Note</Text>
          <TouchableRipple
            centered={true}
            rippleColor={`${theme.COLORS.HEADER}50`}
            onPress={() => {
              reset();
            }}
            borderless={true}
            style={styles.editTouchable}>
            <Icon name={'close'} size={37} />
          </TouchableRipple>
        </View>
        <TextInput
          style={styles.noteInput}
          value={Note}
          onChangeText={(text) => setNote(text)}
          numberOfLines={5}
          multiline={true}
          placeholder={'Add Note'}
        />
        <TouchableRipple
          style={styles.addNotebutton}
          centered={true}
          rippleColor={`${theme.COLORS.PRIMARY}80`}
          onPress={() => console.log('pressed')}
          borderless={Platform.OS === 'ios' ? false : true}>
          <View style={styles.addNoteContainer}>
            <AntIcon name={'edit'} size={20} color={theme.COLORS.HEADER} />
            <Text style={styles.noteText}>Add Note</Text>
          </View>
        </TouchableRipple>
      </View>
    </Modal>
  );
};
const QuestionItemComponent: FunctionComponent<props> = ({item, index}) => {
  const [modal, setModal] = useState(false);
  return (
    <View style={styles.parent}>
      <TouchableRipple
        centered={true}
        rippleColor={`${theme.COLORS.HEADER}50`}
        onPress={() => console.log('pressed')}
        borderless={true}
        style={styles.bookmarkTouchable}>
        <AntIcon
          name={item.bookmark === true ? 'star' : 'staro'}
          size={25}
          color={theme.COLORS.BORDER_COLOR}
        />
      </TouchableRipple>
      <View style={styles.questionContainer}>
        <View style={styles.questionBox}>
          <Text style={styles.QText}>Q{index + 1}:</Text>
        </View>
        <Text style={styles.questionWhole}>{item.question}</Text>
      </View>
      <View style={styles.optionContainer}>
        {item.options.map((item: any, index: number) => (
          <ChoiceItem
            option={item.option}
            correct={item.correct}
            type={item.type}
          />
        ))}
      </View>
      <SolutionComponent solution={item.solution} />
      <NoteInputComponent
        note={item.note}
        onAdd={() => setModal(true)}
        onEdit={() => setModal(true)}
      />
      <NoteInputModal
        note={item.note}
        show={modal}
        onRequest={() => setModal(false)}
      />
    </View>
  );
};

export default QuestionItemComponent;

const styles = StyleSheet.create({
  noteInput: {
    backgroundColor: '#f5f5f5',
    width: width * 0.9,
    borderRadius: 8,
    alignSelf: 'center',
    paddingRight: theme.SIZES.small,
    paddingTop: theme.SIZES.small,
    paddingLeft: theme.SIZES.small,
    marginVertical: theme.SIZES.small + 3,
    height: 400,
    textAlignVertical: 'top',
    fontSize: theme.SIZES.large - 2,
    color: theme.COLORS.BORDER_TEXT,
    fontFamily: 'Signika-Medium',
  },
  editTouchable: {
    marginHorizontal: 2,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 3.2,
  },
  modal: {
    margin: 0,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop:
      Platform.OS === 'ios' ? theme.SIZES.large * 5 : theme.SIZES.large * 2.5,
  },
  headerText: {
    fontSize: theme.SIZES.normal * 1.4,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.BORDER_TEXT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.normal,
  },
  main: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    paddingVertical: theme.SIZES.small,
  },
  QText: {
    fontFamily: 'Signika-SemiBold',
    fontSize: theme.SIZES.large + 10,
    color: theme.COLORS.HEADER,
    lineHeight: theme.SIZES.large + 14,
  },
  addNoteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
  },
  sectionHeadingContainer: {
    borderBottomColor: `${theme.COLORS.BORDER_TEXT}50`,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: theme.SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionBox: {
    backgroundColor: `${theme.COLORS.PRIMARY}20`,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  sectionHeading: {
    fontFamily: 'Signika-SemiBold',
    fontSize: theme.SIZES.large,
    color: theme.COLORS.HEADER,
  },
  solutionContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: theme.SIZES.small - 3,
    paddingVertical: theme.SIZES.small,
    marginBottom: theme.SIZES.small,
  },
  text: {
    fontSize: 14,
    color: theme.COLORS.PRIMARY,
    marginLeft: 5,
  },
  addNotebutton: {
    marginHorizontal: theme.SIZES.small / 1.2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${theme.COLORS.PRIMARY}60`,

    backgroundColor: `${theme.COLORS.PRIMARY}20`,
    alignSelf: 'center',
    alignItems: 'center',
  },

  touchable: {
    marginHorizontal: 2,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 3.2,
  },

  noteText: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.large - 2,
    marginHorizontal: theme.SIZES.small / 2,
    color: theme.COLORS.BORDER_TEXT,
  },
  parent: {
    paddingHorizontal: theme.SIZES.small + 2,
    paddingVertical: theme.SIZES.small + 5,
    backgroundColor: theme.COLORS.DEFAULT,
    borderBottomWidth: 0.6,
    borderBottomColor: theme.COLORS.HEADER,
  },
  optionContainer: {
    marginVertical: theme.SIZES.small,
  },
  choiceparent: {
    borderWidth: 2,
    borderColor: theme.COLORS.BLOCK,
    marginVertical: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
    borderRadius: 5,
  },
  choiceText: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.large - 1,
    color: theme.COLORS.BORDER_TEXT,
  },
  active: {
    backgroundColor: `${theme.COLORS.GREEN}30`,
  },
  choiceImage: {},
  questionWhole: {
    flex: 1,
    fontSize: theme.SIZES.large,
  },
  bookmarkTouchable: {
    position: 'absolute',
    right: 10,
    top: theme.SIZES.small + 5,
    marginHorizontal: 2,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 3.2,
  },
  questionContainer: {
    width: width * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
