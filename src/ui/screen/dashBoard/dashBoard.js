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
import { PermissionsAndroid } from 'react-native';
import { check, request } from 'react-native-permissions';

const DashBoard = ({ route, navigation }) => {
    const routedata = route.params
    const { loginData } = useSelector(state => state.loginReducer);
  


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Category_SET("mgetCategoryDetails",loginData.data.token))
        if (routedata != undefined && routedata.Screen != undefined) {
            setintialBottom(routedata.Screen)
        }
    }, [routedata])



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







  
    useEffect(() => {
        requestAudioPermission();
      }, []);
    
      const requestAudioPermission = async () => {
        try {
    
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
            ]);
      
            if (
              granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
              granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
              // Permission granted, you can now access media files.
            } else {
              // Permission denied, handle the scenario accordingly.
            }
          } else if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      
            if (result === 'granted') {
              // Permission granted, you can now access media files.
            } else {
              // Permission denied, handle the scenario accordingly.
            }
          }
    

        } catch (error) {
          console.log('Error requesting audio permission:', error);
        }
      };

  




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