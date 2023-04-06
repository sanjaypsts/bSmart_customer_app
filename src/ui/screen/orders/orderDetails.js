import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { CartBox, globalStyles } from '../../helper/globalStyle'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { normalize } from '../../helper/size'
import { IMAGES } from '../../globalImage'

const OrderDetails = ({ route, navigation }) => {
    const { Order_Data } = useSelector(state => state.orderReducer);
    const [orderDetailsData, setorderDetailsData] = useState([]);
    const [orderDetailsProduct, setorderDetailsProduct] = useState([]);


    const routedata = route.params
    console.log("route", routedata)


    useEffect(() => {
        console.log(routedata.id)

        if (routedata != undefined && routedata.id != undefined) {
            const data = Order_Data.find(el => el.id === routedata.id);
            setorderDetailsData(data)
            setorderDetailsProduct(data.order_details)
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
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={globalStyles.order_heading1}>Order :  </Text>
                                <Text style={[globalStyles.order_title, {/* color:"#FFA500" */ }]}> Processing </Text>


                            </View>

                            <Text style={globalStyles.order_title2}>06 Dec 2022 at 10:40AM</Text>
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
                                                <Text numberOfLines={1} style={[globalStyles.order_heading1]}>S$ {i.per_unit_itemcost.toFixed(2)} </Text>
                                            </View>
                                        </View>
                                        <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>

                                    </>
                                ))}
                        </CartBox>
                    </View>


                    <View style={{ width: "100%", marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "45%" }}>

                        <CartBox>
                            <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                <Image source={IMAGES.personalcard} style={{ width: 20, height: 20, borderRadius: 10 }} />
                                <Text style={[globalStyles.cart_title, {}]}> {"Contact details"}</Text>
                            </View>
                            <View style={{ justifyContent: "center", }}>
                                <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Customer 4"}</Text>

                                <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>+65 {orderDetailsData.mobile_number}</Text>
                            </View>
                        </CartBox>
                        </View>

                        <View style={{ width: "48%" }}>

                        <CartBox>
                            <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                <Text style={[globalStyles.cart_title, {}]}> {"Shipping Address"}</Text>
                            </View>
                            <View style={{ justifyContent: "center", }}>
                                <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"33rd block, "}</Text>

                                <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"unit number 6,"}</Text>
                                <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Singapore - 123456"}</Text>

                            </View>
                        </CartBox>
                        </View>

                    </View>





                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>

                        <View style={{ width: "45%" }}>
                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                    <Image source={IMAGES.personalcard} style={{ width: 20, height: 20, borderRadius: 10 }} />
                                    <Text style={[globalStyles.cart_title, {}]}> {"Payment Mode"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Cash"}</Text>


                                </View>
                            </CartBox>



                        </View>
                        <View style={{ width: "45%" }}>
                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                    <Text style={[globalStyles.cart_title, {}]}> {"Bill Total"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>S$ {orderDetailsData.sub_total.toFixed(2)}</Text>

                                </View>
                            </CartBox>
                        </View>
                    </View>

                </ScrollView>



            </BackGround>
        )
    } catch {

    }
}

export default OrderDetails

const styles = StyleSheet.create({})