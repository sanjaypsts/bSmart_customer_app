import React, { useState } from "react";
import { Text, ImageBackground, View, ActivityIndicator, StatusBar } from "react-native";
import { IMAGES } from "../globalImage";
import { COLORS } from "../helper/color";
import { globalPaddingHorizontal, wH, wW } from "../helper/size";



const BackGround = ({ children, cureentScreen, }) => {
    console.log(cureentScreen)

    return (
        <View>
            <StatusBar animated={true} backgroundColor={cureentScreen == "login" ? "#07903E" : COLORS.appColor} barStyle={COLORS.barStyle} />
            {/* <View style={[ globalPaddingHorizontal, { width: wW, height: wH,backgroundColor:"#F1FCF1" }]}>
            {children}
            </View> */}
            <ImageBackground resizeMode="contain" style={[ globalPaddingHorizontal, { width: wW, height: wH, }]}  source={IMAGES.BackGround} >
                {children}
            </ImageBackground>
          </View>

    )

}
export default BackGround


// splashScreen
export const SplashBackGround = ({ children }) => {
    return (
        <View>
            <StatusBar animated={true} backgroundColor={COLORS.appColor} barStyle={COLORS.barStyle} />
            <View style={[{ width: wW, height: wH, }]} >
            {children}
            </View>
            {/* <ImageBackground style={[{ width: wW, height: wH, }]} source={IMAGES.splashScreen} >
                {children}
            </ImageBackground> */}
        </View>

    )

}






