import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';

type props = {
  title: string;
  onPress: () => void;
};
const ContentListItem: FunctionComponent<props> = ({title, onPress}) => {
  return (
    <View style={styles.parent}>
      <LinearGradient
        colors={['#fae6b2', '#F6CE65', '#f6ce65']}
        style={[styles.firstContainer]}>
        <IonIcon name={'md-document-text-outline'} size={30} color={`#fff`} />
      </LinearGradient>
      <Text style={styles.title}>{title}</Text>
      <TouchableRipple
        style={styles.startButton1}
        centered={true}
        rippleColor={theme.COLORS.DEFAULT}
        onPress={() => onPress()}
        borderless={Platform.OS === 'ios' ? false : true}>
        <Text style={styles.startButtonText1}>Read</Text>
      </TouchableRipple>
    </View>
  );
};

export default ContentListItem;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.DEFAULT,
    paddingVertical: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.COLORS.HEADER}50`,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: theme.SIZES.large,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    flex: 1,
  },
  firstContainer: {
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 4,
    marginRight: theme.SIZES.small,
  },

  startButton1: {
    borderRadius: 6,
    backgroundColor: `${theme.COLORS.SECONDARY}50`,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 1.5,
    shadowColor: `${theme.COLORS.SECONDARY}50`,
  },
  startButtonText1: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.BORDER_TEXT,
  },
});
