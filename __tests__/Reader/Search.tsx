import {
  FlatList,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Height, width} from '../../Constants/size';
//TODO:
//Top Bar
//   Cancel Button
//   Search String - Text Input
// FLat List to show the searched data
import React, {useEffect, useRef, useState} from 'react';

import Icon from '../../Components/common/Icon';
import Icon1 from 'react-native-vector-icons/Entypo';
import Ion from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import bg from '../../../assets/images/bg.png';
import {search_result} from './services';
import theme from '../../Constants/theme';

const TopInputbar = ({
  query,
  onClose,
  onChange,
}: {
  query: string;
  onClose: () => void;
  onChange: (query: string) => void;
}) => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.searchBar}>
      <Ion size={35} name={'chevron-back-outline'} onPress={onClose} />
      <View style={styles.searchBox}>
        <Ion name="search" size={22} />
        <TextInput
          style={{
            paddingHorizontal: theme.SIZES.small,
            paddingVertical: theme.SIZES.small * 0.9,
            maxWidth: '86%',
          }}
          placeholder={'Type Your Search Here'}
          onChangeText={(text) => {
            setValue(text);
          }}
          value={value}
        />
        <TouchableOpacity
          onPress={() => onChange('')}
          style={{marginLeft: 'auto'}}>
          <Icon1 name="circle-with-cross" size={22} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.searchText}>
        <Text
          style={{
            fontSize: theme.SIZES.small * 1.1,
            color: theme.COLORS.Links,
          }}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
    // <View style={styles.topbar}>
    //   <Ion size={0.8} name={'chevron-back-outline'} />
    //   <View style={styles.topbar_input_container}>
    //     <Ion name="search" size={20} />
    //     <TextInput
    //       style={styles.topbar_input}
    //       autoFocus={true}
    //       placeholder={'Search here'}
    //       value={query}
    //       onChangeText={(text) => onChange(text)}
    //       multiline={false}
    //     />
    //     <TouchableOpacity onPress={() => onChange('')}>
    //       <Icon1 name="circle-with-cross" size={20} />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.topbar_cancel_container}>
    //     <TouchableWithoutFeedback onPress={onClose}>
    //       <Text>Cancel</Text>
    //     </TouchableWithoutFeedback>
    //   </View>
    // </View>
  );
};

const List = ({list}: any, onPress: (item: any | search_result) => void) => {
  const [data, setData] = useState({
    text:
      'Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum ipsum Loreum ipsum Loreum ipsum Loreum ipsum',
    page: 'Page 20',
  });
  return (
    <ImageBackground
      source={bg}
      style={styles.listcontainer}
      resizeMode="cover"
      imageStyle={{opacity: 0.03}}>
      <View style={styles.searchedItem}>
        <Text style={styles.text}>{data.text}</Text>
        <Text style={styles.pageNumber}>{data.page}</Text>
      </View>

      {/* <FlatList
        data={list}
        keyExtractor={(item, index) => `${item}` + `${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={styles.listview}>
            <Text style={styles.text_normal}>
              {item.length > 120
                ? item.substring(0, 110) + '...'
                : JSON.stringify(item)}
            </Text>
          </TouchableOpacity>
        )}
         ListFooterComponent={() => <ListBottom />}
      /> */}
    </ImageBackground>
  );
};

const ListBottom = () => {
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.COLORS.WHITE,
        },
        styles.listview,
      ]}>
      <Text style={styles.text_normal}>Search Completed</Text>
      <Text style={styles.text_small}>1 match found </Text>
    </View>
  );
};

type props = {
  show: boolean;
  onClose: () => void;
  list: Array<any>;
  query: string;
  onChange: (query: string) => void;
};
const Search = ({show, onClose, list, query, onChange}: props) => {
  return (
    <Modal
      backdropColor={'#fff'}
      backdropOpacity={1}
      isVisible={show}
      style={styles.modal}
      propagateSwipe
      avoidKeyboard={true}
      animationInTiming={600}
      animationIn={'slideInLeft'}
      animationOut={'slideOutRight'}
      animationOutTiming={500}>
      <TopInputbar onClose={onClose} query={query} onChange={onChange} />
      <List list={list} query={query} onChange={onChange} />
    </Modal>
  );
};

export default Search;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    marginTop: Platform.OS === 'ios' ? theme.SIZES.large * 1.2 : 0,
  },
  searchBar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: theme.SIZES.small / 2,
    paddingHorizontal: theme.SIZES.small / 2,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.SIZES.small / 2,
    backgroundColor: '#e4e3e8',
    paddingHorizontal: theme.SIZES.small,
    borderRadius: 15,
    width: '70%',
  },

  searchText: {
    marginLeft: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.Links,

    marginRight: theme.SIZES.small,
  },

  searchedItem: {
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.small / 2,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.normal,
    borderBottomColor: theme.COLORS.BORDER_COLOR,
    borderBottomWidth: 1,
  },

  text: {width: '78%', fontSize: theme.SIZES.small * 1.1},

  pageNumber: {fontSize: theme.SIZES.small * 1.1},
  topbar: {
    flexDirection: 'row',
    maxHeight: 60,
    minHeight: 40,
    flex: 0.1,
  },
  topbar_input_container: {
    flex: 0.8,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#e4e3e8',
    paddingLeft: 10,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: '#e4e3e8',
  },
  topbar_cancel_container: {
    flex: 0.2,
    justifyContent: 'center',
  },
  topbar_input: {
    borderColor: 'black',
    width: '85%',
    paddingVertical: 5,
    paddingLeft: 10,
    height: 25,
  },
  listcontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.COLORS.WHITE,
    paddingHorizontal: theme.SIZES.small,
  },
  listview: {
    padding: 5,
    paddingLeft: 20,
    borderBottomColor: theme.COLORS.BORDER,
    borderBottomWidth: 1.4,
  },
  text_small: {
    fontSize: theme.SIZES.small,
  },
  text_normal: {
    fontSize: theme.SIZES.normal,
  },
  text_large: {
    fontSize: theme.SIZES.large,
  },
});
