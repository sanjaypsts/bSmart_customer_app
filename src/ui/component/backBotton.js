import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackBotton, LanguageBotton } from '../helper/appcustumsIcons';
import { normalize, wW } from '../helper/appSize';
import { AppLogo, PowerdBy } from '../helper/appSvg'




const BackBottonHeader = (props) => {
    const { langBtnDisable } = props;
    const onChangeChild = (updatedValue) => {
        const { updateSingleCategory, } = props;
        updateSingleCategory(updatedValue);
    };

    try {
        return (
            <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>

                <TouchableOpacity onPress={() => { onChangeChild("backBotton") }}>
                    <BackBotton />
                </TouchableOpacity>


                <AppLogo width={normalize(40)} height={normalize(50)} />



                <TouchableOpacity >
                    <View style={{ width: normalize(30) }}>

                    </View>
                
                </TouchableOpacity>


            </View>
    
        )
    } catch (error) {
        <ErrorHandle error_message={error} />

    }

}

export default BackBottonHeader

const styles = StyleSheet.create({})