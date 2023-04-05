import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackGround from '../../component/backgroundImage'

import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import DrawerBottom from '../../component/bottom'
import Home from '../Home/home'
import Category from '../category/category'
import DrawerHeader from '../../component/header/header'
import Orders from '../orders/orders'
import { useEffect } from 'react'
import { CUSTOMER_PROFILE_SET, Product_Count_SET } from '../../../stateManage/userDetails/actions'
import { useDispatch, useSelector } from 'react-redux'


const DashBoard = ({ route, navigation }) => {
    const routedata = route.params
    let { loginData } = useSelector(state => state.loginReducer);
 

 
    const dispatch = useDispatch()

    useEffect(() => {
        if (routedata != undefined && routedata.Screen != undefined) {
            setintialBottom(routedata.Screen)
        }
    }, [routedata])

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


    useEffect(() => {
        dispatch(CUSTOMER_PROFILE_SET({ "customer_unique_id": " "},"customerProfile",loginData.data.token))
   
   
    }, [])



    

    useEffect(() => {
     
       dispatch(Product_Count_SET({"total_Product_count": ""}))
        
   
    }, [])

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