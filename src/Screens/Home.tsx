import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CONTENT_LIST_DATA,
  GRADIENT_SET,
  QUESTION_DATA,
  SECTIONED_DATA,
  TEST_DATA,
} from '../Constants/sample';
import ContentLoader, {Circle, Path, Rect} from 'react-content-loader/native';
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {Height, width} from '../Constants/size';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  getAffairs,
  getLectures,
  getNotifications,
  getSubjects,
} from '../Store/actions/main';
import {getUser, handleAlert} from '../Store/actions/user';
import {useDispatch, useSelector} from 'react-redux';

import AffairCardComponent from '../Components/AffairCardComponent';
import AlertModal from '../Components/modals/AlertModal';
import BoxComponent from '../Components/common/BoxComponent';
import ComboComponent from '../Components/ComboComponent';
import ContentListItem from '../Components/common/ContentListItem';
import Cover from '../Components/common/Cover';
import CustomSectionList from '../Components/common/CustomSectionList';
import ErrorScreen from '../Components/common/ErrorScreen';
import HorizontalListContainer from '../Components/common/HorizontalListContainer';
import HorizontalSubjectList from '../Components/HorizontalSubjectList';
import OfferHomeComponent from '../Components/OfferHomeComponent';
import QuestionItemComponent from '../Components/common/QuestionItemComponent';
import RetryScreen from '../Components/common/RetryScreen';
import SwiperComponent from '../Components/common/SwiperComponent';
import TestCardComponent from '../Components/common/TestCardComponent';
import {TouchableRipple} from 'react-native-paper';
import Verticallist from '../Components/common/VerticallistItem';
import VideoComponent from '../Components/VideoComponent';
import VideoCover from '../Components/VideoCover';
import index from '../../__tests__/Reader';
import notification from '../Services/notification';
import theme from '../Constants/theme';

const RenderPrepTests = ({bg}: any) => {
  return (
    <View style={[styles.mainContainer]}>
      <BoxComponent
        bg={bg}
        onPress={() => console.log('pressed')}
        title={'Daiy Quizzes'}
        icon={'alarm'}
      />
      <BoxComponent
        bg={bg}
        onPress={() => console.log('pressed')}
        title={'Mock Tests'}
        icon={'disc'}
      />
      <BoxComponent
        bg={bg}
        onPress={() => console.log('pressed')}
        title={'Previous Year Papers'}
        icon={'document-text'}
      />
    </View>
  );
};

const RenderDoubts = ({bg}: any) => {
  return (
    <View style={[styles.mainContainer]}>
      <BoxComponent
        bg={bg}
        onPress={() => console.log('pressed')}
        title={'Post Doubt'}
        icon={'ios-create'}
      />
      <BoxComponent
        bg={bg}
        onPress={() => console.log('pressed')}
        title={'Solved Doubts'}
        icon={'ios-browsers'}
      />
      <BoxComponent
        bg={bg}
        onPress={() => console.log('pressed')}
        title={'All Doubts'}
        icon={'journal-outline'}
      />
    </View>
  );
};

const NewWordsButton = () => {
  return (
    <TouchableRipple
      style={styles.touchable}
      centered={false}
      rippleColor={`${theme.COLORS.HEADER}30`}
      onPress={() => console.log('pressed')}
      borderless={true}>
      <Text style={styles.listText}>Prep New Words</Text>
    </TouchableRipple>
  );
};

