import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useEffect} from 'react';

import WebView from 'react-native-webview';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  route: any;
};
const Reader: FunctionComponent<props> = ({navigation, route}) => {
  const {uri, token} = route.params;
  //TODO:INJECT JAVASCRIPT for URI and TOKEN
  // console.log('scene', uri, token);
  let js = ` window.uri = ${uri};
          window.token = ${token};
          setTimeout(function() { window.alert(window.uri) }, 2000);
         true;`;
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.COLORS.DEFAULT}
        barStyle={'dark-content'}
      />
      <WebView
        source={{uri: 'http://127.0.0.1:3000/'}}
        style={{
          flex: 1,
        }}
        originWhitelist={['*']}
        injectedJavaScript={js}
        onMessage={(e) => {
          console.log('eve', e);
        }}
      />
    </View>
  );
};

export default Reader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? theme.SIZES.large * 1.8 : 0,
    backgroundColor: '#fff',
  },
});
