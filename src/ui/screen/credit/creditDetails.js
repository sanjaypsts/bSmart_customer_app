import Modal from 'react-native-modal';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CartBox, CustumModal, Dateformat } from '../../helper/globalStyle';
import { normalize } from '../../helper/appSize';
import { App_text_styles } from '../../helper/appText';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { APPCOLORS } from '../../helper/appColors';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const CreditsModal = (props) => {
    const { visible, modalData, UpdateVisible } = props
    const [Data, setData] = useState([]);





    useEffect(() => {
        setData([modalData])
    }, [modalData])


    let { t } = useTranslation();


    const onChange = () => {
        UpdateVisible(false)
    };
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
                                <Text style={App_text_styles.AppHeading3}>{t('credit.order')} {item.invoice_number}</Text>
                                <Text style={App_text_styles.AppTitle4}> {t('credit.delivery')} {moment(item.invoice_date).format(Dateformat)}</Text>

                                <View style={{ backgroundColor: "#484C53", borderRadius: 10, marginTop: 5 }}>
                                    <CartBox>
                                        <Text style={[App_text_styles.AppTitle3, { marginBottom: 10 }]}>{t('credit.purchase_order')}</Text>
                                        {item.order_details && item.order_details.length > 0 &&
                                            item.order_details.map((item, index) => (

                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 10 }}>
                                                    <View>
                                                        <Text numberOfLines={1} style={[App_text_styles.AppHeading2, { maxWidth: "96%" }]}>{item.product_name}</Text>
                                                        <Text style={App_text_styles.AppTitle}>10 KG</Text>
                                                        <Text style={[App_text_styles.AppTitle, { color: APPCOLORS.appTextColor }]}>{t('credit.Quantity')}: {item.quantity}</Text>
                                                    </View>
                                                    <Text style={[App_text_styles.AppHeading2]}>{t('credit.dollor')} {item.total_amount}</Text>
                                                </View>
                                            ))}

                                    </CartBox>
                                </View>



                                <View style={{ backgroundColor: "#484C53", borderRadius: 10, marginTop: 5 }}>
                                    <CartBox>


                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <Text style={App_text_styles.AppHeading2}>{t('credit.Subtotal')} </Text>
                                            <Text style={[App_text_styles.AppHeading2]}>{t('credit.dollor')} {item.gross_total}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <Text style={App_text_styles.AppTitle5}>{t('credit.Tax')}</Text>
                                            <Text style={[App_text_styles.AppTitle5,]}>{t('credit.dollor')} {item.total_tax}</Text>
                                        </View>


                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <Text style={App_text_styles.AppTitle5}>{t('credit.delivery')}</Text>
                                            <Text style={[App_text_styles.AppTitle5,]}></Text>
                                        </View>


                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: 10 }}>
                                            <Text style={App_text_styles.AppHeading2}>{t('credit.Grand_total')} </Text>
                                            <Text style={[App_text_styles.AppHeading2]}>{t('credit.dollor')} {item.total_amount}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <Text style={App_text_styles.AppTitle5}>{t('credit.Paid')}</Text>
                                            <Text style={[App_text_styles.AppTitle5,]}>{t('credit.dollor')} {item.amount_paid} </Text>
                                        </View>


                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <Text style={App_text_styles.AppTitle5}>{t('credit.Remaining_Credit')}</Text>
                                            <Text style={[App_text_styles.AppTitle5, { color: "#EE9A00" }]}>{t('credit.dollor')} {item.pending_amount}</Text>
                                        </View>




                                    </CartBox>
                                </View>

                            </CustumModal>
                        </>
                    ))}
            </Modal>
        )

    } catch (error) {

    }
}



const styles = StyleSheet.create({})