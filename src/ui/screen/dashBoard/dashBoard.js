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
import { ADDRESS_SET, CONTACT_SET, CUSTOMER_PROFILE_SET, Product_Count_SET } from '../../../stateManage/userDetails/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Category_SET } from '../../../stateManage/category/actions'


const DashBoard = ({ route, navigation }) => {
    const routedata = route.params
    const { loginData } = useSelector(state => state.loginReducer);
    const { USER_DATA } = useSelector(state => state.userdatareducer);

    const { contact_Data } = useSelector(state => state.userDetailsReducer);


    const dispatch = useDispatch()

    useEffect(() => {
        if (routedata != undefined && routedata.Screen != undefined) {
            setintialBottom(routedata.Screen)
        }
    }, [routedata])
    
    useEffect(() => {
        // dispatch(CONTACT_SET({ customer_unique_id: USER_DATA.customer_unique_id }, "mgetParticularCustomerContactDetails", loginData.data.token))
        // dispatch(Category_SET("mgetCategoryDetails", loginData.data.token))

    })



//     useEffect(() => {

//     }, [])




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
    dispatch(ADDRESS_SET({ customer_unique_id: loginData.data.customer_shipping_address_alias_id.id }, "mgetParticularCustomershippingAddressDetails", loginData.data.token))

        dispatch(CONTACT_SET({customer_unique_id:loginData.data.customer_shipping_address_alias_id.id},"mgetParticularCustomerContactDetails", loginData.data.token))

        dispatch(CUSTOMER_PROFILE_SET({ "customer_unique_id": " " }, "customerProfile", loginData.data.token))

    }, [])





    useEffect(() => {
        dispatch(Product_Count_SET({ "total_Product_count": "" }))
    }, [])








  




    return (
        <BackGround>
            <DrawerHeader />

            <ScrollView style={{ marginHorizontal: 2,marginBottom:100 }}>
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