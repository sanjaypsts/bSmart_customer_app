import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ImageBackground, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartBotton } from '../../custumsIcons';
import { IMAGES } from '../../globalImage';
import { globalStyles } from '../../helper/globalStyle';
import { normalize, wH, wW } from '../../helper/size';
import { COLORS } from '../../helper/color';





// dashBoard Card

export const PlaceOrderHorizontalCard = ({ imageSource, title }) => {
    return (


        <>
            <ImageBackground blurRadius={2} resizeMode="cover" style={[{ height: 130, marginVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", }]} source={IMAGES.HomeBackGround} imageStyle={{ borderRadius: 10 }} >
                <Image resizeMode="contain" style={[{ width: normalize(120), height: normalize(120), marginRight: 0 }]} source={IMAGES.No_order} />
                <View>
                    <Text style={[globalStyles.heading, { color: COLORS.appColor }]}>No Orders</Text>
                    <Text style={[globalStyles.title, { color: "black", width: "70%" }]}>Place orders to your business.</Text>

                </View>

            </ImageBackground>
        </>
        // <View

        //     style={{
        //         flexDirection: "row", alignItems: "center", justifyContent: "center",
        //         shadowColor: "#329BFF",
        //         marginTop: 10, padding: 0.8, borderRadius: 20,marginBottom:10
        //     }}
        // >

        //     <View style={{ flex: 1, height: "100%", backgroundColor: COLORS.appLightColor, borderRadius: 20, flexDirection: "row", alignItems: "center", padding: 20, justifyContent: "center" }}>
        //         <Image resizeMode="contain" style={[{ width: normalize(80), height: normalize(80), marginRight: 15 }]} source={IMAGES.No_order} />
        //         <View>
        //             <Text style={[globalStyles.heading, {}]}>No Orders</Text>
        //             <Text style={[globalStyles.title, { color: "#9CA3AF", }]}>Place orders to your business.</Text>

        //         </View>
        //     </View>

        // </View>

    )
}




export const Order_Products = ({ imageSource, title }) => {
    const navigation = useNavigation();

    return (
        // <LinearGradient
        //     colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
        //     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        //     style={{
        //         backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "center",
        //         shadowColor: "#329BFF", marginTop: 20, padding: 0.8,
        //         borderRadius: 20,
        //         shadowOffset: {
        //             width: 0,
        //             height: 7,
        //         },
        //         shadowOpacity: 0.43,
        //         shadowRadius: 9.51,

        //         elevation: 15,
        //     }}
        // >

        //     <View style={{ backgroundColor: "#202020", flex: 1, borderRadius: 20, alignItems: "center", flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
        //         <View style={{ alignItems: "center", flexDirection: "row", }}>
        //             <Image style={[{ width: normalize(50), height: normalize(60), marginRight: 15 }]} source={IMAGES.Order_Product} />
        //             <Text style={{ color: "white", fontSize: normalize(20) }}>Order Products</Text>
        //         </View>
        //         <CartBotton />
        //     </View>
        // </LinearGradient>


        <LinearGradient
            colors={['#00A298', '#0155A0']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
                flexDirection: "row", alignItems: "center", justifyContent: "center",
                shadowColor: "#329BFF",
                marginTop: 10, padding: 0.8, borderRadius: 20,
            }}
        >

            <View style={{ flex: 1, height: "100%", backgroundColor: "#202020", borderRadius: 20, flexDirection: "row", alignItems: "center", padding: 20, justifyContent: "space-between" }}>
                <View style={{ width: "55%", flexDirection: "row", alignItems: "center", }}>
                    <Image resizeMode="contain" style={[{ width: normalize(60), height: normalize(60), marginRight: 15 }]} source={IMAGES.Order_Product} />
                    <View>
                        <Text style={[globalStyles.heading, {}]}>Order Products</Text>
                        <Text style={[globalStyles.title, { color: "#9CA3AF", }]}>Order within 3PM for same day delivery.</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { navigation.push('DashBoard', { Screen: "Orders" }) }}>
                    <CartBotton />
                </TouchableOpacity>
            </View>

        </LinearGradient>

    )
}




export const SmallCardList = ({ imageSource, title }) => {
    return (


        // <View

        //     style={{

        //         shadowColor: "#329BFF",
        //         padding: 0.8, borderRadius: 20, height: 100, width: 110
        //     }}
        // >

        //     <View style={{ width: "100%", height: "100%", backgroundColor: COLORS.appLightColor, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>

        //         <Image resizeMode="contain" style={[{ width: normalize(40), height: normalize(40) }]} source={imageSource} />
        //         <Text style={[globalStyles.title, { lineHeight: 30 }]}>{title}</Text>

        //     </View>

        // </View>

            <View style={{backgroundColor: COLORS.appLightColor, borderRadius: 10, alignItems: "center", justifyContent: "center" ,flexDirection:"row",paddingHorizontal:10,paddingVertical:5}}>
                <Image resizeMode="contain" style={[{ width: normalize(20), height: normalize(20) }]} source={imageSource} />
                <Text style={[globalStyles.title, { lineHeight: 30 }]}> {title}</Text>
            </View>
   

    )
}








