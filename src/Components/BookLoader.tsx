import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import ActionLoader from './common/ActionLoader';
import Cover from './common/Cover';

const BookLoader = ({show, cover}: {show: boolean; cover: string}) => {
  return (
    show === true && (
      <View style={styles.parent}>
        <Cover
          imageProps={{source: cover, style: {flex: 1}}}
          style={{flex: 1}}
        />
        <ActionLoader title={'Loading...'} size={24} />
      </View>
    )
  );
};

export default BookLoader;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
