import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import { Order_Products, PlaceOrderHorizontalCard, SmallCardList } from './homeHelper'
import { IMAGES } from '../../globalImage'
import { useTranslation } from "react-i18next";
import { globalStyles } from '../../helper/globalStyle'
import { useNavigation } from '@react-navigation/native'


const Home = () => {
    const navigation = useNavigation();

    const { t, i18n } = useTranslation();
        const sendWhatsApp = ( ) => {
    
            let url =
            'whatsapp://send?text=' + 
             "whatsAppMsg" +
            '&phone=91' + 123456789;
            
          Linking.openURL(url)
            .then((data) => {
              console.log('WhatsApp Opened');
            })
            .catch(() => {
              alert('Make sure Whatsapp installed on your device');
            });
        }
    


    return (

        <>
            <Text style={globalStyles.appTitle}>Welcome Customer</Text>

            <PlaceOrderHorizontalCard />
            <Order_Products />

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity onPress ={() => sendWhatsApp()}>
                    <SmallCardList imageSource={IMAGES.Whatsapp} title={"Whatsapp"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.push('LastOrder')}}>
                <SmallCardList imageSource={IMAGES.backInTime} title={"Last Order"} />
                </TouchableOpacity>
  
             
                <TouchableOpacity onPress={() => { navigation.push('MostOrder')}}>

                <SmallCardList imageSource={IMAGES.Most_orderdered} title={"Most Ordered"} />
                </TouchableOpacity>
            </View>





        </>



    )
}

export default Home

const styles = StyleSheet.create({})