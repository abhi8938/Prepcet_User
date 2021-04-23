import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BaseModal from '../common/BaseModal';
import Icon from '../common/Icon';
import Touchable from '../common/Touchable';
import baseStyles from '../common/styles';
import theme from '../../Constants/theme';

type featuresProp = {
  in: boolean;
  text: string;
  label: string;
};

const ListItem = ({item}: {item: featuresProp}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon type={'CROSS_RED'} size={15} />
      <Text style={(baseStyles.body, {fontSize: theme.SIZES.small + 2})}>
        {item.label.toLowerCase() === 'duration'
          ? `${item.label} - ${item.text}`
          : item.text}
      </Text>
    </View>
  );
};
type props = {
  controls: {show: boolean; toggle: () => void};
  data: {
    title: string;
    price: string;
    Features: [featuresProp];
  };
  buttonProps: {
    loading: boolean;
    touchableProps: {
      onPress: () => void;
      disabled: false;
    };
    title: string;
  };
};
const AlertModal: FunctionComponent<props> = ({
  controls,
  data,
  buttonProps,
}) => {
  const duration = data.Features.find(
    (item) => item.label.toLowerCase() === 'duration',
  );
  return (
    <BaseModal {...controls}>
      <View style={[baseStyles.card, styles.parent]}>
        <Text style={[baseStyles.heading, styles.title]}>
          {data.title}
          <Text>{duration?.text}</Text>
        </Text>
        <Text style={[baseStyles.body, styles.price]}>{data.price}</Text>
        <View style={styles.listContainer}>
          {data.Features.map((item) => (
            <ListItem item={item} />
          ))}
        </View>
        <Touchable filled squared size={'MEDIUM'} {...buttonProps} />
      </View>
    </BaseModal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  parent: {
    borderRadius: 15,
    backgroundColor: theme.COLORS.WHITE,
  },
  title: {
    borderBottomWidth: 1.2,
    borderBottomColor: theme.COLORS.HEADER,
    width: '80%',
    textAlign: 'center',
  },
  price: {
    fontSize: theme.SIZES.large + 5,
  },
  listContainer: {},
});
