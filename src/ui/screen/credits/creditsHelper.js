import Modal from 'react-native-modal';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { normalize, wH, wW } from '../../helper/size';
import { CartBox, CustumModal, Dateformat, MiniCartBox, SubmitBotton, globalStyles } from '../../helper/globalStyle';
import { COLORS } from '../../helper/color';
import { IMAGES } from '../../globalImage';

import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import { useSelector } from 'react-redux';

export const CreditsModal = (props) => {
    const { visible, modalData, show_price, UpdateVisible } = props
    const [Data, setData] = useState([]);
    const { loginData } = useSelector(state => state.loginReducer);


    useEffect(() => {
        setData([modalData])
    }, [modalData])

    const onChange = () => {
        UpdateVisible(false)
    };


    const InvoicePdfDownload = (value) => {

        apicallHeaderPost({ 'order_id': value }, 'downloadInvoice', loginData.data.token)
            .then(response => {

                console.log(response)

                setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {

                } else {

                }

            }).catch(err => {




                if (err) {

                }
            })

    }





    try {
        return (
            <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ justifyContent: 'flex-end', margin: 0 }}
                onBackdropPress={() => onChange(false)}
                swipeDirection={'down'}
                onSwipeComplete={() => onChange(false)}
            >

                {Data && Data.length > 0 &&
                    Data.map((item, index) => (
                        <>



                            <CustumModal>
                                {/* <ScrollView> */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={globalStyles.order_heading1}>Order {item.invoice_number}</Text>
                                        <Text style={[globalStyles.order_title,]}>Delivery: {moment(item.invoice_date).format(Dateformat)}</Text>

                                    </View>

                                    <View>
                                        {show_price == 1 &&
                                            <TouchableOpacity disabled={item.payment_status != 1 && true} onPress={() => InvoicePdfDownload(item.invoice_number)}>

                                                <MiniCartBox>
                                                    <Text style={[globalStyles.order_title, { color: 'white' }]}>Invoice</Text>
                                                </MiniCartBox>
                                            </TouchableOpacity>
                                        }

                                    </View>

                                </View>
                                {/* <Text style={globalStyles.order_heading1}>Order {item.invoice_number}</Text>
                                        <Text style={[globalStyles.order_title,]}>Delivery: {moment(item.invoice_date).format(Dateformat)}</Text>

 */}



                                <View style={{ marginVertical: 20 }}>

                                    {item.order_details && item.order_details.length > 0 &&
                                        item.order_details.map((item, index) => (
                                            <CartBox>
                                                <Text style={[globalStyles.order_heading1, { fontFamily: "RedHatDisplay-Regular", marginBottom: 5 }]}>Purchase order</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                                    <View>
                                                        <Text numberOfLines={1} style={[globalStyles.order_heading1, { maxWidth: "80%" }]}>{item.product_name}</Text>
                                                        <Text style={globalStyles.order_title}>10 KG</Text>
                                                        <Text style={globalStyles.order_title}>Quantity: {item.quantity}</Text>
                                                    </View>
                                                    <View>
                                                    {show_price == 1 &&
                                                        <Text style={[globalStyles.order_heading1,]}>S$ {(item.total_amount.toFixed(2))}</Text>
                                                    }

                                                    </View>
                                                </View>

                                            </CartBox>
                                        ))}
                                </View>



                                {show_price == 1 &&


                                    <CartBox>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>{"Subtotal"}</Text>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>S$ {(item.gross_total.toFixed(2))}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Tax</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {(item.total_tax.toFixed(2))}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.truck} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Delivery</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ 0</Text>
                                        </View>
                                        <View style={{ backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10 }}></View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>{"Grand total"}</Text>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>S$ {(item.total_amount.toFixed(2))}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Paid</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {item.amount_paid}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Remaining Credit</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {(item.pending_amount.toFixed(2))}</Text>
                                        </View>


                                    </CartBox>

                                }
                                {item.payment_status == 0 &&
                                    <>
                                        <View style={{ marginBottom: 120 }}></View>

                                        <View style={{ position: "absolute", flexDirection: "row", bottom: 0, alignItems: 'center', width: wW, backgroundColor: COLORS.appLightColor, height: 100, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "grey" }}>
                                            <Image resizeMode='contain' source={IMAGES.PayWith} style={{ width: 100, height: 80, borderRadius: 10 }} />

                                            <TouchableOpacity style={{ width: 100, borderRadius: 10, backgroundColor: COLORS.appColor, justifyContent: "center", alignItems: "center", height: 50, }} onPress={() => { }}>
                                                <Text style={{ color: "white" }}>Pay Now</Text>
                                                {/* <SubmitBotton title={"Pay Now"} loadingStaus={false} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                }

                                {/* </ScrollView> */}
                            </CustumModal>

                        </>
                    ))}
            </Modal>
        )

    } catch ({ error }) {

    }
}



const styles = StyleSheet.create({})