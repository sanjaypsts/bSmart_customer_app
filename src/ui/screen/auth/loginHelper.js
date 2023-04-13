import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../globalImage';
import { COLORS } from '../../helper/color';
import { normalize } from '../../helper/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles, GradiateTexte } from '../../helper/globalStyle';







export const LoginInput = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { imageSource, title, value, textLength, keyBoardType, err, passwordEye } = props


    const onChangeText = (updatedValue) => {
        const { updateMasterState } = props;
        updateMasterState(updatedValue);
    };

    const lineColor = err == undefined || err == '' || err == null ? ['#01E3AD', '#01E3AD'] : [COLORS.ErrorMsg, COLORS.ErrorMsg]
    return (

        <View style={{}}>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Image resizeMode='contain' style={[{ width: normalize(25), height: normalize(25), }]} source={imageSource} />
                    <TextInput
                        placeholder={title}
                        value={value}
                        maxLength={textLength}
                        keyboardType={keyBoardType}
                        secureTextEntry={passwordEye && passwordVisible}
                        style={globalStyles.logininputText}
                        placeholderTextColor={"#606563"}
                        onChangeText={onChangeText}
                    // onChangeText={(text) => setPassword(text)}
                    />


                </View>


                {passwordEye &&
                    <View style={{ right: 30 }}>
                        {!passwordVisible ?
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons name="eye-off-outline" size={normalize(20)} color="white" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons name="eye-outline" size={normalize(20)} color="white" />
                            </TouchableOpacity>
                        }
                    </View>
                }


            </View>


            <LinearGradient
                colors={lineColor}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={{
                    height: 1,
                    shadowColor: '#4C64FF',

                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,

                    elevation: 15,
                }}
            >

            </LinearGradient>

            {err &&
                <Text style={{ alignSelf: "flex-end", color: COLORS.ErrorMsg, fontSize: normalize(16), fontFamily: "RedHatDisplay-Regular" }}>{err}</Text>

            }



        </View>
    )
}





export const SmallCard = ({ imageSource, title }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 1, paddingVertical: 3,
            shadowColor: "#000",
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>
            <Image source={imageSource} style={{ width: 30, height: 30 }} />
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}