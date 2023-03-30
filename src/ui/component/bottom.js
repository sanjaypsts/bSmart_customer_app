import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { HomeBotton } from '../custumsIcons';
import { IMAGES } from '../globalImage';

const DrawerBottom = (props) => {

    const [intialBottom, setintialBottom] = useState('home');

    const selectedmenu = (menu) => {
        setintialBottom(menu)
        props.parentCallback(menu);
    }

    return (
        <View style={{ height: 70, alignItems: "center", flexDirection: 'row', justifyContent: "space-around", backgroundColor: "#4A4D56", borderRadius: 20 }}>
            <TouchableOpacity onPress={() => selectedmenu('home')} ><HomeBotton imageSource={IMAGES.Home} title={"Home"} iconColor = {intialBottom == "home" ? "white" :"#A4A6AA"}/></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('category')}><HomeBotton imageSource={IMAGES.Category} title={"Category"}  iconColor = {intialBottom == "category" ? "white" :"#A4A6AA"}/></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('Orders')}><HomeBotton imageSource={IMAGES.Orders} title={"Orders"} iconColor = {intialBottom == "Orders" ? "white" :"#A4A6AA"} /></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('Cart')}><HomeBotton imageSource={IMAGES.Cart} title={"Cart"}  iconColor = {intialBottom == "cart" ? "white" :"#A4A6AA"}/></TouchableOpacity>
       </View>
    )
}

export default DrawerBottom

const styles = StyleSheet.create({})