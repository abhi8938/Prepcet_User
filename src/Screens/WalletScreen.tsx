import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import AddWallet from '../Components/modals/AddWallet';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TRANSACTION_SET} from '../Constants/sample';
import {TouchableRipple} from 'react-native-paper';
import ViewAll from '../Components/common/ViewAll';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  navigation?: any;
  scene?: any;
};

const WalletCard = ({subtitle, balance, buttonTitle, bg, onPress}: any) => {
  return (
    <View style={[styles.walletCardContainer, {backgroundColor: bg}]}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {subtitle === 'Balance' ? '₹ ' : '⦿ '}
          {balance}
        </Text>
      </View>
      <TouchableRipple
        style={styles.touchable}
        centered={false}
        rippleColor={`${theme.COLORS.HEADER}30`}
        onPress={() => onPress()}
        borderless={true}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableRipple>
    </View>
  );
};

const TransactionItem = ({item}: any) => {
  console.log('item', item);
  const date: Date = new Date(item.created_at);
  return (
    <View style={styles.transactionItemContainer}>
      <MaterialIcons
        name={'cog-transfer'}
        size={35}
        color={theme.COLORS.BORDER_COLOR}
        style={{marginRight: theme.SIZES.large}}
      />
      <View style={styles.transactionItemInnerContainer}>
        <Text style={styles.transactionItemTitle}>{item.name}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
          <Text style={styles.timeText}>
            {date.getHours()}:{date.getMinutes()}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.priceText,
            {color: item.method === 'DEBIT' ? '#FF0000' : '#458B40'},
          ]}>
          {item.method === 'CREDIT' ? '+' : '-'} {item.amount}
        </Text>
      </View>
    </View>
  );
};
const WalletScreen: FunctionComponent<props> = ({navigation, scene}) => {
  const [show, setShow] = useState(false);
  const [type, setType]: any = useState('');
  return (
    <ImageBackground
      source={require('../Assets/images/bg.png')}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.05}}>
      <View style={styles.firstContainer}>
        <WalletCard
          subtitle={'Balance'}
          balance={'100'}
          buttonTitle={'Add'}
          bg={'#F49D37'}
          onPress={() => {
            setType('WALLET');
            setShow(true);
          }}
        />
        <WalletCard
          subtitle={'Credits'}
          balance={'40'}
          buttonTitle={'Redeem'}
          bg={'#F9C74F'}
          onPress={() => {
            setType('CREDIT');
            setShow(true);
          }}
        />
      </View>
      <View style={styles.listContainer}>
        <View style={styles.transactionTopBar}>
          <Text style={[styles.buttonText, {fontSize: theme.SIZES.large + 3}]}>
            Transactions
          </Text>
          <ViewAll onPress={() => console.log('view ALl')} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={TRANSACTION_SET}
          keyExtractor={(item) => item.name + item.amount}
          renderItem={({item, index}) => <TransactionItem item={item} />}
        />
      </View>
      <AddWallet
        type={type}
        balance={'100'}
        onRequest={() => setShow(false)}
        show={show}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: theme.SIZES.large + 3,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.HEADER,
  },
  dateText: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.BLACK,
  },
  timeText: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.BLACK,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  transactionItemTitle: {
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.HEADER,
    marginBottom: 5,
  },
  transactionItemInnerContainer: {
    flex: 3,
  },
  transactionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.SIZES.normal,
    borderBottomWidth: 0.5,
    borderBottomColor: `${theme.COLORS.HEADER}50`,
    paddingBottom: theme.SIZES.small,
  },
  balanceContainer: {
    backgroundColor: `${theme.COLORS.DEFAULT}50`,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: theme.SIZES.small + 4,
    marginTop: theme.SIZES.small,
  },
  subtitle: {
    color: theme.COLORS.DEFAULT,
    fontSize: theme.SIZES.small + 5,
    fontFamily: 'ComicNeue-Bold',
    alignSelf: 'flex-start',
  },
  balanceText: {
    color: theme.COLORS.DEFAULT,
    fontSize: theme.SIZES.large * 1.9,
    fontFamily: 'ComicNeue-Bold',
  },
  walletCardContainer: {
    width: width * 0.45,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small / 1.2,
    marginBottom: theme.SIZES.large,
    borderRadius: 6,
    elevation: 5,
    shadowColor: theme.COLORS.BORDER_TEXT,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  transactionTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: theme.SIZES.large,
  },

  touchable: {
    alignSelf: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: theme.SIZES.small,
    elevation: 2,
    shadowColor: theme.COLORS.BORDER_TEXT,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontSize: theme.SIZES.large,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.HEADER,
  },
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
    paddingHorizontal: theme.SIZES.small,
    paddingTop: theme.SIZES.normal,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  listContainer: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.normal,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    flex: 1,
  },
});
export default WalletScreen;
