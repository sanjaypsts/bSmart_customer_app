import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { CartBox, Dateformat, globalStyles } from '../../helper/globalStyle'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { normalize } from '../../helper/size'
import { IMAGES } from '../../globalImage'
import moment from 'moment'
import { COLORS } from '../../helper/color'

const OrderDetails = ({ route, navigation }) => {
    const { Order_Data } = useSelector(state => state.orderReducer);
    const [orderDetailsData, setorderDetailsData] = useState([]);
    const [orderDetailsProduct, setorderDetailsProduct] = useState([]);
    const [orderTracker, setorderTracker] = useState([

        {
            id: 1,
            status: true,
            line: true,
            status_name: "Order placed",
            date: "13-11-2022 at 4:50PM",

        },

        {
            id: 2,
            status: false,
            line: true,
            status_name: "Order Accepted",
            date: "13-11-2022 at 4:50PM",

        },

        {
            id: 3,
            status: false,
            line: true,
            status_name: "In-Transit",
            date: "13-11-2022 at 4:50PM",

        },
        {
            id: 4,
            status: false,
            line: false,
            status_name: "Delivered",
            date: "13-11-2022 at 4:50PM",

        }



    ]);


    const routedata = route.params


    useEffect(() => {


        if (routedata != undefined && routedata.id != undefined) {
            const data = Order_Data.Data.find(el => el.id === routedata.id);
            setorderDetailsData(data)
            setorderDetailsProduct(data.order_details)
            setorderTracker(data.order_status_details)
       
        }

    }, [])

    const onChange = () => {
        navigation.goBack(null)
    };


    try {
        return (
            <BackGround>
                <BackBottonHeader updateSingleCategory={(text) => { onChange() }} />
                <Text style={globalStyles.appTitle}>{"Order Info"}</Text>


                <ScrollView>



                    <View style={{ marginVertical: 20 }}>
                        <CartBox>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <View>
                                    <Text style={globalStyles.order_heading1}>Order :{orderDetailsData.id}</Text>
                                    <Text style={globalStyles.order_title2}>{moment(orderDetailsData.created_at).format(Dateformat)}</Text>
                                </View>
                                <Text style={[globalStyles.order_title]}>{orderDetailsData.status_name}</Text>
                            </View>
                        </CartBox>
                    </View>



                    <View style={{ marginBottom: 20 }}>
                        <CartBox>

                            {
                                orderTracker && orderTracker.length > 0 &&
                                orderTracker.map((item, index) => (
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ marginRight: 20, height: 90, alignItems: "stretch", }}>
                                            <View style={{ width: 25, height: 25, backgroundColor: item.status == "true"  && item.status == true ? "#71D67A" : "grey", borderRadius: 20, }}><Text></Text></View>
                                            {orderTracker.length != index + 1 && <View style={{ backgroundColor: item.status == "true"  && item.status == true ? "#71D67A" : "grey", width: 2, height: "90%", alignSelf: "center" }}></View>}
                                        </View>
                                        <View style={{ width: "80%" }} >
                                            <Text style={globalStyles.order_heading1}>{item.status_name}</Text>
                                            {item.status && <Text style={globalStyles.order_title2}>{item.date}</Text>}
                                            {orderTracker.length != index + 1 &&  <View style={{ height: 1.5, backgroundColor: "#8E8E8E", width: "100%", marginTop: 10 }}></View>}
                                        </View>
                                    </View>
                                ))
                            }
                        </CartBox>
                    </View>



                    <View >
                        <CartBox>
                            <Text style={[globalStyles.order_title2, { fontSize: normalize(14), marginBottom: 5 }]}>Ordered items</Text>
                            {orderDetailsProduct && orderDetailsProduct.length > 0 &&
                                orderDetailsProduct.map((i, index) => (
                                    <>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <View style={{ width: "80%" }}>
                                                <Text numberOfLines={1} style={[globalStyles.order_heading1]}>{i.product_name} </Text>
                                                <Text style={globalStyles.order_title}>{i.unit_name}</Text>
                                                <Text style={globalStyles.order_title2}>Quantity: {i.quantity}</Text>
                                            </View>
                                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            {  Order_Data.showPrice == 1 && <Text numberOfLines={1} style={[globalStyles.order_heading1]}> S$ {i.per_unit_itemcost.toFixed(2)} </Text>}
                                            </View>
                                        </View>

                                        {orderDetailsProduct.length != index + 1 &&

                                        <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>
                                        }

                                    </>
                                ))}
                        </CartBox>
                    </View>


                    <View style={{ width: "100%", marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "45%" }}>

                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                    <Image source={IMAGES.personalcard} style={{ width: 20, height: 20, borderRadius: 10,tintColor:"black" }} />
                                    <Text style={[globalStyles.cart_title, {}]}> {"Contact details"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{"Customer 4"}</Text>

                                    <Text style={{ color:COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>+65 {orderDetailsData.mobile_number}</Text>
                                </View>
                            </CartBox>
                        </View>

                        <View style={{ width: "48%" }}>

                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                    <Text style={[globalStyles.cart_title, {}]}> {"Shipping Address"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{orderDetailsData.shipping_block_number} {orderDetailsData.shipping_street_drive_number}</Text>

                                    <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{"unit number"} {orderDetailsData.shipping_unit_number}</Text>
                                    <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{orderDetailsData.shipping_postal_code}</Text>

                                </View>
                            </CartBox>
                        </View>

                    </View>




                    {  Order_Data.showPrice == 1 &&
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>

                        <View style={{ width: "45%" }}>
                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                    {/* <Image source={IMAGES.personalcard} style={{ width: 20, height: 20, borderRadius: 10,tintColor:"black" }} /> */}
                                    <Text style={[globalStyles.cart_title, {}]}> {"Payment Mode"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{color:"black", fontWeight: "500", fontSize: normalize(16), }}>{"Cash"}</Text>


                                </View>
                            </CartBox>



                        </View>
                        <View style={{ width: "45%" }}>
                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                    <Text style={[globalStyles.cart_title, {}]}> {"Bill Total"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color:"black", fontWeight: "500", fontSize: normalize(16), }}>S$ {orderDetailsData.sub_total.toFixed(2)}</Text>

                                </View>
                            </CartBox>
                        </View>
                    </View>
    }

                    <View style={{marginBottom:50}}></View>

                </ScrollView>



            </BackGround>
        )
    } catch {

    }
}

export default OrderDetails

const styles = StyleSheet.create({})