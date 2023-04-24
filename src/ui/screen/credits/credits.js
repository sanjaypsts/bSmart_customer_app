import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import LoadingModal from '../../component/loading'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { useState } from 'react'
import { CartBox, Dateformat, Divider, MiniCartBox, globalStyles } from '../../helper/globalStyle'
import { CreditsModal } from './creditsHelper'
import { COLORS } from '../../helper/color'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import moment from 'moment/moment'


const Credits = ({ navigation }) => {
    const [creditBalance, setcreditBalance] = useState(0);
    const [PendindData, setPendindData] = useState([]);
    const [modal_data, setmodal_data] = useState("");
    const [settleData, setsettleData] = useState([]);
    const [showPrice,setshowPrice ] = useState(false);

    const { loginData } = useSelector(state => state.loginReducer);


    useFocusEffect(
        React.useCallback(() => {

            getData()

        }, [])
    );


    const getData = () => {
        setPendindData([])
        setsettleData([])


        setloading(true)

        apicallHeaderPost({ 'customer_id': loginData.data.customer_shipping_address_alias_id.id }, 'mgetCustomerPaymentBillUsingCustomerShippingAliasId', loginData.data.token)
            .then(response => {


                setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    setcreditBalance(response.data.data.closing_balance)
                    setPendindData(response.data.data.pending_amount)
                    setsettleData(response.data.data.settled)
                    setshowPrice(response.data.data.show_price)
                } else {

                }

            }).catch(err => {

                setloading(false)



                if (err) {

                }
            })
    }

    const [loading, setloading] = useState(false);
    const [modalvisible, setmodalvisible] = useState(false);

    const ModalPop = (data) => {
        // dispatch(Credit_Dat(data))
        setmodal_data(data)
        setmodalvisible(true)

    }

    return (
        <BackGround>
            <LoadingModal loading={loading} setloading={setloading} />
            <CreditsModal visible={modalvisible} modalData={modal_data} show_price={showPrice} UpdateVisible={(value) => setmodalvisible(value)} /* setvisible={setmodalvisible} */ />

            <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />

            <Text style={globalStyles.appTitle}>Credits</Text>
   
                {showPrice == 1 &&

            <View style={{ marginVertical: 20 }}>
                <CartBox>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Text style={globalStyles.order_heading1}>Credit Balance</Text>
                        <Text style={[globalStyles.order_heading1, { color: "#FFA500" }]}>S$ {creditBalance}</Text>
                    </View>
                </CartBox>
            </View>
                }
            <ScrollView showsVerticalScrollIndicator={false}>
                <Divider title={" CREDIT ORDERS "} />


                {PendindData && PendindData.length > 0 &&
                    PendindData.map((item, index) => (

                        <View style={{ marginTop: 10 }}>


                            <CartBox>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", }}>
                                    <View>
                                        <Text style={globalStyles.order_heading1}>Order {item.invoice_number}</Text>
                                        {showPrice == 1 && 
                                      <>
                                        <Text style={globalStyles.order_title}>Total Bill</Text>
                                        <Text style={globalStyles.order_title}>S$ {item.total_amount.toFixed(2)}</Text>
                                        </>}
                                    </View>
                                    <View>
                                      {showPrice == 1 && 
                                      <>
                                      <Text style={[globalStyles.order_heading1, { color: "#FFA500" }]}>S$ {item.pending_amount.toFixed(2)}</Text>
                                        <Text style={globalStyles.order_title}>Paid</Text>
                                        <Text style={globalStyles.order_title}>S$ {item.amount_paid.toFixed(2)}</Text>
                                        </>}

                                    </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "100%", marginVertical: 10 }}></View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <Text style={[globalStyles.order_title, { color: COLORS.appOppsiteTextColor }]}>{moment(item.invoice_date).format(Dateformat)}</Text>

                                    <TouchableOpacity onPress={() => ModalPop(item)}>
                                        <MiniCartBox>
                                            <Text style={[globalStyles.order_title, { color: 'white' }]}>PO</Text>
                                        </MiniCartBox>
                                    </TouchableOpacity>

                                </View>
                            </CartBox>
                        </View>
                    ))}


                <Divider title={"SETTLED ORDERS"} />

                {settleData && settleData.length > 0 &&
                    settleData.map((item, index) => (
                        <>
                            <CartBox key={index}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <Text  style={globalStyles.order_heading1}>order {item.invoice_number}</Text>
                                    <Text style={[globalStyles.order_title, { color: "#65AE6D" }]}>Settled</Text>
                                </View>

                                <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "100%", marginVertical: 10 }}></View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <Text style={[globalStyles.order_title, { color: COLORS.appOppsiteTextColor }]}>{moment(item.invoice_date).format(Dateformat)}</Text>

                                    <TouchableOpacity onPress={() => ModalPop(item)}>
                                        <MiniCartBox>
                                            <Text style={[globalStyles.order_title, { color: 'white' }]}>Invoice</Text>
                                        </MiniCartBox>
                                    </TouchableOpacity>

                                </View>
                            </CartBox>
                            <View style={{ marginBottom: 10 }}></View>
                        </>
                    ))}


            </ScrollView>
        </BackGround>
    )
}

export default Credits

const styles = StyleSheet.create({})