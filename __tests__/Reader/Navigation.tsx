import {
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Ion from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import baseStyles from '../../Components/common/styles';
import bg from '../../../assets/images/bg.png';
import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

const propsDidUpdate = (callback: any, deps: any) => {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
};

type props = {
  toc: Array<any>;
  shown: boolean;
  onClose: any;
  display?: any;
};
const topBarWidth = width / 1.25;
const singleBarWidth = topBarWidth / 3.08;

const tabsData = ['Contents', 'Bookmarks', 'Notes'];
const Navigation: FunctionComponent<props> = ({toc, shown, onClose}) => {
  const [dataSource, setDataSource] = useState([toc]);
  const [modalVisible, setModalVisible] = useState(false);
  const [TopbarSelected, setTopbarSelected] = useState({
    contents: true,
    bookmarks: false,
    notes: false,
  });

  const [position, setposition] = useState({
    prev: 0,
    current: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      if (shown == true) {
        show();
      } else {
        hide();
      }
    }, 1000);
    return () => {};
  }, []);

  propsDidUpdate(() => {
    if (shown) {
      show();
    } else {
      hide();
    }
  }, [shown]);

  const show = () => {
    setModalVisible(true);
  };

  const hide = () => {
    setModalVisible(false);
  };

  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(offset.value, {
        duration: 400,
      }),
    };
  });

  const DummyView = ({label, text}: any) => {
    const contents = [
      {
        number: '1',
        text:
          'Briefly discuss the trend of GDP growth since the reforms of 1991? ',
      },
      {
        number: '2',
        text:
          'Briefly discuss the trend of GDP growth since the reforms of 1991?',
      },
    ];

    const annotations = [
      {
        _id: 231232131,
        type: 'BOOKMARK', //'HIGHLIGHT' | 'BOOKMARK' | 'UNDERLINE' | 'EMPTY'
        pageCfi: 'epubcfi(322131dsasad)',
        text:
          'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lo',
      },
      {
        _id: 321313213,
        type: 'HIGHLIGHT', //'HIGHLIGHT' | 'BOOKMARK' | 'UNDERLINE' | 'EMPTY'
        pageCfi: 'epubcasds',
        location: {offsetX: 33, offsetY: 232},
        epubCfi: 'epubcfi',
        color: '#ccc',
        text:
          'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu',
        note:
          'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu',
      },
    ];

    const [expand, setExpand] = useState(false);
    return (
      <View>
        {label === 'Content' ? (
          <View>
            {contents.map((item: any, index: number) => (
              <TouchableOpacity
                style={{
                  marginTop: theme.SIZES.small,
                  flexDirection: 'row',
                }}
                key={index}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: theme.SIZES.small + 2,
                  }}>
                  {`Que ${item.number}.`}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: theme.SIZES.small / 2,
                    width: '90%',
                    fontSize: theme.SIZES.small,
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : label === 'BookMark' ? (
          <View>
            {annotations.map((item: any, index: number) => {
              if (item.type === 'BOOKMARK')
                <View key={index} style={styles.bookmarks}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    {`Ques${item.id}.`}
                  </Text>
                  <Text style={{width: '68%', fontSize: 12, marginLeft: 5}}>
                    {item.text}
                  </Text>
                  <Text style={styles.page}>{item.pageCfi}</Text>
                  <Ion
                    style={{marginLeft: 'auto'}}
                    name="trash-outline"
                    size={18}
                  />
                </View>;
            })}
          </View>
        ) : (
          <View>
            {annotations.map((item: any, index: number) => {
              if (item.type != 'BOOKMARK')
                <View key={index} style={styles.notes}>
                  <View style={styles.notesChild}>
                    <View style={[styles.box, {backgroundColor: item.color}]} />
                    <Ion
                      style={{marginRight: theme.SIZES.small / 2}}
                      name="trash-outline"
                      size={23}
                    />
                  </View>
                  <View style={styles.note}>
                    <Text>{item.text}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setExpand(!expand)}
                    style={styles.addNote}>
                    <Text style={{fontSize: 12}}>Add Your Notes</Text>
                  </TouchableOpacity>
                  {expand && (
                    <View
                      style={{
                        marginTop: theme.SIZES.normal * 1.5,
                        alignItems: 'center',
                      }}>
                      <TextInput
                        style={styles.expandText}
                        placeholder={'Enter Notes'}
                        multiline={true}
                      />
                    </View>
                  )}
                </View>;
            })}
          </View>
        )}
      </View>
    );
  };

  const RenderItem = (row: any) => {
    return (
      <DummyView
        label={
          TopbarSelected.contents
            ? 'Content'
            : TopbarSelected.bookmarks
            ? 'BookMark'
            : 'Notes'
        }
        text={
          TopbarSelected.contents
            ? 'Briefly discuss the trend of GDP growth since the reforms of 1991?'
            : TopbarSelected.bookmarks
            ? 'When you are reading a book, tap the Bookmark button to mark the current page.'
            : 'Tap and hold on a word. You can extend the selection to include an entire passage. Then tap Highlight or Note. You can add notes to highlighted passages later by tapping the highlight and the tapping Note.'
        }
      />
    );
  };

  useEffect(() => {
    const dist = topBarWidth / 3.08;
    if (position.prev !== position.current) {
      offset.value = dist * position.current;
    } else {
      return;
    }
  }, [position]);

  const [selected, setSelected] = useState(0);
  const handleTopBarSelection = (key: string, index: number) => {
    setSelected(index);
    let x: any = {
      contents: TopbarSelected.contents,
      bookmarks: TopbarSelected.bookmarks,
      notes: TopbarSelected.notes,
    };

    Object.keys(x).map((k, index) => {
      if (key.toLowerCase() === k) {
        x[k] = true;
      } else {
        x[k] = false;
      }
    });
    setTopbarSelected(x);
  };

  const CustomTopBar = () => {
    return (
      <View style={styles.topbar}>
        <View style={styles.topbar_container}>
          {tabsData.map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={styles.topbar_section}
              onPress={() => handleTopBarSelection(item, index)}>
              <Text
                style={
                  selected == index
                    ? {color: theme.COLORS.PRIMARY, fontWeight: 'bold'}
                    : {}
                }>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  return (
    <Modal
      animationType={'slide'}
      visible={modalVisible}
      onRequestClose={() => console.log('close requested')}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={bg}
          style={styles.parent}
          resizeMode="cover"
          imageStyle={{opacity: 0.03}}>
          <TouchableOpacity
            style={{position: 'absolute', top: 5, left: 15}}
            onPress={onClose}>
            <Ion name="close" size={30} />
          </TouchableOpacity>
          <View style={styles.header}>
            <CustomTopBar />
          </View>
          <FlatList
            style={styles.container}
            data={['Testing Data']}
            renderItem={(item) => (
              <View>
                <RenderItem row={item} />
              </View>
            )}
            keyExtractor={(item, i) => `${item} + ${i}`}
          />
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    paddingHorizontal: theme.SIZES.small,
  },
  header: {
    height: '11%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',

    padding: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'georgia',
  },

  container: {
    ...Platform.select({
      ios: {
        paddingTop: theme.SIZES.large * 1.5,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },

  topbar: {
    justifyContent: 'center',
  },
  topbar_container: {
    width: singleBarWidth * 3.08,
    marginHorizontal: width * 0.1,
    flexDirection: 'row',
    backgroundColor: '#E2E1E1',
    borderWidth: 4,
    borderRadius: 7,
    borderColor: 'transparent',
  },
  topbar_section: {
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.SIZES.large * 1.4,
    width: singleBarWidth,
  },
  animatedView: {
    position: 'absolute',
    backgroundColor: 'white',
    width: singleBarWidth,
    height: 30,
    marginVertical: 3,
    borderWidth: 4,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  bookmarks: {
    marginTop: theme.SIZES.small * 1.5,
    flexDirection: 'row',
    borderWidth: 0.7,
    borderColor: theme.COLORS.PLACEHOLDER,
    width: '100%',
    paddingVertical: theme.SIZES.small / 2,
    paddingHorizontal: theme.SIZES.small / 2,
    borderRadius: 12,
  },
  notes: {
    paddingHorizontal: theme.SIZES.small / 2,
    borderBottomColor: theme.COLORS.BLACK,
    borderBottomWidth: 1.5,
    paddingBottom: theme.SIZES.normal,
  },
  notesChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.SIZES.small,
  },
  note: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.SIZES.small / 2,
  },
  expandText: {
    borderWidth: 1,
    borderColor: theme.COLORS.PLACEHOLDER,
    borderRadius: 10,
    paddingHorizontal: theme.SIZES.small,
    width: '90%',
  },
  addNote: {
    alignSelf: 'flex-end',
    borderWidth: 0.6,
    borderRadius: 15,
    paddingHorizontal: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.small / 2,
    marginTop: theme.SIZES.small,
  },
  page: {
    fontSize: 12,
    marginLeft: theme.SIZES.small / 2,
    fontWeight: 'bold',
  },
  box: {
    width: 33,
    height: 33,
    borderRadius: 10,
  },
});
