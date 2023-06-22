import { BackHandler, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { normalize, wH, wW } from '../../helper/size';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';

const Orders = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { Order_Data } = useSelector(state => state.orderReducer);
    const [loading, setloading] = useState(false);
    const { loginData } = useSelector(state => state.loginReducer);
    const { USER_DATA } = useSelector(state => state.userdatareducer);
    const [PurchaseShowAll, setPurchaseShowAll] = useState(false)
    const [Purchase_Order, setPurchase_Order] = useState([
    ]);

    useEffect(() => {
        getData()
    }, [])

    // const getData = () => {
    //     let formData = new FormData();
    //     formData.append('customer_id', loginData.data.customer_shipping_address_alias_id.id);
    //     formData.append('sorting', JSON.stringify({ "id": "desc" }));
    //     dispatch(Order_SET(formData,"previousOrderDetailsDividedByCustomerId",loginData.data.token))
    // }


    const getData = () => {

        setloading(true)

        let formData = new FormData();
        formData.append('customer_id', loginData.data.customer_shipping_address_alias_id.id);
        formData.append('sorting', JSON.stringify({ "id": "desc" }));
        apicallHeaderPost(formData, 'previousOrderDetailsDividedByCustomerId', loginData.data.token)
            .then(response => {
                setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    const data = response?.data?.data?.data_list


                    const PurchaseDATA = response?.data?.data?.data_list?.current_order
                    const newPurchase = PurchaseDATA.map(item => {
                        return {
                            ...item, bgColor: "#FFC40C", TextColor: "#FFFFE0"
                        };
                    });

                    const previousData = response?.data?.data?.data_list?.previous_order
                    const newprevious = previousData.map(item => {
                        return {
                            ...item, bgColor: "#65000B", TextColor: "#FFD8D8"
                        };
                    });

                    setPurchase_Order(newPurchase)
                    setPrevious_Orders(newprevious)

                } else {
                }
            }).catch(err => {
                setloading(false)
                if (err) {

                }
            })
    }





    const [PreviousShowAll, setPreviousShowAll] = useState(false)

    const [Previous_Orders, setPrevious_Orders] = useState([]);
    try {
        const onRefresh = async () => {

            getData()

        };




        const renderData = ({ item }) => {


            return (
                <TouchableOpacity onPress={() => { navigation.push('OrderDetails', { id: item.id }) }} style={{ marginBottom: 10 }}>


                    <CartBox>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={globalStyles.order_heading1}>Order :  #{item.bill_no}</Text>
                            <View style={{
                                backgroundColor: item.bgColor, padding: 1, padding: 5, borderRadius: 5,
                                shadowColor: "#000",

                                shadowOffset: {
                                    width: 0,
                                    height: 7,
                                },
                                shadowOpacity: 0.43,
                                shadowRadius: 9.51,

                                elevation: 15,
                            }}>
                                <Text style={[globalStyles.order_title, { color: item.TextColor, }]}> • {item.display_name}</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TimeFormat title={item.created_at} style={globalStyles.order_title2} />
                            <Entypo name="chevron-right" size={normalize(20)} color="black" />


                        </View>
                    </CartBox>
                </TouchableOpacity>
            )
        }




        return (
            <View >
                <LoadingModal loading={loading} />
                <ScrollView scrollEnabled={PreviousShowAll || PurchaseShowAll}>

                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: "row", marginVertical: 10 }}>
                        <Text style={[globalStyles.appTitle]}>Current Orders</Text>
                        <TouchableOpacity onPress={() => { setPurchaseShowAll(!PurchaseShowAll) }}><Text style={[globalStyles.appTitle]}>{PurchaseShowAll ? "Hide" : "Show more"}</Text></TouchableOpacity>
                    </View>



                    <View style={{ height: PurchaseShowAll ? "auto" : wH / 2.5, }}>



                        {Purchase_Order.length > 0 ?

                            <FlatList
                                style={{ height: "100%" }}
                                data={Purchase_Order}
                                onRefresh={onRefresh}
                                refreshing={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={(item) => renderData(item)}
                            />
                            :
                            <>
                            {!loading &&
                                <NoDataFound />

                            }
                            </>
                     
                        }



                    </View>




                    {/* closed order */}


                    <View style={{ height: PreviousShowAll ? "auto" : wH / 2.5, }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: "row", marginVertical: 10 }}>
                            <Text style={[globalStyles.appTitle]}>Previous Orders</Text>
                            <TouchableOpacity onPress={() => { setPreviousShowAll(!PreviousShowAll) }}><Text style={[globalStyles.appTitle]}>{PreviousShowAll ? "Hide" : "Show more"}</Text></TouchableOpacity>
                        </View>

                        {Previous_Orders.length > 0 ?


                            <FlatList
                                style={{ height: "100%" }}
                                data={Previous_Orders}
                                onRefresh={onRefresh}
                                refreshing={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={(item) => renderData(item)}
                            />
                            :

                            <>
                            {!loading &&
                                <NoDataFound />

                            }
                            </>
                        }




                    </View>

                </ScrollView>

            </View>
        )

    } catch (error) {

    }
}

export default Orders

const styles = StyleSheet.create({})