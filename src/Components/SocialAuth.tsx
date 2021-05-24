import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import {Height} from '../Constants/size';
import Icon from './common/Icon';
import Touchable from './common/Touchable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import baseStyles from './common/styles';
import theme from '../Constants/theme';

type props = {
  type: 'REGISTER' | 'SIGNIN';
  onGoogle: () => void;
  onFacebook: () => void;
  load: any;
};
const SocialAuth: FunctionComponent<props> = ({
  type,
  onFacebook,
  onGoogle,
  load,
}) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.COLORS.GOOGLE},
          baseStyles.shadow_minimal,
        ]}
        onPress={() => onGoogle()}
        disabled={load.disable}>
        {load.google ? (
          <ActivityIndicator
            style={{
              marginHorizontal: theme.SIZES.small / 2,
              marginVertical: theme.SIZES.small / 3,
            }}
            size={theme.SIZES.large + 3}
            color={theme.COLORS.WHITE}
          />
        ) : (
          <Icon type={'GOOGLE'} size={1.6} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.COLORS.FACEBOOK},
          baseStyles.shadow_minimal,
        ]}
        onPress={() => onFacebook()}
        disabled={load.disable}>
        {load.facebook ? (
          <ActivityIndicator
            style={{
              marginHorizontal: theme.SIZES.small / 2,
              marginVertical: theme.SIZES.small / 3,
            }}
            size={theme.SIZES.large + 3}
            color={theme.COLORS.WHITE}
          />
        ) : (
          <Icon type={'FACEBOOK'} size={1.6} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuth;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ccc',
    borderRadius: 50,
    padding: theme.SIZES.normal - 3,
    marginHorizontal: theme.SIZES.large,
  },
  parent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
