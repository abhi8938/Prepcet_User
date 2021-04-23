import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type props = {
  page: string;
};

const MainHeader: FunctionComponent<props> = ({page}) => {
  return (
    <View style={styles.parent}>
      <Text>MainHeader</Text>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  parent: {},
});