const HomeLoader = () => {
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
      <Rect x="6" y="570" rx="5" ry="5" width="157" height="32" />
      <Rect x="4" y="620" rx="6" ry="6" width="111" height="82" />
      <Rect x="132" y="620" rx="6" ry="6" width="111" height="82" />
      <Rect x="258" y="620" rx="6" ry="6" width="111" height="82" />
    </ContentLoader>
  );
};
const notification_service = new notification();
const Home: FunctionComponent = ({navigation, scene}: any) => {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');
  const selected_category = useSelector(
    (state: any) => state.main.selected_category,
  );
  const subjects: Array<any> = useSelector((state: any) => state.main.subjects);
  const lectures: Array<any> = useSelector((state: any) => state.main.lectures);
  const affairs: Array<any> = useSelector(
    (state: any) => state.main.current_affairs,
  );

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  const dispatch = useDispatch();

  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };

  const get_data = useCallback(async () => {
    try {
      setLoad(true);
      //* fetch Offers
      await dispatch(getUser());
      await dispatch(getSubjects(selected_category));
      await dispatch(getLectures(selected_category));
      await dispatch(getAffairs());
      await dispatch(getNotifications());
      setLoad(false);
    } catch (err) {
      setLoad(false);
      setError(err.message ? err.message : err);
    }
  }, [dispatch, setLoad, setError]);
  useEffect(() => {
    let backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const focus = navigation.addListener('focus', () => {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    });
    const blur = navigation.addListener('blur', () => backHandler.remove());
    return () => {
      blur();
      focus();
    };
  }, []);

  useEffect(() => {
    get_data();
  }, [selected_category]);

  const check = async () => {
    await notification_service.checkHasPermission();
    await notification_service.getToken();
  };
  useEffect(() => {
    check();

    const unsubscribe = notification_service.messageListener(dispatch);
    const unsubscribe_notification = notification_service.notificationEvent();
    const unsubscribe_tokenRefresh = notification_service.onTokenRefresh();
    return () => {
      unsubscribe_notification;
      unsubscribe;
      unsubscribe_tokenRefresh;
    };
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
        {error.length === 0 && load === true && <HomeLoader />}
        {error.length === 0 && load === false && (
          <ScrollView>
            <SwiperComponent
              height={Height > 800 ? Height * 0.25 : Height * 0.3}>
              {[1, 2, 3].map((item, index) => (
                <View key={item}>
                  <OfferHomeComponent
                    key={item}
                    onPress={() => console.log('pressed')}
                    code={'CET50'}
                    title={'Get 10% extra balance on first topup use'}
                    offer={'10%'}
                  />
                </View>
              ))}
            </SwiperComponent>
            <HorizontalListContainer
              onViewAll={() => navigation.navigate('DailyLecture')}
              heading={'Daily Classes'}>
              <FlatList
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={lectures}
                renderItem={({item, index}) => (
                  <VideoCover
                    coverWidth={width * 0.9}
                    onPress={() => console.log('pressed')}
                    item={item}
                  />
                )}
              />
            </HorizontalListContainer>
            {subjects.map((item: any, index: number) => {
              if (item.name.toLowerCase() === 'general studies') {
                return (
                  <HorizontalSubjectList
                    subject={item._id}
                    key={item._id}
                    name={item.name}
                    navigation={navigation}
                    bg={'#50c878'}>
                    <HorizontalListContainer
                      onViewAll={() => navigation.navigate('CurrentAffairs')}
                      heading={'Current Affairs'}>
                      <SwiperComponent
                        height={Height > 800 ? Height * 0.34 : Height * 0.4}>
                        {affairs.map((item, index) => (
                          <View key={item}>
                            <AffairCardComponent
                              cover={
                                'https://www.gktoday.in/wp-content/uploads/2021/05/eric-carle.png'
                              }
                              onPress={() =>
                                navigation.navigate('CurrentAffairs', {
                                  index: index,
                                })
                              }
                              title={item.body}
                              // 'Beloved Children’s author and illustrator, Eric Carle, died at age 91. He was famous among children for his classic The Very Hungry Caterpillar and other such works. About Eric Carle He was an American designer, illustrator, and children’s author.'
                            />
                          </View>
                        ))}
                      </SwiperComponent>
                    </HorizontalListContainer>
                  </HorizontalSubjectList>
                );
              } else if (item.name.toLowerCase() === 'english') {
                return (
                  <HorizontalSubjectList
                    subject={item._id}
                    key={item._id}
                    name={item.name}
                    navigation={navigation}
                    bg={'#b76e79'}>
                    <NewWordsButton />
                  </HorizontalSubjectList>
                );
              } else {
                return (
                  <HorizontalSubjectList
                    subject={item._id}
                    key={item._id}
                    name={item.name}
                    navigation={navigation}
                    bg={
                      item.name.toLowerCase() === 'quantitative reasoning'
                        ? '#8980f5'
                        : '#e69028'
                    }
                  />
                );
              }
            })}
            <HorizontalListContainer heading={'Prep Tests'}>
              <RenderPrepTests bg={theme.COLORS.GOOGLE} />
            </HorizontalListContainer>
            <HorizontalListContainer heading={'Doubts'}>
              <RenderDoubts bg={theme.COLORS.FACEBOOK} />
            </HorizontalListContainer>
          </ScrollView>
        )}
        <AlertModal />
      </ImageBackground>
    </View>
  );
};
export default Home;

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

