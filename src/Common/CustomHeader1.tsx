import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Title from '../Common/CustomTitle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../Constants/theme';

type props = {
  title: string;
  back?: boolean;
  navigation: any;
  scene?: any;
  bell?: boolean;
  faq?: boolean;
  style?: any;
  nav?: boolean;
};

const NavIcon = (navigation: any) => (
  <TouchableOpacity
    onPress={() => navigation.toggleDrawer()}
    style={{backgroundColor: theme.COLORS.DEFAULT}}>
    <Image
      style={{
        backgroundColor: theme.COLORS.DEFAULT,
        // marginTop: theme.SIZES.small / 2,
        width: theme.SIZES.large * 2.5,
        height: theme.SIZES.large * 2.5,
        marginHorizontal: theme.SIZES.normal,
        resizeMode: 'cover',
      }}
      source={require('../Assets/images/nav_icon.png')}
    />
  </TouchableOpacity>
);

const Bell = (navigation: any) => (
  <Icon
    name="bell"
    size={22}
    color={theme.COLORS.HEADER}
    onPress={() => navigation.navigate('Notification')}
  />
);
const back_icon = (navigation: any) => (
  <Icon3
    name="arrow-left"
    size={25}
    style={{
      marginTop: theme.SIZES.small - 8,
      marginHorizontal: theme.SIZES.small,
    }}
    color={theme.COLORS.HEADER}
    onPress={() => navigation.goBack()}
  />
);
const Help = (navigation: any) => (
  <Icon2
    name="questioncircleo"
    size={22}
    color={theme.COLORS.HEADER}
    onPress={() => navigation.navigate('FAQ')}
  />
);
const CustomHeader: FunctionComponent<props> = ({
  scene,
  title,
  back,
  style,
  navigation,
  bell,
  faq,
  nav,
}) => (
  <View style={[styles.header, style]}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      {back ? back_icon(navigation) : null}
      {nav ? NavIcon(navigation) : null}
      <Text style={styles.heading}>{title}</Text>
    </View>
    <View style={styles.iconsection}>
      {bell ? Bell(navigation) : null}
      {/* {faq ? Help(navigation) : null} */}
    </View>
  </View>
);

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingRight: theme.SIZES.small + 4,
    marginVertical: theme.SIZES.small,
  },
  heading: {
    minWidth: '30%',
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    // lineHeight: theme.SIZES.large * 1,
    fontSize: theme.SIZES.large * 1.4,
  },
  iconsection: {
    alignItems: 'center',
    width: '17%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
