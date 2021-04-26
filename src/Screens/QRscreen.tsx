import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Share} from 'react-native';
import TopNavbar from '../Components/common/TopNavbar';
import QRCode from 'react-native-qrcode-svg';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../Constants/theme';

type props = {};
const QRscreen: FunctionComponent<props> = () => {
  const onBack = () => {};
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'PrepUni Refer Link http://awesome.link.qr. Use this link to avail 10% discount on PrepUni subscription',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <TopNavbar title={'Refer'} iconOnPress={onBack} logo />
      <View style={styles.parent}>
        <View>
          <QRCode
            value="http://awesome.link.qr"
            logo={require('../Assets/images/prepuni_logo.jpg')}
            logoSize={40}
            size={200}
          />
        </View>
        <View style={styles.shareParent}>
          <Text style={styles.scanQRText}>Scan this QR code to Refer</Text>
          <Text style={styles.shareText}>or share this link</Text>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Icon name={'share-social'} color={theme.COLORS.ACTIVE} size={20} />
            <Text style={styles.shareButtonText}>Share my referral code</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.discountParent}>
          <Text style={styles.dicountHead}>Disount Offer</Text>
          <Text style={styles.discountDesc}>
            10% discount to your friend who registers
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 60,
  },
  shareParent: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  scanQRText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareText: {
    fontSize: 15,
    marginTop: 10,
    color: '#00000080',
  },
  shareButton: {
    marginTop: 30,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: theme.COLORS.ACTIVE,
    paddingHorizontal: '6%',
    paddingVertical: '2.5%',
    borderRadius: 40,
  },
  shareButtonText: {
    marginLeft: 10,
    fontSize: 15,
    color: theme.COLORS.ACTIVE,
  },
  discountParent: {
    height: '15%',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    marginTop: 'auto',
    alignItems: 'center',
    backgroundColor: '#F3983E60',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  dicountHead: {
    fontWeight: 'bold',
    fontSize: 20,
    borderBottomWidth: 2,
  },
  discountDesc: {
    fontWeight: 'bold',
  },
});

export default QRscreen;
