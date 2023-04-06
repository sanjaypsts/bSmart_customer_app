import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CartBox, Dateformat, Divider, globalStyles } from '../../helper/globalStyle'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Order_SET } from '../../../stateManage/order/actions'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import LoadingModal from '../../component/loading';
import moment from 'moment';


const Orders = ({ }) => {
    const navigation = useNavigation();

    const { Order_Data } = useSelector(state => state.orderReducer);
    const [loading, setloading] = useState(false);
    const [orderData, setorderData] = useState([]);
    const { loginData } = useSelector(state => state.loginReducer);
    const { USER_DATA } = useSelector(state => state.userdatareducer);

    const dispatch = useDispatch()

    console.log(Order_Data)




    // useFocusEffect(
    //     React.useCallback(() => {
    //         getData()
    //     })
    //   );




    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        setorderData(Order_Data)
    }, [Order_Data])

    const getData = () => {
        setloading(true)
        setorderData([])
        // USER_DATA.customer_unique_id

        let formData = new FormData();
        formData.append('customer_id', USER_DATA.customer_unique_id);

        formData.append('sorting', JSON.stringify({ "id": "desc" }));
        dispatch(Order_SET(formData, "mpreviousOrderDetailsByCustomerId", loginData.data.token))
        setloading(false)
    }

    try {
        return (
            <>
                <LoadingModal loading={Order_Data.loading} setloading={setloading} />

                {/* <Text style={[globalStyles.appTitle, { marginBottom: 20 }]}>Purchase Order</Text> */}
                {orderData && orderData.length > 0 &&
                    orderData.map((i, index) => (

                        <TouchableOpacity onPress={() => { navigation.push('OrderDetails', { id: i.id }) }}>
                            <CartBox>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
                                    <Text style={globalStyles.order_heading1}>Order :  {i.bill_no}</Text>
                                    <Text style={[globalStyles.order_title, {/* color:"#FFA500" */ }]}>{/* Processing */}{i.status_name}</Text>
                                </View>
                                <Text style={globalStyles.order_title}>Carrot 10KG, Beetroot 1 BAG 10KG + 2</Text>
                                <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>
                                <Text style={globalStyles.order_title2}>{/* 06 Dec 2022 at 10:40AM */}{moment(i.created_at).format(Dateformat)}</Text>
                            </CartBox>
                            <Text></Text>


                        </TouchableOpacity>
                    ))}
                <View style={{ marginBottom: 100 }}>

                </View>
            </>
        )
    }
    catch {

    }
}

export default Orders

const styles = StyleSheet.create({})