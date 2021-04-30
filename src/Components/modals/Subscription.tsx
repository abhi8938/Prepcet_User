import {Height, width} from '../../Constants/size';
import {Image, Pressable, StyleSheet, Text, View, Modal} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Touchable from '../common/Touchable';
import baseStyles from '../common/styles';
import theme from '../../Constants/theme';
import useAuthState from '../../State/AuthState';
import {useGlobalState} from '../../State/GlobalState';

type props = {
  type: 'EXPIRED' | 'ABOUTTIME';
  navigation: any;
  message: string;
  image?: string;
  show: boolean;
};

const Subscription: FunctionComponent<props> = ({
  type,
  navigation,
  message,
  image,
  show,
}) => {
  const globalState: any = useGlobalState();
  const [title, setTitle] = useState('Renew');
  useEffect(() => {
    if (globalState.subscription.type === 'TRIAL') {
      setTitle('Buy');
    }
  }, [globalState.subscription.type]);

  const {packages, getPackages, Buy} = useAuthState();
  useEffect(() => {
    getPackages();
  }, []);

  const [hide, setHide] = useState(true);
  const pack = packages.filter((x: any) => x.type == 'PAID');
  console.log(pack);
  return (
    <Modal visible={show && hide} transparent={true}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000090',
        }}>
        <View
          style={[
            styles.parent,
            baseStyles.card,
            baseStyles.parent,
            {paddingVertical: theme.SIZES.large},
          ]}>
          <Text
            style={[
              baseStyles.heading,
              {fontSize: theme.SIZES.large * 0.85, textAlign: 'center'},
            ]}>
            {message}
          </Text>
          <Image
            source={
              image ? image : require('../../../assets/images/subscription.png')
            }
            style={styles.image}
            resizeMode={'contain'}
          />
          <View style={{flexDirection: 'row'}}>
            <Touchable
              title={title}
              loading={false}
              size={'MEDIUM'}
              style={{backgroundColor: 'F0F0F0'}}
              touchableProps={{
                onPress: async () => {
                  (await Buy(navigation, pack[0], true))
                    ? setHide(false)
                    : null;
                },
                disabled: false,
              }}
            />
            {type === 'ABOUTTIME' && (
              <Touchable
                title={'Dismiss'}
                loading={false}
                size={'MEDIUM'}
                style={{backgroundColor: 'F0F0F0'}}
                touchableProps={{
                  onPress: () => setHide(false),
                  disabled: false,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    width: width * 0.9,
  },
  image: {
    width: '85%',
    height: Height * 0.3,
    marginVertical: theme.SIZES.normal,
  },
});
