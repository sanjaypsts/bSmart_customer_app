import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ErrorHandle from '../../ErrorHandling/error'
import Background from '../../helper/background'
import BackBottonHeader from '../../component/backBotton'
import { App_text_styles } from '../../helper/appText'
import { CartBox, Dateformat, Divider, MiniCartBox, OneLineDivider } from '../../helper/globalStyle'
import { useState } from 'react'
import apicallHeaderPost from '../../../Data/apicall/apicallHeaderPost'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { CreditsModal } from './creditDetails'

const CreditScreen = ({ navigation }) => {
    let { identifyData, userDetails } = useSelector(state => state.loginReducer);
    const [loading, setloading] = useState(false);
    const [modalvisible, setmodalvisible] = useState(false);
    const [modal_data, setmodal_data] = useState("");

    const [creditBalance, setcreditBalance] = useState(0);
    const [PendindData, setPendindData] = useState([]);
    const [settleData, setsettleData] = useState([]);

    let { t } = useTranslation();

    const dispatch = useDispatch()






    useFocusEffect(
        React.useCallback(() => {

            getData()

        }, [])
    );


    const getData = () => {
        setPendindData([])

        setloading(true)

        apicallHeaderPost({ 'customer_id': userDetails.DATA.customer_unique_id }, 'mgetCustomerPaymentBillUsingCustomerShippingAliasId', identifyData.Tocken)
            .then(response => {
                setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    setcreditBalance(response.data.data.closing_balance)
                    setPendindData(response.data.data.pending_amount)
                    setsettleData(response.data.data.settled)

                } else {

                }

            }).catch(err => {

                setloading(false)



                if (err) {

                }
            })
    }



    const ModalPop = (data) => {
        // dispatch(Credit_Dat(data))
        setmodal_data(data)
        setmodalvisible(true)

    }

    try {
        return (
            <Background>
                <CreditsModal visible={modalvisible} modalData={modal_data} UpdateVisible={(value) => setmodalvisible(value)} /* setvisible={setmodalvisible} */ />

                <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />

                <Text style={App_text_styles.AppHeading}>{t('credit.CreditScreen')}</Text>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 20 }}>
                        <CartBox>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <Text style={App_text_styles.AppTitle}>{t('credit.credit_balance')}</Text>
                                <Text style={[App_text_styles.AppTitle, { color: "#FFA500" }]}>{t('credit.dollor')} {creditBalance}</Text>
                            </View>
                        </CartBox>
                    </View>

                    <Divider title={"CREDIT ORDERS"} />


                    {PendindData && PendindData.length > 0 &&
                        PendindData.map((item, index) => (
                            <>
                                <CartBox key={index}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <Text style={App_text_styles.AppHeading2}>{t('credit.order')} {item.invoice_number}</Text>
                                        <Text style={[App_text_styles.AppHeading2, { color: "#FFA500" }]}>{t('credit.dollor')} {item.amount_paid}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <Text style={App_text_styles.AppTitle2}>{t('credit.total_bill')}</Text>
                                        <Text style={[App_text_styles.AppTitle2,]}>{t('credit.Paid')}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <Text style={App_text_styles.AppTitle2}>{t('credit.dollor')} {item.total_amount}</Text>
                                        <Text style={[App_text_styles.AppTitle2,]}>{t('credit.dollor')} {item.pending_amount}</Text>
                                    </View>
                                    <OneLineDivider />
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <Text style={App_text_styles.AppTitle2}>{moment(item.invoice_date).format(Dateformat)}</Text>

                                        <TouchableOpacity onPress={() => ModalPop(item)}>
                                            <MiniCartBox>
                                                <Text style={App_text_styles.AppTitle2}>{t('credit.PO')}</Text>
                                            </MiniCartBox>
                                        </TouchableOpacity>

                                    </View>
                                </CartBox>
                                <View style={{ marginBottom: 10 }}></View>
                            </>
                        ))}




                    <Divider title={"SETTLED ORDERS"} />


                    {settleData && settleData.length > 0 &&
                        settleData.map((item, index) => (
                            <>
                                <CartBox key={index}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <Text style={App_text_styles.AppHeading2}>{t('credit.order')} {item.invoice_number}</Text>
                                        <Text style={[App_text_styles.AppHeading2, { color: "#65AE6D" }]}>Settled</Text>
                                    </View>

                                    <OneLineDivider />
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <Text style={App_text_styles.AppTitle2}>{moment(item.invoice_date).format(Dateformat)}</Text>

                                        <TouchableOpacity onPress={() => ModalPop(item)}>
                                            <MiniCartBox>
                                                <Text style={App_text_styles.AppTitle2}>{t('credit.Invoice')}</Text>
                                            </MiniCartBox>
                                        </TouchableOpacity>

                                    </View>
                                </CartBox>
                                <View style={{ marginBottom: 10 }}></View>
                            </>
                        ))}
                </ScrollView>
            </Background>
        )
    } catch (error) {

        <ErrorHandle error_message={error} />

    }
}

export default CreditScreen

const styles = StyleSheet.create({})