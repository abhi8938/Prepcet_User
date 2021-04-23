import {Alert, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
// TODO: Customize Epub Reader
//  - Toggle Top and Bottom Bar visibility for full screen read
//* - Title on page Top
//* - Page Number on bottom
// @ts-ignore
import {Epub, Streamer} from '@ottofeller/epubjs-rn';
import {Height, width} from '../../Constants/size';
import React, {
  FunctionComponent,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import Services, {ann_data, config} from './services';
import theme, {default_ann, default_config} from '../../Constants/theme';

import Bottombar from './Bottombar';
//@ts-ignore
import CFI from 'epub-cfi-resolver';
//@ts-ignore
import Dropmenu from './Dropmenu';
import Handlers from './Handlers';
import Navigation from './Navigation';
import Search from './Search';
import Topbar from './Topbar';
import themeToStyles from '../../Services/themeToStyles';
import useReaderState from './state';

const streamer = new Streamer();
const services = new Services();

type props = {
  navigation: any;
  route: any;
  annotation_data?: {ann: ann_data; annotations: Array<ann_data>};
  config_data?: config;
};

const index: FunctionComponent<props> = ({navigation, route}) => {
  const {
    src,
    bookData,
    controls,
    pageData,
    annotations,
    config,
    search,
    lists,
    selected,
    handleBook,
    handleControls,
    handleAnnotations,
    handleConfig,
    handleSearch,
    handleLists,
    handlePageData,
    toggleBars,
    setSrc,
    setSelected,
    onDblPress,
    onPress,
    onLongPress,
    onMarkClicked,
    onReady,
    onError,
    onSelected,
    onViewAdded,
    beforeViewRemoved,
  } = useReaderState();

  const dropLocation = useRef({
    offsetX: 0,
    offsetY: 0,
  });
  const epub: any = useRef(null);

  useEffect(() => {
    handleBook('load', true);

    streamer
      .start()
      .then(async (origin: any) => {
        handleBook('origin', origin);
        const dat = await streamer.get(
          'https://s3.amazonaws.com/epubjs/books/moby-dick.epub',
        );
        return dat;
      })
      .then((source: any) => {
        return setSrc(source);
      })
      .catch((error: any) => console.log('error_static', error));

    handleBook('load', false);

    setTimeout(() => toggleBars(), 1000);

    let onmessage: any = null;

    if (epub.current) {
      onmessage = epub.current?.rendition.webviewbridgeRef.current?.onMessage(
        (e: any) => {
          services.handleMessages(e, (results) =>
            handleSearch('results', results),
          );
        },
      );
    }

    return () => {
      onmessage;
      streamer.kill();
    };
  }, []);

  useEffect(() => {
    if (annotations.ann.type !== 'EMPTY') {
      const response = services.onAnnotations(
        annotations.ann,
        lists.annotations,
        epub.current?.rendition,
      );
      console.log('response_annotations', response);
      if (response) handleLists('annotations', response);
    }
    return;
  }, [annotations]);

  useEffect(() => {
    // DeviceBrightness.setBrightnessLevel(config.brightness / 100);
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(config.background, true);
  }, [config]);

  useEffect(() => {
    if (selected.epubcfi.length === 0) return;
    handleControls('type', 'ANN');
  }, [selected]);

  return (
    <View style={[styles.container, {backgroundColor: config.background}]}>
      <StatusBar barStyle={'dark-content'} />

      <Epub
        ref={epub}
        width={width}
        height={Height}
        style={styles.reader}
        src={src}
        flow={config.flow}
        location={bookData.location}
        origin={bookData.origin}
        themes={{
          theme: themeToStyles(config),
        }}
        theme="theme"
        onPress={onPress}
        onLongPress={onLongPress}
        onDblPress={onDblPress}
        onViewAdded={onViewAdded}
        beforeViewRemoved={beforeViewRemoved}
        onSelected={(cfiRange: any, rendition: any) =>
          onSelected(cfiRange, bookData.book)
        }
        onMarkClicked={(cfiRange: any, data: any, rendition: any) =>
          onMarkClicked(cfiRange, data, bookData.book)
        }
        onReady={onReady}
        onError={onError}
      />

      <View style={[styles.bar, {top: 0}]}>
        <Topbar
          bg={config.background}
          title={bookData.title.toUpperCase()}
          shown={controls.showBars}
          //DEBUG
          onNavPress={() => handleControls('showNav', !controls.showNav)}
          onBackPress={() => {
            navigation.goBack();
          }}
          onSettings={(event: any) => {
            dropLocation.current = {
              offsetX: event.nativeEvent.pageX.toFixed(2),
              offsetY: event.nativeEvent.pageY.toFixed(2),
            };
            handleControls('type', controls.type === 'CONFIG' ? '' : 'CONFIG');
          }}
          onBookMark={() => {
            //TODO: Handle Bookmarks
          }}
          onSearch={() => {
            //TODO: Handle Search
            handleSearch('show', !search.show);
          }}
        />
      </View>

      <View style={[styles.bar, {bottom: 0}]}>
        <Bottombar
          bg={config.background}
          disabled={controls.sliderDisabled}
          value={
            //DEBUG
            controls.visibleLocation && controls.visibleLocation
              ? controls.visibleLocation.start.percentage
              : 0
          }
          shown={controls.showBars}
          onSlidingComplete={(value: any) => {
            handleBook('location', value.toFixed(5));
          }}
        />
      </View>

      <Navigation
        //DEBUG
        shown={controls.showNav}
        onClose={() => handleControls('showNav', !controls.showNav)}
        display={(loc: any) => {
          handleBook('location', loc);
        }}
        toc={bookData.toc}
      />

      <Search
        list={lists.results}
        show={search.show}
        onClose={() => handleSearch('show', false)}
        query={search.query}
        onChange={(query) => handleSearch('query', query)}
      />

      <Dropmenu
        selected={selected}
        type={controls.type}
        location={dropLocation.current}
        updateAnn={(ann) => handleAnnotations('ann', ann)}
        updateConfig={(config) => handleConfig('CONFIG', config)}
        ann={annotations.ann}
        config={config}
        handleClose={() => handleControls('type', '')}
        onDelete={(ann) => {
          // const new_annotations = services.onDelete(
          //   ann,
          //   annotations.annotations,
          //   epub.current?.rendition,
          // );
          // handleAnnotations('annotations', new_annotations);
        }}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  reader: {
    flex: 1,
  },
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: theme.SIZES.large * 1.5,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 55,
  },
});
