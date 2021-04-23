import {
    FlatList,
    Image,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import {Height, width} from '../Constants/size';
  import React, {FunctionComponent, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import theme from '../Constants/theme';
import welcome from '../../assets/images/welcome2.png'
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthState from '../../src/State/AuthState'

  type props={
user:any
  }
  
  const WelcomeScreen: FunctionComponent<props> = (user) =>{

    

    useEffect(() => {
        SplashScreen.hide();
      });


      return(
          <View style={styles.parent}>
              <Icon name={"close"} size={40} style={styles.icon} onPress={()=>{console.log("pressed")}}/>
                <View style={styles.welcomeView}>
                    <Text style={styles.text}>{`Welcome ${user.first_name} ${user.last_name}`}</Text>
                </View>
                <View style={styles.imageView}>
                <Image source={welcome} resizeMode="contain" />
                </View>
          </View>
      )
  }

  const styles = StyleSheet.create({
    parent:{flex:1,width:'100%',paddingVertical:theme.SIZES.small/2,backgroundColor:theme.COLORS.WHITE},
    icon:{marginLeft:'auto',marginRight:theme.SIZES.normal},
    welcomeView:{width:'100%',alignItems:'center',justifyContent:'center',paddingTop:theme.SIZES.large},
    text:{fontSize:theme.SIZES.large*1.5,color:theme.COLORS.BORDER_COLOR,fontWeight:'bold'},
    imageView:{alignItems:'center',paddingHorizontal:theme.SIZES.small,paddingTop:theme.SIZES.large*8}
  })

  export default WelcomeScreen;