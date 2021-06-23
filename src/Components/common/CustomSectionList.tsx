import {Image, SectionList, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

const SectionListItem = (item: any) => {
  return (
    <TouchableRipple
      style={styles.touchable}
      centered={false}
      rippleColor={`${theme.COLORS.HEADER}20`}
      onPress={() => console.log('pressed')}
      borderless={false}>
      <View style={styles.ItemParent}>
        <Image source={{uri: item.cover}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const SectionListHeader = (section: any) => {
  return (
    <View style={styles.headerParent}>
      <Text style={styles.header}>{section.heading}</Text>
    </View>
  );
};

type props = {
  data: any;
};

const CustomSectionList: FunctionComponent<props> = ({data}) => {
  return (
    <SectionList
      style={{flex: 1, backgroundColor: theme.COLORS.DEFAULT}}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      sections={data}
      stickySectionHeadersEnabled={true}
      keyExtractor={(item, index) => `${item.title}_${index}`}
      renderItem={({item}) => <SectionListItem {...item} />}
      renderSectionHeader={({section: {heading}}) => (
        <SectionListHeader heading={heading} />
      )}
    />
  );
};

export default CustomSectionList;

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 2,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: theme.SIZES.small,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.SIZES.large - 5,
    fontFamily: 'Signika-SemiBold',
    color: theme.COLORS.BORDER_TEXT,
  },
  body: {
    fontSize: theme.SIZES.small + 3,
    textAlign: 'center',
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    marginVertical: theme.SIZES.small / 2,
  },
  image: {
    width: width * 0.4,
    resizeMode: 'cover',
    borderRadius: 5,
    aspectRatio: 1.8,
    alignSelf: 'center',
  },
  headerParent: {
    width: width * 0.99,
    alignItems: 'flex-start',
    paddingHorizontal: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.small / 2,
    borderBottomColor: `${theme.COLORS.PLACEHOLDER}`,
    backgroundColor: `${theme.COLORS.DEFAULT}`,
    borderBottomWidth: 0.8,
  },
  ItemParent: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    justifyContent: 'center',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: theme.SIZES.large * 1.6,
    fontFamily: 'Signika-Medium',
    alignSelf: 'flex-start',
    color: theme.COLORS.HEADER,
  },
});
