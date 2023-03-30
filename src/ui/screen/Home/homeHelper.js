import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartBotton } from '../../custumsIcons';
import { IMAGES } from '../../globalImage';
import { normalize } from '../../helper/size';





// dashBoard Card

export const PlaceOrderHorizontalCard = ({ imageSource, title }) => {
    return (
        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
             flexDirection: "row", alignItems: "center", justifyContent: "center",
                shadowColor: "#329BFF", marginTop: 20,padding:0.8,
                borderRadius: 15,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
            }}
        >

            <View style={{ backgroundColor: "#202020", flex:1,  borderRadius: 15, alignItems: "center", flexDirection: "row",padding: 20, paddingHorizontal: 50  }}>
                <Image style={[{ width: normalize(80), height: normalize(60), marginRight: 15 }]} source={IMAGES.No_order} />
                <View>
                    <Text style={{ color: "white", fontSize: normalize(20) }}>No Orders</Text>
                    <Text style={{ color: "#9CA3AF", fontSize: normalize(15) }}>Place orders to your business.</Text>

                </View>
            </View>
        </LinearGradient>

    )
}




export const Order_Products = ({ imageSource, title }) => {
    return (
        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
                backgroundColor: "white", flexDirection: "row",  alignItems: "center", justifyContent: "center",
                shadowColor: "#329BFF", marginTop: 20,padding:0.8,
                borderRadius: 20,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
            }}
        >

            <View style={{ backgroundColor: "#202020", flex: 1, borderRadius: 20, alignItems: "center", flexDirection: "row", padding: 20,justifyContent:"space-between" }}>
                <View style={{ alignItems: "center", flexDirection: "row", }}>
                    <Image style={[{ width: normalize(50), height: normalize(60), marginRight: 15 }]} source={IMAGES.Order_Product} />
                    <Text style={{ color: "white", fontSize: normalize(20) }}>Order Products</Text>
                </View>
                <CartBotton/>
            </View>
        </LinearGradient>

    )
}




export const SmallCardList = ({ imageSource, title }) => {
    return (
        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
                backgroundColor: "white", flexDirection: "row",  alignItems: "center", justifyContent: "center",
                shadowColor: "#329BFF", marginTop: 5,padding:0.8,
                borderRadius: 20,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
            }}
        >

            <View style={{ backgroundColor:"#202020",borderRadius:20, alignItems: "center", justifyContent: "space-evenly",width:110,height:100}}>
            <Image style={[{ width: normalize(40), height: normalize(40), }]} source={imageSource} />
            <Text style={{color:"white"}}>{title}</Text>
   
            </View>
        </LinearGradient>

    )
}








