import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { CartBox, Dateformat, TimeFormat, globalStyles } from '../../helper/globalStyle'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { normalize } from '../../helper/size'
import { IMAGES } from '../../globalImage'
import moment from 'moment'
import { COLORS } from '../../helper/color'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioPlay from '../../helper/audioPlay'
import { UPLOAD_IMAGE_PATH } from '../../../../config'
import MAPScreen from './map'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'

const OrderDetails = ({ route, navigation }) => {
    const routedata = route?.params?.id
    const { Order_Data } = useSelector(state => state.orderReducer);
    const { loginData } = useSelector(state => state.loginReducer);

    const [loading, setloading] = useState(false);
    const [ORDERDETAILS, setORDERDETAILS] = useState([]);
    const [Orderstatus, setOrderstatus] = useState([]);
    const [OrderProduct, setOrderProduct] = useState([]);


    const onChange = () => {
        navigation.goBack(null)
    };

    useEffect(() => {

        {
            routedata &&
            getData(routedata)
        }

    }, [])
    const getData = (VAlue) => {
        setloading(true)
        apicallHeaderPost({ id: VAlue }, 'mcustomerGetOrderDetailsUsingId', loginData.data.token)
            .then(response => {
                setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
             
                    const data = response.data.data
               
                    setORDERDETAILS(data)
                    setOrderstatus(data[0]?.order_status_details)
                    setOrderProduct(data[0]?.order_details)
                } else {
                }
            }).catch(err => {
                setloading(false)
                if (err) {

                }
            })
    }



    // const ORDERDETAILS = [
    //     {
    //         "id": 4,
    //         "bill_no": 4,
    //         "customer_id": 1,
    //         "customer_shipping_addresses_alias_id": 1,
    //         "sub_total": 4.62999999999999989341858963598497211933135986328125,
    //         "discount": 0,
    //         "tax": 0,
    //         "order_total": 5,
    //         "profit": 1,
    //         "status": 1,
    //         "created_by": 1,
    //         "modified_by": 1,
    //         "deleted_by": null,
    //         "deleted_at": null,
    //         "created_at": "2023-04-03 12:49:53",
    //         "updated_at": "2023-05-12 07:40:45",
    //         "voice_file_original_name": null,
    //         "voice_file_new_name": null,
    //         "voice_file_url": null,
    //         "voice_file_size": null,
    //         "voice_file_mime_type": null,
    //         "payment_mode_id": 1,
    //         "payment_date": "2001-01-01 00:00:00",
    //         "mobile_number": "12345678",
    //         "price_level_id": 0,
    //         "order_list_count": 1,
    //         "order_status": 4,
    //         "order_notes": "1233",
    //         "ordered_via": "System",
    //         "trip_id": 1,
    //         "shipping_block_number": "",
    //         "shipping_street_drive_number": "",
    //         "shipping_unit_number": "",
    //         "shipping_postal_code": 0,
    //         "created_by_name": "WMS",
    //         "modified_by_name": "WMS",
    //         "customer_name": "cuswms",
    //         "customer_code": "Cust0001",
    //         "customer_type_id": 1,
    //         "customer_type": "individual",
    //         "payment_mode": "Credit",
    //         "order_status_name": "Delivered",
    //         "trip_name": "Trip A",
    //         "alias_name": "cuswms",
    //         "driver_name": "sathishkumarkum",
    //         "driver_id": 1,
    //         "order_details": [
    //             {
    //                 "id": 4,
    //                 "order_detail_unique_id": 4,
    //                 "product_id": 6,
    //                 "order_status": 1,
    //                 "status": 1,
    //                 "tax_id": 2,
    //                 "tax_percentage": 8,
    //                 "quantity": 1,
    //                 "foc": 0,
    //                 "batch_id": "4",
    //                 "unit_id": "8",
    //                 "unit_name": "CTN",
    //                 "no_of_units": 1,
    //                 "foc_unit_id": 6,
    //                 "foc_unit_name": "",
    //                 "foc_no_of_units": 0,
    //                 "mrp_price": 0,
    //                 "per_unit_price": 5,
    //                 "per_unit_purchaseprice": 14.3499999999999996447286321199499070644378662109375,
    //                 "per_unit_itemcost": 0,
    //                 "unit_price": 5,
    //                 "total_amount": 5,
    //                 "gross_amount": 4.62999999999999989341858963598497211933135986328125,
    //                 "tax_amount": 0.36999999999999999555910790149937383830547332763671875,
    //                 "discount_percent": 0,
    //                 "discount_amount": 0,
    //                 "barcode": "78895645",
    //                 "product_name": "BRITANNIA MILK BIKIS 100GM 60X100GM",
    //                 "product_code": "BRI004"
    //             }
    //         ],
    //         "order_status_details": [
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "Incoming",
    //                 "date": ""
    //             },
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "Packing",
    //                 "date": ""
    //             },
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "On-Transit",
    //                 "date": ""
    //             },
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "Delivered",
    //                 "date": ""
    //             },
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "Cancelled",
    //                 "date": ""
    //             },
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "Return",
    //                 "date": ""
    //             },
    //             {
    //                 "status": "false",
    //                 "line": "false",
    //                 "status_name": "Loaded",
    //                 "date": ""
    //             }
    //         ]
    //     }
    // ]

    // const Orderstatus = [
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "Incoming",
    //         "date": ""
    //     },
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "Packing",
    //         "date": ""
    //     },
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "On-Transit",
    //         "date": ""
    //     },
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "Delivered",
    //         "date": ""
    //     },
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "Cancelled",
    //         "date": ""
    //     },
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "Return",
    //         "date": ""
    //     },
    //     {
    //         "status": "false",
    //         "line": "false",
    //         "status_name": "Loaded",
    //         "date": ""
    //     }

    // ]

    // const OrderProduct = [
    //     {
    //         "id": 4,
    //         "order_detail_unique_id": 4,
    //         "product_id": 6,
    //         "order_status": 1,
    //         "status": 1,
    //         "tax_id": 2,
    //         "tax_percentage": 8,
    //         "quantity": 1,
    //         "foc": 0,
    //         "batch_id": "4",
    //         "unit_id": "8",
    //         "unit_name": "CTN",
    //         "no_of_units": 1,
    //         "foc_unit_id": 6,
    //         "foc_unit_name": "",
    //         "foc_no_of_units": 0,
    //         "mrp_price": 0,
    //         "per_unit_price": 5,
    //         "per_unit_purchaseprice": 14.3499999999999996447286321199499070644378662109375,
    //         "per_unit_itemcost": 0,
    //         "unit_price": 5,
    //         "total_amount": 5,
    //         "gross_amount": 4.62999999999999989341858963598497211933135986328125,
    //         "tax_amount": 0.36999999999999999555910790149937383830547332763671875,
    //         "discount_percent": 0,
    //         "discount_amount": 0,
    //         "barcode": "78895645",
    //         "product_name": "BRITANNIA MILK BIKIS 100GM 60X100GM",
    //         "product_code": "BRI004"
    //     }
    // ]
    console.log(routedata)
    return (
        <BackGround>
            <BackBottonHeader updateSingleCategory={(text) => { onChange() }} />
            <Text style={globalStyles.appTitle}>{"Order Info"}</Text>

            <View style={{ marginVertical: 20 }}>
                <CartBox>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <View>
                            <Text style={globalStyles.order_heading1}>Order : #{ORDERDETAILS[0]?.bill_no}</Text>
                            <TimeFormat title={ORDERDETAILS[0]?.created_at} style={globalStyles.order_title2} />


                        </View>
                        <Text style={[globalStyles.order_title]}>{ORDERDETAILS[0]?.order_status_name}</Text>
                    </View>
                </CartBox>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>




                <View style={{ marginBottom: 20 }}>
                    <CartBox>

                        {
                            Orderstatus && Orderstatus.length > 0 &&
                            Orderstatus.map((item, index) => (
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ marginRight: 20, height: 90, alignItems: "stretch", }}>
                                        <View style={{ width: 25, height: 25, backgroundColor: item.status == "true" || item.status == true ? "#71D67A" : "grey", borderRadius: 20, justifyContent: "center", alignItems: "center" }}><Ionicons name="md-checkmark-sharp" size={normalize(15)} color={'grey'} /></View>
                                        {Orderstatus.length != index + 1 && <View style={{ backgroundColor: item.status == "true" || item.status == true ? "#71D67A" : "grey", width: 2, height: "90%", alignSelf: "center" }}></View>}
                                    </View>
                                    <View style={{ width: "80%" }} >
                                        <Text style={globalStyles.order_heading1}>{item.status_name}</Text>
                                        {item.status && <Text style={globalStyles.order_title2}>{item.date}</Text>}
                                        {Orderstatus.length != index + 1 && <View style={{ height: 1.5, backgroundColor: "#8E8E8E", width: "100%", marginTop: 10 }}></View>}
                                    </View>
                                </View>
                            ))
                        }
                    </CartBox>
                </View>

                {/* 
                {ORDERDETAILS && ORDERDETAILS.length > 0 &&
                    ORDERDETAILS.map((item, index) => (
                        <>






                        </>
                    ))} */}
                <View >
                    <CartBox>
                        <Text style={[globalStyles.order_title2, { fontSize: normalize(14), marginBottom: 5 }]}>Ordered items</Text>
                        {OrderProduct && OrderProduct.length > 0 &&
                            OrderProduct.map((i, index) => (
                                <>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <View style={{ width: "80%" }}>
                                            <Text numberOfLines={1} style={[globalStyles.order_heading1]}>{i.product_name} </Text>
                                            <Text style={globalStyles.order_title}>{i.unit_name}</Text>
                                            <Text style={globalStyles.order_title2}>Quantity: {i.quantity}</Text>
                                        </View>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            {Order_Data.showPrice == 1 && <Text numberOfLines={1} style={[globalStyles.order_heading1]}> S$ {i.per_unit_itemcost.toFixed(2)} </Text>}
                                        </View>
                                    </View>

                                    {OrderProduct.length != index + 1 &&

                                        <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>
                                    }

                                </>
                            ))}
                    </CartBox>
                </View>

                {ORDERDETAILS.status_name == "On-Transit" &&

                    <MAPScreen ORDERiD={ORDERDETAILS.id} />
                }


                <View style={{ width: "100%", marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: "45%" }}>

                        <CartBox>
                            <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                <Image source={IMAGES.personalcard} style={{ width: 20, height: 20, borderRadius: 10, tintColor: "black" }} />
                                <Text style={[globalStyles.cart_title, {}]}> {"Contact details"}</Text>
                            </View>
                            <View style={{ justifyContent: "center", }}>
                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{"Customer 4"}</Text>

                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>+65 {ORDERDETAILS.mobile_number}</Text>
                            </View>
                        </CartBox>
                    </View>

                    <View style={{ width: "48%" }}>

                        <CartBox>
                            <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                <Text style={[globalStyles.cart_title, {}]}> {"Shipping Address"}</Text>
                            </View>
                            <View style={{ justifyContent: "center", }}>
                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{ORDERDETAILS.shipping_block_number} {ORDERDETAILS.shipping_street_drive_number}</Text>

                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{"unit number"} {ORDERDETAILS.shipping_unit_number}</Text>
                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(14), }}>{ORDERDETAILS.shipping_postal_code}</Text>

                            </View>
                        </CartBox>
                    </View>

                </View>
              


              
                {Order_Data.showPrice == 1 &&
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>

                        <View style={{ width: "45%" }}>
                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                    {/* <Image source={IMAGES.personalcard} style={{ width: 20, height: 20, borderRadius: 10,tintColor:"black" }} /> */}
                                    <Text style={[globalStyles.cart_title, {}]}> {"Payment Mode"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color: "black", fontWeight: "500", fontSize: normalize(16), }}>{"Cash"}</Text>


                                </View>
                            </CartBox>



                        </View>
                        <View style={{ width: "45%" }}>
                            <CartBox>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>

                                    <Text style={[globalStyles.cart_title, {}]}> {"Bill Total"}</Text>
                                </View>
                                <View style={{ justifyContent: "center", }}>
                                    <Text style={{ color: "black", fontWeight: "500", fontSize: normalize(16), }}>S$ {ORDERDETAILS[0]?.sub_total.toFixed(2)}</Text>

                                </View>
                            </CartBox>
                        </View>


                    </View>
                }


                {ORDERDETAILS[0]?.voice_file_url != null &&

                    <AudioPlay value={UPLOAD_IMAGE_PATH + ORDERDETAILS[0]?.voice_file_url} />
                }

<View style={{marginBottom:50}}>

</View>

            </ScrollView>
        </BackGround>
    )
}

export default OrderDetails

const styles = StyleSheet.create({})