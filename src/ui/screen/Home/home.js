import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import { Order_Products, PlaceOrderHorizontalCard, SmallCardList } from './homeHelper'
import { IMAGES } from '../../globalImage'
import {useTranslation} from "react-i18next";
import { globalStyles } from '../../helper/globalStyle'


const Home = () => {
    const [intialBottom, setintialBottom] = useState('home');

    const handleCallback = (params) => {

        setintialBottom(params)
    }
    const {t, i18n} = useTranslation();

    return (
  
           <>
            <Text style={globalStyles.appTitle}>Welcome Customer</Text>
      {/* <Text style={{ color: "white", fontSize: normalize(25), fontWeight: '700', marginTop: 20 }}>Welcome Customer</Text> */}
      {/* <Text>{t('hello')}</Text>
      <Text>{t('agb.before_continue')}</Text> */}
                <PlaceOrderHorizontalCard />
                <Order_Products/>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10,  }}>
                <SmallCardList imageSource={IMAGES.Whatsapp} title={"Whatsapp"} />
                <SmallCardList imageSource={IMAGES.backInTime} title={" Last Order "} />
                <SmallCardList imageSource={IMAGES.Most_orderdered} title={" Most Ordered "} />
              
            </View>
      

            </>

 

    )
}

export default Home

const styles = StyleSheet.create({})