import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type props = {
  page: string;
};

const Support: FunctionComponent<props> = ({page}) => {
  return (
    <View style={styles.parent}>
      <Text>Contact</Text>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  parent: {},
});
