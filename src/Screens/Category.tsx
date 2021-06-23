import ContentLoader, {Circle, Path, Rect} from 'react-content-loader/native';
import {Height, width} from '../Constants/size';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {getCategories, set_selected_category} from '../Store/actions/main';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryItem from '../Components/CategoryItem';
import Icon from 'react-native-vector-icons/Ionicons';
import RetryScreen from '../Components/common/RetryScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {handleAlert} from '../Store/actions/user';
import theme from '../Constants/theme';

type props = {
  navigation?: any;
  scene?: any;
};

const category_data = [
  {
    name: 'Banking',
    cover:
      'https://media.istockphoto.com/vectors/bank-building-isolated-on-white-background-vector-illustration-flat-vector-id900791430?k=6&m=900791430&s=612x612&w=0&h=i8p6EfGRaDb86Z5dyGgURWVi--2KFYuoVjNJUHnrChk=',
  },
  {
    name: 'MBA',
    cover:
      'https://media.istockphoto.com/vectors/bank-building-isolated-on-white-background-vector-illustration-flat-vector-id900791430?k=6&m=900791430&s=612x612&w=0&h=i8p6EfGRaDb86Z5dyGgURWVi--2KFYuoVjNJUHnrChk=',
  },
  {
    name: 'IELTS',
    cover:
      'https://media.istockphoto.com/vectors/bank-building-isolated-on-white-background-vector-illustration-flat-vector-id900791430?k=6&m=900791430&s=612x612&w=0&h=i8p6EfGRaDb86Z5dyGgURWVi--2KFYuoVjNJUHnrChk=',
  },
  {
    name: 'NDA',
    cover:
      'https://media.istockphoto.com/vectors/bank-building-isolated-on-white-background-vector-illustration-flat-vector-id900791430?k=6&m=900791430&s=612x612&w=0&h=i8p6EfGRaDb86Z5dyGgURWVi--2KFYuoVjNJUHnrChk=',
  },
];

const Category: FunctionComponent<props> = ({navigation, scene}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  const categories: Array<any> = useSelector(
    (state: any) => state.main.categories,
  );
  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };
  const handlePress = async (category: string) => {
    await AsyncStorage.setItem('CATEGORY', category);
    dispatch(set_selected_category(category));
    return navigation.replace('Main');
  };

  const CategoryLoader = () => {
    return (
      <ContentLoader
        style={{
          marginVertical: theme.SIZES.large,
          marginHorizontal: theme.SIZES.small,
          width: width,
          justifyContent: 'center',
        }}
        speed={2}
        width={width}
        height={Height}
        viewBox={`0 0 ${width} ${Height}`}
        backgroundColor={'#f3f3f3'}
        foregroundColor="#ecebeb">
        <Rect x="4" y="10" rx="6" ry="6" width="115" height="82" />
        <Rect x="4" y="100" rx="6" ry="6" width="115" height="10" />

        <Rect x="136" y="10" rx="6" ry="6" width="115" height="82" />
        <Rect x="136" y="100" rx="6" ry="6" width="115" height="10" />

        <Rect x="269" y="10" rx="6" ry="6" width="115" height="82" />
        <Rect x="269" y="100" rx="6" ry="6" width="115" height="10" />

        <Rect x="4" y="130" rx="6" ry="6" width="115" height="82" />
        <Rect x="4" y="220" rx="6" ry="6" width="115" height="10" />

        <Rect x="136" y="130" rx="6" ry="6" width="115" height="82" />
        <Rect x="136" y="220" rx="6" ry="6" width="115" height="10" />

        <Rect x="269" y="130" rx="6" ry="6" width="115" height="82" />
        <Rect x="269" y="220" rx="6" ry="6" width="115" height="10" />

        <Rect x="4" y="250" rx="6" ry="6" width="115" height="82" />
        <Rect x="4" y="340" rx="6" ry="6" width="115" height="10" />

        <Rect x="136" y="250" rx="6" ry="6" width="115" height="82" />
        <Rect x="136" y="340" rx="6" ry="6" width="115" height="10" />

        <Rect x="269" y="250" rx="6" ry="6" width="115" height="82" />
        <Rect x="269" y="340" rx="6" ry="6" width="115" height="10" />

        <Rect x="4" y="370" rx="6" ry="6" width="115" height="82" />
        <Rect x="4" y="460" rx="6" ry="6" width="115" height="10" />

        <Rect x="136" y="370" rx="6" ry="6" width="115" height="82" />
        <Rect x="136" y="460" rx="6" ry="6" width="115" height="10" />

        <Rect x="269" y="370" rx="6" ry="6" width="115" height="82" />
        <Rect x="269" y="460" rx="6" ry="6" width="115" height="10" />
      </ContentLoader>
    );
  };

  const fetch_categories = async () => {
    try {
      setLoad(true);
      await dispatch(getCategories());
      setLoad(false);
    } catch (error) {
      console.log('category_error', error);
      setLoad(false);
      setError(error.message ? error.message : error);
      // handle_alert('ERROR', error.message ? error.message : error);
    }
  };

  useEffect(() => {
    fetch_categories();
  }, []);
  return (
    <ImageBackground
      source={require('../Assets/images/bg.png')}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.05}}>
      {error.length > 0 && (
        <RetryScreen
          onPress={() => {
            setError('');
            fetch_categories();
          }}
          message={error}
        />
      )}
      {error.length === 0 && load === true && <CategoryLoader />}
      {error.length === 0 && load === false && (
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: theme.SIZES.large,
            paddingHorizontal: theme.SIZES.small,
            justifyContent: 'center',
          }}>
          {categories &&
            categories.map((item, index) => (
              <CategoryItem
                key={`${item.name}*${index + 1}`}
                item={item}
                onPress={() => handlePress(item._id)}
              />
            ))}
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
});
export default Category;
