import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { APPCOLORS } from './appColors'
import { globalPaddingHorizontal, wH, wW } from './appSize'
import LinearGradient from 'react-native-linear-gradient'

const Background = ({ children,withoutpadding }) => {
    console.log(withoutpadding)
    return (
        <View>
            <StatusBar animated={true} backgroundColor={APPCOLORS.appColor} barStyle={APPCOLORS.barStyle} />
            <LinearGradient colors={['#03234C', '#06AAA8']} style={[(!withoutpadding && globalPaddingHorizontal), { width: wW, height: wH, backgroundColor: "red" }]} >
                {children}
            </LinearGradient>
        </View>


    )
}

export default Background




const styles = StyleSheet.create({})





