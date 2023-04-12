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
    const { imageSource, title, value, err, passwordEye } = props


    const onChangeText = (updatedValue) => {
        const { updateMasterState } = props;
        updateMasterState(updatedValue);
    };

    const lineColor = err == undefined || err == '' || err == null ? ['#01E3AD', '#01289D'] : [COLORS.ErrorMsg, COLORS.ErrorMsg]
    return (

        <View style={{
            backgroundColor: "#ECFAEC",
            borderLeftWidth: 5, borderLeftColor: "#5ed85e",
            shadowColor: 'black',
            borderRadius: 5,
            shadowOffset: {
                // width: 0,
                // height: 10,
            },
            // shadowOpacity: 0.20,
            // shadowRadius: 9.51,

            elevation: 3,

        }}>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Image resizeMode='contain' style={[{ width: normalize(20), height: normalize(20), marginLeft: 10 }]} source={imageSource} />
                    <TextInput
                        placeholder={title}
                        value={value}
                        maxLength={125}

                        secureTextEntry={passwordEye && passwordVisible}
                        style={globalStyles.logininputText}
                        placeholderTextColor={"#606563"}
                        onChangeText={onChangeText}
                    // onChangeText={(text) => setPassword(text)}
                    />


                </View>


                {passwordEye &&
                    <View style={{ right: 30 }}>
                        {passwordVisible ?
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons name="eye-outline" size={normalize(20)} color="white" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons name="eye-off-outline" size={normalize(20)} color="white" />
                            </TouchableOpacity>
                        }
                    </View>
                }


            </View>


            {/* <LinearGradient
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

            </LinearGradient> */}

            {passwordEye && err >= 1 &&
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