/* <SwiperComponent height={Height > 800 ? Height * 0.34 : Height * 0.4}>
  {[1, 2, 3].map(() => (
    <View>
      <AffairHomeComponent
        cover={
          'https://www.gktoday.in/wp-content/uploads/2021/05/eric-carle.png'
        }
        onPress={() => console.log('pressed')}
        title={
          'Beloved Children’s author and illustrator, Eric Carle, died at age 91. He was famous among children for his classic The Very Hungry Caterpillar and other such works. About Eric Carle He was an American designer, illustrator, and children’s author.'
        }
      />
    </View>
  ))}
</SwiperComponent>; */

/* <VideoCover
          cover={'https://i.ytimg.com/vi/CMKJoK3DI50/maxresdefault.jpg'}
          onPress={() => console.log('pressed')}
          duration={'30:00 M'}
          title={'Verbs - usage and exam preparation'}
        />
        */

//  <FlatList
//    data={GRADIENT_SET}
//    renderItem={({item, index}) => (
//      <ComboComponent
//        title={item.title}
//        onPress={() => console.log('combo buy')}
//        colors={{
//          first: item.first,
//          second: item.second,
//        }}
//      />
//    )}
//  />;
//  <FlatList
//    data={CONTENT_LIST_DATA}
//    renderItem={({item, index}) => (
//      <ContentListItem
//        onPress={() => console.log('pressed')}
//        title={item.title}
//      />
//    )}
//  />;
// <Cover uri={'https://i.ytimg.com/vi/ZBnmg2-1NX8/maxresdefault.jpg'} />
//   <QuestionItemComponent item={QUESTION_DATA[1]} index={0} />
//   <Verticallist data={resouces_data} />
//   <HorizontalListContainer heading={'Mock Tests'}>
//     <FlatList
//       showsHorizontalScrollIndicator={false}
//       horizontal={true}
//       data={TEST_DATA}
//       renderItem={({item, index}) => (
//         <TestCardComponent type={'1'} item={item} />
//       )}
//     />
//   </HorizontalListContainer>
//   <FlatList
//     showsHorizontalScrollIndicator={false}
//     data={TEST_DATA}
//     renderItem={({item, index}) => (
//       <TestCardComponent type={'2'} item={item} />
//     )}
//   />
//   <HorizontalSubjectList name={'English'} bg={'#b76e79'} />
//   <HorizontalSubjectList name={'Logical Reasoning'} bg={'#e69028'} />
//   <HorizontalSubjectList
//     name={'Quantitative Reasoning'}
//     bg={'#8980f5'}
//   />
//   <HorizontalSubjectList name={'General Knowledge '} bg={'#50c878'} />
//   <HorizontalSubjectList name={'Current Affairs '} bg={'#2ec4b6'} />
//   <HorizontalSubjectList name={'General Science '} bg={'#5b8e7d'} />
