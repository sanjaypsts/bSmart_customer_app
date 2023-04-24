import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../helper/color';
import { globalStyles } from '../helper/globalStyle';
import { normalize } from '../helper/size';





export const CustumTextInput = (props) => {
    
    const {  title, value, textLength, keyBoardType,   } = props


    const onChangeText = (updatedValue) => {
        const { updateMasterState } = props;
        updateMasterState(updatedValue);
    };

   
    return (

        <View style={{}}>
         
  
                <View style={{ flexDirection: "row" }}>

                    
                    <TextInput
                        placeholder={title}
                        value={value}
                        maxLength={textLength}
                        keyboardType={keyBoardType}
                        style={[globalStyles.inputText]}
                        placeholderTextColor={"#606563"}
                        onChangeText={onChangeText}
                  
                    />


                </View>


        




         



        </View>
    )
}
