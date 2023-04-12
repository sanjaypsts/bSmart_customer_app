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
        <View style={{ height: 70, alignItems: "center", flexDirection: 'row', justifyContent: "space-around", backgroundColor:  COLORS.defaultcolor, borderRadius: 20 }}>
            <TouchableOpacity onPress={() => selectedmenu('home')}  style={intialBottom != "category" && intialBottom != "Orders" && intialBottom != "cart" && styles.round} ><HomeBotton imageSource={IMAGES.Home} title={"Home"} iconColor = {intialBottom != "category" && intialBottom != "Orders" && intialBottom != "cart" ? COLORS.defaultcolor : "white" }/></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('category')} style={intialBottom == "category"  && styles.round}><HomeBotton imageSource={IMAGES.Category} title={"Category"}  iconColor = {intialBottom == "category" ? COLORS.defaultcolor : "white"}/></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('Orders')}  style={intialBottom == "Orders"  && styles.round}><HomeBotton imageSource={IMAGES.Orders} title={"Orders"} iconColor = {intialBottom == "Orders" ? COLORS.defaultcolor : "white"} /></TouchableOpacity>
            <TouchableOpacity onPress={() => selectedmenu('Cart')}  style={intialBottom == "Cart"  && styles.round}><HomeBotton imageSource={IMAGES.Cart} title={"Cart"}  iconColor = {intialBottom == "cart" ? COLORS.defaultcolor : "white"}/></TouchableOpacity>
       </View>
    )
}

export default DrawerBottom

const styles = StyleSheet.create({

round:{
    backgroundColor:"white",borderRadius:50
}

})