import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CartBox, Divider, globalStyles } from '../../helper/globalStyle'

const Orders = () => {
    try {
        return (
            <>
                <Text style={[globalStyles.appTitle, { marginBottom: 20 }]}>Purchase Order</Text>
                <TouchableOpacity>
                    <CartBox>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:5,alignItems:"center"}}>
                        <Text style={globalStyles.order_heading1}>Order #1234</Text>  
                        <Text style={[globalStyles.order_title,{color:"#FFA500"}]}>Processing</Text>   
                        </View>
                        <Text style={globalStyles.order_title}>Carrot 10KG, Beetroot 1 BAG 10KG + 2</Text>
                        <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical: 10 }}></View>
                        <Text style={globalStyles.order_title2}>06 Dec 2022 at 10:40AM</Text>
                    </CartBox>
                </TouchableOpacity>
            </>
        )
    }
    catch {

    }
}

export default Orders

const styles = StyleSheet.create({})