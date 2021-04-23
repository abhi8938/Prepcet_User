import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type props = {
  page: string;
};

const Reminders: FunctionComponent<props> = ({page}) => {
  return (
    <View style={styles.parent}>
      <Text>Reminders</Text>
    </View>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  parent: {},
});
