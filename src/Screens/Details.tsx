import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../Constants/theme';

type props = {
  navigation?: any;
  scene?: any;
  route: any;
};
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const PaperDetails = ({item, onPress}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.card_first_child}>
        <Text style={styles.cardHeading}>Paper Details</Text>
        <View style={{flexDirection: 'row-reverse'}}></View>
      </View>
      <View style={styles.card_second_child}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.4}}>
            <Image
              source={{uri: item.image}}
              style={styles.poster}
              resizeMode={'cover'}
            />
          </View>

          <View style={{flex: 0.6, justifyContent: 'center'}}>
            <Text style={styles.key}>
              Title : <Text style={styles.value}>{item.title}</Text>
            </Text>
            <Text style={styles.key}>
              Number of Pages : <Text style={styles.value}>{item.length}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.key}>
          Paper Description :{' '}
          <Text style={styles.value}>{item.paperDescription}</Text>
        </Text>

        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.value}>Start Reading </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PaperFeatures = ({item}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.card_first_child}>
        <Text style={styles.cardHeading}>Paper Features</Text>
      </View>
      <View style={styles.card_second_child}>
        <Text style={styles.key}>
          Language : <Text style={styles.value}>{item.Language}</Text>
        </Text>
        <Text style={styles.key}>
          File Size : <Text style={styles.value}>{item.fileSize}</Text>
        </Text>
        <Text style={styles.key}>
          Simultaneous Device Usage :{' '}
          <Text style={styles.value}>{item.simultaneousDeviceUsage}</Text>
        </Text>
        <Text style={styles.key}>
          Text to Speech : <Text style={styles.value}>Yes</Text>
        </Text>
      </View>
    </View>
  );
};

const Author = ({item}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.card_first_child}>
        <Text style={styles.cardHeading}>About Author</Text>
      </View>
      <View style={styles.card_second_child}>
        <View style={{flexDirection: 'row', marginBottom: theme.SIZES.small}}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'flex-start',
              elevation: 5,
            }}>
            <Image style={styles.authorImage} source={{uri: item.profile}} />
          </View>

          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 10,
            }}>
            <Text style={styles.key}>{item.author}</Text>
          </View>
        </View>

        <Text style={styles.key}>
          Author Description :{' '}
          <Text style={styles.value}>{item.authorDescription}</Text>
        </Text>
      </View>
    </View>
  );
};

const Details: FunctionComponent<props> = ({navigation, scene, route}) => {
  const {
    params: {item},
  } = route;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PaperDetails item={item} onPress={() => navigation.navigate('Reader')} />
      <PaperFeatures item={item} />
      <Author item={item} />
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C',
  },
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'column',
    borderWidth: 8,
    paddingHorizontal: theme.SIZES.small / 0.9,
    paddingVertical: theme.SIZES.normal / 1.5,
    margin: width * 0.02,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 2,
    backgroundColor: 'white',
  },
  card_first_child: {
    // padding:5
    // flex:1
  },
  cardHeading: {
    // paddingHorizontal: theme.SIZES.large,
    paddingVertical: theme.SIZES.small / 2,
    fontSize: theme.SIZES.large,
    fontFamily: 'Poppins-SemiBold',
    color: theme.COLORS.HEADER,
  },
  card_second_child: {
    // paddingHorizontal: theme.SIZES.large,
  },
  poster: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  key: {
    fontSize: theme.SIZES.large * 0.85,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    paddingBottom: theme.SIZES.small - 2,
  },
  value: {
    fontSize: theme.SIZES.normal,
    fontFamily: 'Signika-Medium',
    color: '#7D7E7B',
  },
  authorImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
