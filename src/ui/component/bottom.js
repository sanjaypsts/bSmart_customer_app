import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { HomeBotton } from '../custumsIcons';
import { IMAGES } from '../globalImage';
import { COLORS } from '../helper/color';

const DrawerBottom = (props) => {

    const [intialBottom, setintialBottom] = useState('home');

    const selectedmenu = (menu) => {
        setintialBottom(menu)
        props.parentCallback(menu);
    }

    return (
        <View style={{ height: 70, alignItems: "center", flexDirection: 'row', justifyContent: "space-around", backgroundColor: COLORS.appLightColor, borderRadius: 20 }}>
            <TouchableOpacity onPress={() => selectedmenu('home')} ><HomeBotton imageSource={IMAGES.Home} title={"Home"} iconColor = {intialBottom != "category" && intialBottom != "Orders" && intialBottom != "cart" ?  COLORS.appTextColor : COLORS.appOppsiteTextColor} backgroundColor={intialBottom != "category" && intialBottom != "Orders" && intialBottom != "cart" ?  COLORS.appColor :  COLORS.appLightColor }/></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('category')}><HomeBotton imageSource={IMAGES.Category} title={"Category"}  iconColor = {intialBottom == "category" ? COLORS.appTextColor : COLORS.appOppsiteTextColor} backgroundColor={intialBottom == "category"  ?  COLORS.appColor : COLORS.appLightColor }/></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('Orders')}><HomeBotton imageSource={IMAGES.Orders} title={"Orders"} iconColor = {intialBottom == "Orders" ? COLORS.appTextColor : COLORS.appOppsiteTextColor} backgroundColor={intialBottom == "Orders"  ? COLORS.appColor : COLORS.appLightColor } /></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('Cart')}><HomeBotton imageSource={IMAGES.Cart} title={"Cart"}  iconColor = {intialBottom == "cart" ? COLORS.appTextColor : COLORS.appOppsiteTextColor} backgroundColor={intialBottom == "cart"  ?  COLORS.appColor : COLORS.appLightColor }/></TouchableOpacity>
       </View>
    )
}

export default DrawerBottom

const styles = StyleSheet.create({})