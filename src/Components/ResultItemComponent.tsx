import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableRipple} from 'react-native-paper';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  item: any;
};

const ResultItemComponent: FunctionComponent<props> = ({item}) => {
  return (
    <View style={styles.parent2}>
      <Text style={styles.testName}>Order - #{item.id}</Text>
      <View style={styles.productInfoContainer}>
        <View style={styles.innerContainer}>
          <Text style={[styles.featureLabel, {flex: 2}]}>Product</Text>
          <Text style={[styles.featureLabel, {textAlign: 'center'}]}>
            Quantity
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.productName}>
            {item.productName} {item.subject && '(' + item.subject + ')'}
          </Text>
          <Text
            style={[styles.productfeature, {fontSize: theme.SIZES.small + 2}]}>
            X
          </Text>
          <Text style={styles.productfeature}>{item.quantity}</Text>
        </View>

        <View
          style={[
            styles.innerContainer,
            {
              marginTop: theme.SIZES.small / 2,
              borderTopColor: `${theme.COLORS.HEADER}50`,
              borderTopWidth: 1,
            },
          ]}>
          <Text
            style={[styles.productName, {fontSize: theme.SIZES.normal + 3}]}>
            Order Total
          </Text>

          <Text
            style={[styles.productfeature, {fontSize: theme.SIZES.normal + 5}]}>
            ₹ {item.final_amount}
          </Text>
        </View>
      </View>
      <View style={styles.featuresContainer}>
        <Text style={styles.featureLabel}>Category</Text>
        <Text style={styles.featureValue}>{item.category}</Text>
      </View>
      <View style={styles.featuresContainer}>
        <Text style={styles.featureLabel}>Purchase On</Text>
        <Text style={styles.featureValue}>
          {new Date(item.created_at).toDateString()}
        </Text>
      </View>
      <View style={styles.featuresContainer}>
        <Text style={styles.featureLabel}>Order Expiration Date</Text>
        <Text style={styles.featureValue}>
          {new Date(item.expiration).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default ResultItemComponent;

const styles = StyleSheet.create({
  productName: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal + 2,
    color: theme.COLORS.HEADER,
    flex: 2,
  },
  productfeature: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal + 2,
    color: theme.COLORS.HEADER,
    textAlign: 'center',
    flex: 1,
  },

  productInfoContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
    marginBottom: theme.SIZES.small,
    marginTop: theme.SIZES.small / 2,
    alignItems: 'center',
  },
  featureLabel: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal - 1,
    color: theme.COLORS.HEADER,
    flex: 1,
  },
  featureValue: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal + 2,
    color: theme.COLORS.HEADER,
    flex: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    flex: 1,
  },
  testName: {
    fontFamily: 'Signika-SemiBold',
    fontSize: theme.SIZES.large - 1,
    color: theme.COLORS.HEADER,
    width: width * 0.6,
    marginBottom: 3,
  },

  parent2: {
    width: width,
    paddingHorizontal: theme.SIZES.large,
    paddingVertical: theme.SIZES.small,
    backgroundColor: theme.COLORS.DEFAULT,
    flexDirection: 'column',
    borderBottomColor: `${theme.COLORS.HEADER}50`,
    borderBottomWidth: 1,
  },

  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.small / 2,
  },
});
