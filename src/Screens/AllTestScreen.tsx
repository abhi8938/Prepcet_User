import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ContentLoader, {Circle, Path, Rect} from 'react-content-loader/native';
import {Height, width} from '../Constants/size';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {getSubjectTests, getTests} from '../Store/actions/main';
import {useDispatch, useSelector} from 'react-redux';

import AlertModal from '../Components/modals/AlertModal';
import Icon from 'react-native-vector-icons/Ionicons';
import RetryScreen from '../Components/common/RetryScreen';
import TestCardComponent from '../Components/common/TestCardComponent';
import {TouchableRipple} from 'react-native-paper';
import theme from '../Constants/theme';

type props = {
  navigation?: any;
  route?: any;
};

const TestLoader = () => {
  return (
    <ContentLoader
      style={{
        marginVertical: theme.SIZES.large,
        marginHorizontal: theme.SIZES.small,
        width: width,
      }}
      speed={2}
      width={width}
      height={Height}
      viewBox={`0 0 ${width} ${Height}`}
      backgroundColor={'#f3f3f3'}
      foregroundColor="#ecebeb">
      <Rect x="4" y="1" rx="6" ry="6" width={width * 0.92} height="98" />
      <Rect x="6" y="120" rx="5" ry="5" width="157" height="32" />
      <Rect x="4" y="170" rx="6" ry="6" width="111" height="82" />
      <Rect x="132" y="170" rx="6" ry="6" width="111" height="82" />
      <Rect x="258" y="170" rx="6" ry="6" width="111" height="82" />
      <Rect x="4" y="275" rx="5" ry="5" width={width * 0.92} height="120" />
      <Rect x="6" y="415" rx="5" ry="5" width="157" height="32" />
      <Rect x="4" y="465" rx="6" ry="6" width="111" height="82" />
      <Rect x="132" y="465" rx="6" ry="6" width="111" height="82" />
      <Rect x="258" y="465" rx="6" ry="6" width="111" height="82" />
    </ContentLoader>
  );
};

const AllTestScreen: FunctionComponent<props> = ({navigation, route}) => {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setRefreshing] = useState(false);

  const mock_tests: Array<any> = useSelector(
    (state: any) => state.main.mock_tests,
  );
  const selected_category = useSelector(
    (state: any) => state.main.selected_category,
  );

  const dispatch = useDispatch();

  const get_data = useCallback(async () => {
    setRefreshing(true);
    setError('');
    try {
      //* fetch Tests
      await dispatch(getTests(selected_category));
    } catch (err) {
      setError(err.message ? err.message : err);
    }
    setRefreshing(false);
  }, [dispatch, setLoad, setError]);

  useEffect(() => {
    setLoad(true);
    get_data().then(() => setLoad(false));
  }, []);

  const onRefresh = useCallback(() => {
    get_data();
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={theme.COLORS.DEFAULT}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={require('../Assets/images/bg.png')}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.05}}>
        {error.length > 0 && (
          <RetryScreen
            onPress={() => {
              setError('');
              get_data();
            }}
            message={error}
          />
        )}
        {error.length === 0 && load === true && <TestLoader />}
        {error.length === 0 && load === false && (
          <FlatList
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            keyExtractor={(item) => `${item._id}`}
            showsHorizontalScrollIndicator={false}
            data={mock_tests}
            renderItem={({item, index}) => (
              <TestCardComponent
                item={item}
                type={'1'}
                onPress={() => navigation.navigate('TestBrief', {test: item})}
              />
            )}
          />
        )}
        <AlertModal />
      </ImageBackground>
    </View>
  );
};

export default AllTestScreen;

const styles = StyleSheet.create({
  touchable: {
    alignSelf: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small + 2,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: theme.SIZES.small,
    elevation: 2,
    shadowColor: theme.COLORS.BORDER_TEXT,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  listText: {
    fontSize: theme.SIZES.large + 2,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.HEADER,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: theme.SIZES.small / 2,
    borderRadius: 6,
  },
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  verticalList: {
    backgroundColor: theme.COLORS.DEFAULT,
  },
});
