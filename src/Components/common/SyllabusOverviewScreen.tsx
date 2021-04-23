import {Height, width} from '../../Constants/size';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import TopNavBar from './TopNavbar';
import theme from '../../Constants/theme';

type props = {
  show: boolean;
  onBack: () => void;
  subject: any;
};

const SyllabusOverviewScreen: FunctionComponent<props> = ({
  show,
  onBack,
  subject,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={show}
      style={{}}
      onRequestClose={onBack}>
      <View
        style={{
          backgroundColor: theme.COLORS.DEFAULT,
          marginTop: Platform.OS === 'ios' ? theme.SIZES.large * 1.42 : 0,
        }}>
        <TopNavBar title={'Syllabus'} iconOnPress={onBack} />
        <View style={{paddingHorizontal: theme.SIZES.small}}>
          <View
            style={{
              marginTop: theme.SIZES.normal,
              backgroundColor: theme.COLORS.PRIMARY,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: theme.SIZES.small / 2,
            }}>
            <Text
              style={{
                fontSize: theme.SIZES.large * 1.3,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Medium',
              }}>
              {`${subject.code} ${subject.name}`}
            </Text>
            <View
              style={{
                marginLeft: 'auto',
              }}>
              <Text
                style={{
                  fontSize: theme.SIZES.small * 1.2,
                  fontFamily: 'ComicNeue-Bold',
                }}>
                {' '}
                100 marks{' '}
              </Text>
            </View>
          </View>

          <View style={styles.parent}>
            <ScrollView>
              {subject.chapter.map((item: any, index: number) => (
                <View
                  key={index}
                  style={[
                    {
                      borderBottomWidth:
                        subject.chapter.length - 1 == index ? 0 : 2,
                    },
                    styles.child,
                  ]}>
                  <Text
                    style={{
                      fontSize: theme.SIZES.normal,
                      fontFamily: 'ComicNeue-Regular',
                    }}>{`${index + 1}.  ${item}`}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginTop: theme.SIZES.small,
    width: '100%',
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
  },
  child: {
    width: '100%',
    height: Height * 0.06,
    justifyContent: 'center',

    borderBottomColor: '#00000080',
  },
});
export default SyllabusOverviewScreen;
