import React, { useState } from "react";
import { Text, ImageBackground, View, ActivityIndicator, StatusBar } from "react-native";
import { IMAGES } from "../globalImage";
import { COLORS } from "../helper/color";
import { globalPaddingHorizontal, wH, wW } from "../helper/size";
import LinearGradient from "react-native-linear-gradient";



const BackGround = ({ children, splashScreen, imageSource }) => {

    return (
        <View>
            <StatusBar animated={true} backgroundColor={COLORS.appColor} barStyle={COLORS.barStyle} />
            <LinearGradient colors={[COLORS.imageBgCOLOR,COLORS.imageBgCOLOR2,COLORS.imageBgCOLOR3,]} style={[!splashScreen && globalPaddingHorizontal, { width: wW, height: wH, }]} >
                {children}
            </LinearGradient>
            {/* <ImageBackground style={[!splashScreen && globalPaddingHorizontal, { width: wW, height: wH, }]} source={IMAGES.BackGround} >
                {children}
            </ImageBackground> */}
        </View>

    )
 
}
export default BackGround


// splashScreen
export const SplashBackGround = ({ children }) => {
    return (
        <View>
            <StatusBar animated={true} backgroundColor={COLORS.appColor} barStyle={COLORS.barStyle} />
            <ImageBackground style={[{ width: wW, height: wH, }]} source={IMAGES.splashScreen} >
                {children}
            </ImageBackground>
        </View>

    )

}






