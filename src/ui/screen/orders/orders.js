import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CartBox, Dateformat, Divider, TimeFormat, globalStyles } from '../../helper/globalStyle'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Order_SET } from '../../../stateManage/order/actions'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import LoadingModal from '../../component/loading';
import moment from 'moment';
import NoDataFound from '../../errorHandle/noDataFound';
import Entypo from 'react-native-vector-icons/Entypo';
import { normalize } from '../../helper/size';

const Orders = ({ }) => {
    const navigation = useNavigation();

    const { Order_Data } = useSelector(state => state.orderReducer);
    const [loading, setloading] = useState(false);
    const { loginData } = useSelector(state => state.loginReducer);
    const { USER_DATA } = useSelector(state => state.userdatareducer);
    const [orderData, setorderData] = useState([]);

    const [Purchase_Order, setPurchase_Order] = useState([]);
    const [Current_Orders, setCurrent_Orders] = useState([]);
    const [Previous_Orders, setPrevious_Orders] = useState([]);






    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {

        const Data = Order_Data.Data

        const newPurchase = Data.filter(function (item) {
            return item.status_name == "Incoming";
        }).map(function (item) {
      
            return { ...item, bgColor: "#FFC40C", TextColor:"#FFFFE0"   };
        });
        setPurchase_Order([...newPurchase]);
    
    
        const newCurrent = Data.filter(function (item) {
            return item.status_name == "On-Transit" || item.status_name == "Dispatch";
        }).map(function (item) {
    
            return { ...item, bgColor:  "#007F66", TextColor: "#D2F8D2" };
        });
        setCurrent_Orders([...newCurrent]);
    
    
        const newPrevious = Data.filter(function (item) {
            return item.status_name == "Cancelled";
        }).map(function (item) {
    
            return { ...item, bgColor: "#65000B", TextColor: "#FFD8D8" };
        });
        setPrevious_Orders([...newPrevious]);
    

    }, [Order_Data])



    const getData = () => {
        setloading(true)
        setorderData([])
        setPurchase_Order([]);
        setCurrent_Orders([])
        let formData = new FormData();
        formData.append('customer_id', loginData.data.customer_shipping_address_alias_id.id);
        formData.append('sorting', JSON.stringify({ "id": "desc" }));
        dispatch(Order_SET(formData,"mpreviousOrderDetailsByCustomerId",loginData.data.token))
        setloading(false)
    }



    const renderData = ({ item }) => {
        const ProductData = item.order_details

        return (
            <TouchableOpacity onPress={() => { navigation.push('OrderDetails', { id: item.id }) }}>
                <CartBox>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
                        <Text style={globalStyles.order_heading1}>Order :  {item.bill_no}</Text>
                        <View style={{ backgroundColor: item.bgColor, padding: 1, padding: 5, borderRadius: 5,
                                shadowColor: "#000",
                         
                                shadowOffset: {
                                    width: 0,
                                    height: 7,
                                },
                                shadowOpacity: 0.43,
                                shadowRadius: 9.51,
                    
                                elevation: 15,
                        }}>
                            <Text style={[globalStyles.order_title, { color: item.TextColor, }]}> • {item.status_name}</Text>
                        </View>
                    </View>
                    <Text numberOfLines={1} style={[globalStyles.order_title, { width: "80%" }]}>
                        {ProductData && ProductData.length > 0 &&
                            ProductData.map((i, index) => (
                                <Text>{i.product_name} </Text>
                            ))}
                    </Text>
                    <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <TimeFormat title={item.created_at} style={globalStyles.order_title2}/>
                        <Entypo name="chevron-right" size={normalize(20)} color="black" />

                  
                    </View>


                </CartBox>
                <Text></Text>
            </TouchableOpacity>
        )
    }



    const onRefresh = async () => {

        // getData()

    };


    try {
        return (
            <>
                <LoadingModal loading={Order_Data.loading} setloading={setloading} />





                <Text style={[globalStyles.appTitle, { marginBottom: 20 }]}>Purchase Order</Text>


                <FlatList
                    data={Purchase_Order}
                    onRefresh={onRefresh}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => renderData(item)}
                />

                <Text style={[globalStyles.appTitle, { marginBottom: 20 }]}>Current Orders</Text>

                <FlatList
                    data={Current_Orders}
                    onRefresh={onRefresh}
                    showsVerticalScrollIndicator={false}
                    refreshing={false}
                    renderItem={(item) => renderData(item)}
                />


                <Text style={[globalStyles.appTitle, { marginBottom: 20 }]}>Previous Orders</Text>

                <FlatList
                    data={Previous_Orders}
                    onRefresh={onRefresh}
                    refreshing={false}
                    renderItem={(item) => renderData(item)}
                />

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