import {Height, width} from '../../Constants/size';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import IonicIcons from 'react-native-vector-icons/Ionicons';
import theme from '../../Constants/theme';

type props = {
  semData: any;
  onPress: () => void;
};

const ExpandableView: FunctionComponent<props> = ({semData, onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.head}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headText}>{semData.name}</Text>
            <IonicIcons
              style={{marginLeft: 'auto'}}
              name={'chevron-forward-outline'}
              size={30}
            />
          </View>

          <Text
            style={{
              fontSize: theme.SIZES.small * 1.2,
              fontFamily: 'Poppins-Regular',
              width: '85%',
            }}>
            {`Code: ${semData.code}, Marks: ${semData.maximum_marks}`}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    marginTop: theme.SIZES.large,
    paddingHorizontal: theme.SIZES.small / 2,
  },
  textInput: {
    width: '90%',
    paddingHorizontal: theme.SIZES.small,
  },
  head: {
    borderBottomColor: theme.COLORS.LIGHT_GREY,
    borderBottomWidth: 3,
    paddingHorizontal: theme.SIZES.normal,
    paddingVertical: theme.SIZES.small,
  },
  headText: {
    fontSize: theme.SIZES.large,
    fontStyle: 'italic',
    fontFamily: 'Signika-SemiBold',
  },
  subject: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#00000050',
    alignItems: 'center',
    height: Height * 0.065,
  },
  child: {
    width: '100%',
    height: Height * 0.06,
    justifyContent: 'center',

    borderBottomColor: '#00000080',
  },
  chapterParent: {
    marginTop: theme.SIZES.normal,
    backgroundColor: theme.COLORS.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.small / 2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  chapterChild: {
    width: '100%',
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 4,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: theme.SIZES.small,
  },
});
export default ExpandableView;
