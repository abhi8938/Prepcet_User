import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import Icon_vec from 'react-native-vector-icons/AntDesign';
import baseStyles from './styles';
import theme from '../../Constants/theme';
import GIFLoader from '../GIFLoader';

type props = {
  onVerify: (type: 'EMAIL' | 'PHONE') => void;
  verified: boolean;
  load: boolean;
};
const VerificationComp: FunctionComponent<props> = ({
  verified,
  onVerify,
  load,
}) => {
  return (
    <View style={styles.parent}>
      <Text
        style={[
          baseStyles.text,
          {
            fontSize: theme.SIZES.normal + 1.7,
            // marginHorizontal: theme.SIZES.small,
            alignSelf: 'center',
          },
        ]}>
        Contact Information Verification
      </Text>
      {verified === false ? (
        load === true ? (
          <GIFLoader />
        ) : (
          <View>
            <View style={styles.rowContainer}>
              <Pressable
                onPress={() => onVerify('EMAIL')}
                style={styles.button}
                disabled={load}>
                <Text
                  style={[
                    baseStyles.text,
                    {
                      fontSize: theme.SIZES.small + 4,
                      color: theme.COLORS.WHITE,
                    },
                  ]}>
                  email
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onVerify('PHONE')}
                style={styles.button}
                disabled={load}>
                <Text
                  style={[
                    baseStyles.text,
                    {
                      fontSize: theme.SIZES.small + 6,
                      color: theme.COLORS.WHITE,
                    },
                  ]}>
                  sms
                </Text>
              </Pressable>
            </View>
            <Text
              style={{
                fontSize: theme.SIZES.small / 1.2,
                color: theme.COLORS.ERROR,
                marginLeft: 'auto',
              }}>
              * Select One To Verify
            </Text>
          </View>
        )
      ) : (
        <View style={styles.rowContainer}>
          <Icon_vec
            style={styles.check}
            name={'checkcircle'}
            size={theme.SIZES.large + 1}
            color={theme.COLORS.SECONDARY}
          />
          <Text
            style={[
              baseStyles.text,
              {color: theme.COLORS.SECONDARY, fontSize: theme.SIZES.normal + 2},
            ]}>
            Verified
          </Text>
        </View>
      )}
    </View>
  );
};

export default VerificationComp;

const styles = StyleSheet.create({
  parent: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: theme.SIZES.small / 1.5,
    paddingHorizontal: theme.SIZES.small,
    marginTop: theme.SIZES.small,
    borderWidth: 0.5,
    borderRadius: 9,
    backgroundColor: '#F5F5F5',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.normal,
    paddingVertical: theme.SIZES.small / 2,
    marginTop: theme.SIZES.small / 2,
    marginHorizontal: theme.SIZES.small,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: theme.COLORS.ACTIVE,
    textAlign: 'center',
    width: '30%',
  },
  check: {
    zIndex: 1,
    elevation: 2,
    marginHorizontal: theme.SIZES.small,
  },
});
