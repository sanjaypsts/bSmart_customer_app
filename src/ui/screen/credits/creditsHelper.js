import Modal from 'react-native-modal';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { normalize, wH, wW } from '../../helper/size';
import { CartBox, CustumModal, SubmitBotton, globalStyles } from '../../helper/globalStyle';
import { COLORS } from '../../helper/color';
import { IMAGES } from '../../globalImage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const CreditsModal = (props) => {
    const { visible, UpdateVisible } = props


    const onChange = () => {
        UpdateVisible(false)
    };
    return (
        <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ justifyContent: 'flex-end', margin: 0 }}
            onBackdropPress={() => onChange(false)}
            swipeDirection={'down'}
            onSwipeComplete={() => onChange(false)}>
            <CustumModal>
                <Text style={globalStyles.order_heading1}>Order #1234</Text>
                <Text style={[globalStyles.order_title,]}>Delivery: 07 Dec 2022 at 11:00AM</Text>

                <View style={{ marginVertical: 20 }}>


                    <CartBox>
                        <Text style={[globalStyles.order_heading1, { fontFamily: "RedHatDisplay-Regular", marginBottom: 5 }]}>Purchase order</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <View>
                                <Text style={globalStyles.order_heading1}>Carrots</Text>
                                <Text style={globalStyles.order_title}>10 KG</Text>
                                <Text style={globalStyles.order_title}>Quantity: 10</Text>
                            </View>
                            <View>
                                <Text style={[globalStyles.order_heading1,]}>S$ 100</Text>


                            </View>
                        </View>

                    </CartBox>
                </View>




                <CartBox>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                        <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Subtotal"}</Text>
                        <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>S$ 0</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Tax</Text>
                        </View>
                        <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ 0</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image resizeMode='contain' source={IMAGES.truck} style={{ width: 18, height: 18, borderRadius: 10 }} />
                            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Delivery</Text>
                        </View>
                        <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ 0</Text>
                    </View>
                    <View style={{ backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Grand total"}</Text>
                        <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>S$ 0</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Paid</Text>
                        </View>
                        <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ 0</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Remaining Credit</Text>
                        </View>
                        <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ 0</Text>
                    </View>


                </CartBox>

                <View style={{ marginBottom: 120 }}></View>

                <View style={{ position: "absolute", flexDirection: "row", bottom: 0, alignItems: 'center', width: wW, backgroundColor: "#35373D", height: 100, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "grey" }}>
                <Image resizeMode='contain' source={IMAGES.PayWith} style={{ width: 100, height: 80, borderRadius: 10 }} />

                    <TouchableOpacity style={{ width: 100, borderRadius: 20 }} onPress={() => { }}>
                        <SubmitBotton title={"Pay Now"} loadingStaus={false} />
                    </TouchableOpacity>
                </View>


            </CustumModal>
        </Modal>
    )
}



const styles = StyleSheet.create({})