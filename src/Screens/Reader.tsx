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
  useEffect(() => console.log('scene', uri, token), []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.COLORS.DEFAULT}
        barStyle={'dark-content'}
      />
      <WebView
        source={{uri: 'https://blissful-wozniak-192615.netlify.app/'}}
        style={{
          flex: 1,
        }}
        originWhitelist={['*']}
        javaScriptEnabled
        injectedJavaScriptBeforeContentLoaded={`window.uri = ${uri}; window.token= ${token}; true;`}
      />
    </View>
  );
};

export default Reader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Platform.OS === 'ios' ? theme.SIZES.large * 1.8 : 0,
    backgroundColor: '#fff',
  },
});
