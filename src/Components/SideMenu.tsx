import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type props = {
  page: string;
};

const SideMenu: FunctionComponent<props> = ({page}) => {
  return (
    <View style={styles.parent}>
      <Text>SideMenu</Text>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  parent: {},
});
