import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackGround from '../../component/backgroundImage'

import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import DrawerBottom from '../../component/bottom'
import Home from '../Home/home'
import Category from '../category/category'
import DrawerHeader from '../../component/header/header'
import Orders from '../orders/orders'


const DashBoard = ({ navigation }) => {
    const [intialBottom, setintialBottom] = useState('home');

    const handleCallback = (params) => {
        setintialBottom(params)
        if (params == 'Cart') {
            navigation.push('Cart')
        }
    }



    const CategoryCallback = (id, data) => {

        navigation.push('SingleCategory', { id, data })

    }
  
    return (
        <BackGround>
            <DrawerHeader />
            <ScrollView style={{ marginHorizontal: 2 }}>
                {intialBottom == "category" ?

                    <Category singleCategory={CategoryCallback} /> :
                    intialBottom == 'Orders' ? <Orders /> : <Home />



                }

            </ScrollView>
            <View style={[globalPaddingHorizontal, { position: "absolute", bottom: 30, width: wW }]}>
                <DrawerBottom parentCallback={handleCallback} />
            </View>
        </BackGround>

    )
}

export default DashBoard

const styles = StyleSheet.create({})