import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Icon from '../Components/common/Icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import bg from '../../assets/images/bg.png';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  route: any;
};

const HighlightOverView = ({item, value}: {item: any; value: string}) => {
  return (
    <View style={styles.resultView}>
      <View style={[styles.circle, {backgroundColor: item.color}]}></View>

      <View style={styles.textView}>
        {item.text.split(' ').map((x: string, index: number) =>
          x.toLowerCase() == value.toLowerCase() ? (
            <Text key={index} style={[styles.text, {fontWeight: 'bold'}]}>
              {x}
            </Text>
          ) : (
            <Text key={index} style={styles.text}>
              {x}
            </Text>
          ),
        )}
      </View>

      <Text style={styles.pageNumber}>{`Page ${item.pageNumber}`}</Text>
    </View>
  );
};

const HomeSearch: FunctionComponent<props> = ({navigation, route}) => {
  const [value, setValue] = useState('');

  const search = (value: string) => {
    console.log('search', search);
  };
  const [searchResults, setSearchResults]: any = useState([]);
  return (
    <View style={styles.parent}>
      <ImageBackground
        source={bg}
        style={[
          styles.parent,
          {
            paddingHorizontal: theme.SIZES.small / 1.2,
            paddingVertical: theme.SIZES.small,
          },
        ]}
        resizeMode="cover"
        imageStyle={{opacity: 0.03}}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder={'Search'}
            onChangeText={(text) => {
              setValue(text);
            }}
            value={value}
            style={styles.input}
          />
          <TouchableOpacity
            style={{marginLeft: 'auto', marginRight: theme.SIZES.small / 2}}
            onPress={() => Search(value)}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>Highlights</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={searchResults.highlights}
          renderItem={({item, index}: {item: any; index: number}) => (
            <HighlightOverView item={item} value={value} />
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  searchBar: {
    flexDirection: 'row',
    width: '100%',

    marginBottom: theme.SIZES.normal / 2,
    alignItems: 'center',
  },
  input: {
    backgroundColor: theme.COLORS.LIGHT_GREY,
    width: '70%',
    paddingVertical:
      Platform.OS === 'ios' ? theme.SIZES.small / 1.3 : theme.SIZES.small / 2,
    borderRadius: 20,
    marginLeft: theme.SIZES.small / 2,
    paddingHorizontal: theme.SIZES.small,
  },
  searchText: {fontSize: theme.SIZES.normal, color: theme.COLORS.Links},
  heading: {
    fontSize: theme.SIZES.large,
    color: theme.COLORS.PRICE_COLOR,
    marginTop: theme.SIZES.normal,
    marginLeft: theme.SIZES.normal,
    fontWeight: 'bold',
  },
  resultView: {
    flexDirection: 'row',
    paddingVertical: theme.SIZES.small / 2,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.SIZES.small / 2,
  },
  circle: {
    height: theme.SIZES.large,
    width: theme.SIZES.large,
    borderRadius: theme.SIZES.large,
  },
  textView: {
    flexDirection: 'row',
    width: '60%',
    flexWrap: 'wrap',
    marginLeft: theme.SIZES.small,
  },
  pageNumber: {marginLeft: 'auto', marginRight: theme.SIZES.small / 2},
  text: {
    height: theme.SIZES.large * 1.2,
    lineHeight: theme.SIZES.large * 1.2,
    fontSize: theme.SIZES.normal,
    marginRight: theme.SIZES.small / 2,
  },
});

export default HomeSearch;
