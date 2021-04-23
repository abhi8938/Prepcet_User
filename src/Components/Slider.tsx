import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Height, width} from '../Constants/size';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import theme from '../Constants/theme';

type props = {
  list: Array<any>;
};

const Slider: FunctionComponent<props> = ({list}) => {
  const [Page, setPage] = useState(0);
  const scrollRef: any = useRef(null);
  const ind: any = useRef(0);
  const RoundView = () => (
    <View style={styles.roundContainer}>
      {list.map((_, i) => {
        if (i === Page) {
        }
        return (
          <View
            key={i}
            style={[
              styles.round,
              {
                borderColor:
                  i === Page ? theme.COLORS.BLACK : theme.COLORS.PLACEHOLDER,
              },
            ]}></View>
        );
      })}
    </View>
  );

  const RenderComponent = ({item, index}: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={{width: width * 0.6, height: Height * 0.3}}
            source={item.image}
            resizeMode={'cover'}
          />
        </View>
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef.current?.scrollTo({
        x: ind.current > width * 0.95 * 3.9 ? 0 : ind.current + width * 0.95,
        y: 0,
        animated: true,
      });
    }, 3000);
    return () => {
      interval;
    };
  }, []);
  return (
    <View style={styles.parent}>
      <ScrollView
        ref={scrollRef}
        horizontal
        snapToStart={true}
        pagingEnabled={true}
        scrollEventThrottle={16}
        onScroll={(e) => {
          let contentOffset = e.nativeEvent.contentOffset;
          let viewSize = e.nativeEvent.layoutMeasurement;
          let pageNum = Math.floor(contentOffset.x / viewSize.width);
          ind.current = contentOffset.x;
          if (pageNum != Page) setPage(pageNum);
        }}
        showsHorizontalScrollIndicator={false}>
        {list.map((item, index) => (
          <RenderComponent key={`${item.label}`} item={item} index={index} />
        ))}
      </ScrollView>
      <RoundView />
    </View>
  );
};
export default Slider;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    width: width * 0.95,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.SIZES.small,
    marginBottom: theme.SIZES.normal,
  },
  image: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Height * 0.3,
  },
  label: {
    fontSize: theme.SIZES.large + 4,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Bold',
  },
  roundContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    width: 2,
    height: 2,
    borderWidth: 4,
    marginHorizontal: 3,
    borderRadius: 4,
  },
  black: {
    borderColor: theme.COLORS.BLACK,
  },
  grey: {
    borderColor: theme.COLORS.PLACEHOLDER,
  },
});
