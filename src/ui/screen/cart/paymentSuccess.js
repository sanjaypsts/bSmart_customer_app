import { BackHandler, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../helper/globalStyle'
import { IMAGES } from '../../globalImage'
import { normalize } from '../../helper/size'
import { useEffect } from 'react'
import BackGround from '../../component/backgroundImage'

const PaymentSuccess = ({navigation}) => {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
      }, []);
      function handleBackButtonClick() {
        navigation.push('DashBoard')
        return true;
      }


  return (
    <BackGround>
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <Image resizeMode="contain" source={IMAGES.Success} style={{ width: normalize(120), height:normalize(120),marginBottom:20 }} />
      <Text style={globalStyles.appTitle}>Order placed</Text>
    </View>
    </BackGround>

  )
}

export default PaymentSuccess

const styles = StyleSheet.create({})