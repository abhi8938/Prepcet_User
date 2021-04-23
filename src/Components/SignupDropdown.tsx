import {Height, width} from '../Constants/size';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import Expandable from './common/Expandable';
import Icon from './common/Icon';
import Icon_vec from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';
import baseStyles from './common/styles';
import theme from '../Constants/theme';

type props = {
  label: string;
  error: string;
  selected: string;
  disabled?: boolean;
  list: Array<{
    name: string;
    icon: any;
  }>;
  icon: string;
  onSelected: (selected: string) => void;
  onToggle: () => void;
};
const ListHeight = theme.SIZES.large * 1.9;

const SignupDropdown: FunctionComponent<props> = ({
  selected,
  list,
  label,
  icon,
  onSelected,
  error,
  onToggle,
  disabled,
}) => {
  const Contract = (handleToggle: () => void, toggle: boolean) => (
    <View>
      <View style={styles.contract}>
        <Icon
          type={icon}
          size={1.6}
          style={{
            width: '12%',
          }}
        />
        <Pressable
          onPress={() => {
            if (disabled == false && list.length != 0) {
              onToggle();
              handleToggle();
            } else {
              var message =
                label === 'program'
                  ? 'Please Select University'
                  : label === 'semester' || label === 'year'
                  ? 'Please Select Program'
                  : list.length == 0
                  ? 'Wait! Fetching Data..'
                  : 'Error';

              Snackbar.show({text: message, duration: Snackbar.LENGTH_SHORT});
            }
          }}
          style={styles.button}>
          <Text
            style={[
              baseStyles.text,
              {
                color: theme.COLORS.PRICE_COLOR,
                fontSize: theme.SIZES.normal + 2,
              },
            ]}>
            {selected.length === 0 ? `Select your ${label}` : selected}
          </Text>
          <Icon_vec
            style={styles.indicator}
            name={toggle === true ? 'up' : 'down'}
            size={theme.SIZES.normal}
            color={theme.COLORS.PRICE_COLOR}
          />
        </Pressable>
      </View>
      {error.length !== 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
  const Expand = (handleToggle: () => void, toggle: boolean) => (
    <ScrollView
      contentContainerStyle={styles.parent}
      style={styles.scroll}
      nestedScrollEnabled={true}>
      {list &&
        list.map((item, index) => (
          <TouchableOpacity
            key={`${item.name}-${index}`}
            style={[styles.listItem]}
            onPress={() => {
              handleToggle();
              onSelected(item._id);
            }}>
            <Text style={[baseStyles.text, {fontSize: theme.SIZES.small + 3}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
  return (
    <Expandable
      style={{
        borderRadius: 0,
        marginVertical: 0,
        paddingVertical: 0,
      }}
      dimen={{
        width: {max: width * 0.8, min: width * 0.8},
        height: {
          min: Height * 0.08,
          max: Height * 0.3,
        },
      }}
      ContractComp={Contract}
      ExpandComp={Expand}
    />
  );
};

export default SignupDropdown;

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: theme.SIZES.small / 3,
    paddingTop: theme.SIZES.small / 2,
    width: '85%',
    alignSelf: 'flex-end',
  },
  error: {
    fontSize: theme.SIZES.normal / 1.4,
    color: theme.COLORS.ERROR,
    fontFamily: 'Signika-Regular',
  },
  scroll: {
    width: '86%',
    alignSelf: 'flex-end',
    marginTop: theme.SIZES.small / 1.2,
    marginRight: 2,
    borderColor: theme.COLORS.PRICE_COLOR,
    borderWidth: 0.5,
    borderRadius: 9,
    zIndex: 2,
    height: '78%',
    backgroundColor: theme.COLORS.DEFAULT,
    elevation: 2,
  },
  parent: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingVertical: theme.SIZES.small / 2,
  },
  indicator: {
    zIndex: 1,
    elevation: 2,
    right: 2,
  },
  listItem: {
    height: ListHeight,
    backgroundColor: '#F5F5F5',
    borderColor: theme.COLORS.PRICE_COLOR,
    borderWidth: 0.5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.SIZES.small / 2,
    marginTop: theme.SIZES.small / 2,
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: theme.SIZES.small,
  },
  contract: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderBottomColor: theme.COLORS.PRICE_COLOR,
    borderBottomWidth: 1,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.small / 1.5,
    marginHorizontal: theme.SIZES.small / 2,
  },
});
