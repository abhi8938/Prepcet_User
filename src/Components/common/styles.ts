import {Platform, StyleSheet} from 'react-native';

import theme from '../../Constants/theme';

const baseStyles = StyleSheet.create({
  parent: {
    padding: theme.SIZES.small * 0.3,
    borderRadius: theme.SIZES.small,
    margin: theme.SIZES.small - 1,
    marginHorizontal: theme.SIZES.small,
  },
  card: {
    backgroundColor: '#F0F0F0',
    shadowColor: 'black',
    elevation: 2,
    shadowOffset: {width: 2, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: theme.SIZES.large + 5,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  heading: {
    fontSize: theme.SIZES.large * 1.5,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    marginHorizontal: theme.SIZES.small,
    marginVertical: theme.SIZES.small / 2,
  },
  key: {
    fontSize: theme.SIZES.small + 3,
    fontFamily: 'Comfortaa-SemiBold',
    color: theme.COLORS.HEADER,
  },
  text: {
    fontSize: theme.SIZES.normal - 1,
    fontFamily: 'Signika-Medium',
    letterSpacing: 1,
  },
  value: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'Comfortaa-Medium',
    color: theme.COLORS.HEADER,
  },
  body: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'Comfortaa-SemiBold',
    marginVertical: theme.SIZES.small / 2,
  },
  shadow: {
    shadowColor: 'black',
    elevation: 2,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 8,
    shadowOpacity: 0.7,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 1.6,
    marginVertical: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small,
    borderRadius: 9,
    elevation: 3,
    textAlign: 'center',
  },
});

export default baseStyles;
