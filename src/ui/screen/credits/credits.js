import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import LoadingModal from '../../component/loading'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { useState } from 'react'
import { CartBox, Divider, MiniCartBox, globalStyles } from '../../helper/globalStyle'
import { CreditsModal } from './creditsHelper'
import { COLORS } from '../../helper/color'


const Credits = ({ navigation }) => {
    const [loading, setloading] = useState(false);
    const [modalvisible, setmodalvisible] = useState(false);

    return (
        <BackGround>
            <LoadingModal loading={loading} setloading={setloading} />
            <CreditsModal visible={modalvisible} UpdateVisible={(value) => setmodalvisible(value)} /* setvisible={setmodalvisible} */ />

            <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />

            <Text style={globalStyles.appTitle}>Credits</Text>

            <View style={{ marginVertical: 20 }}>
                <CartBox>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Text style={globalStyles.order_heading1}>Credit Balance</Text>
                        <Text style={[globalStyles.order_heading1, { color: "#FFA500" }]}>S$ 100</Text>
                    </View>
                </CartBox>
            </View>

            <Divider title={" CREDIT ORDERS "} />



            <CartBox>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <View>
                        <Text style={globalStyles.order_heading1}>Order #1234</Text>
                        <Text style={globalStyles.order_title}>Total Bill</Text>
                        <Text style={globalStyles.order_title}>S$ 505.99</Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.order_heading1, { color: "#FFA500" }]}>S$ 100</Text>
                        <Text style={globalStyles.order_title}>Paid</Text>
                        <Text style={globalStyles.order_title}>S$ 500</Text>

                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "100%", marginVertical: 10 }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Text style={[globalStyles.order_title, { color: COLORS.appOppsiteTextColor }]}>06 Dec 2022 at 10:40AM</Text>

                    <TouchableOpacity onPress={() => setmodalvisible(true)}>
                        <MiniCartBox>
                            <Text style={[globalStyles.order_title, { color: 'white' }]}>PO</Text>
                        </MiniCartBox>
                    </TouchableOpacity>

                </View>
            </CartBox>


        </BackGround>
    )
}

export default Credits

const styles = StyleSheet.create({})