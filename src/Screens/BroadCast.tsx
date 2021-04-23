import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type props = {
  page: string;
};

const BroadCast: FunctionComponent<props> = ({page}) => {
  return (
    <View style={styles.parent}>
      <Text>BroadCast</Text>
    </View>
  );
};

export default BroadCast;

const styles = StyleSheet.create({
  parent: {},
});
