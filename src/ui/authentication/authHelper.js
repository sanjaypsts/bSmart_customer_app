import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import ErrorHandle from "../ErrorHandling/error";
import { normalize, wW } from "../helper/appSize";
import { globalPaddingHorizontal } from "../helper/appSize";
import { App_text_styles } from "../helper/appText";
import { APPCOLORS } from "../helper/appColors";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const LoginInput = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    try {

        const { InputValue, updateMasterState } = props
        const onChangeText = (updatedValue, paramsName) => {
            let temp = InputValue.map((InputValue) => {
                if (paramsName === InputValue.paramsName) {
                    return { ...InputValue, value: updatedValue ,error:false,error_message:""};
                }
                return InputValue;
            })
            updateMasterState(temp);


        };

        return (
            <View style={{ width: "100%" }}>
                {InputValue && InputValue.length > 0 &&
                    InputValue.map((i, index) => (
                        <View key={index}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                                {/* icon */}
                                <Image resizeMode='contain' style={[{ width: normalize(20), height: normalize(20), marginRight: 10 }]} source={i.imageSource} />
                                {/* TextInput */}
                                <TextInput
                                    style={{color:"white",width:"100%"}}
                                    placeholder={i.placeHolder}
                                    value={i.value}
                                    maxLength={i.maxLength}
                                    keyboardType={i.keyboardType}
                                    autoCapitalize="none"
                                    secureTextEntry={passwordVisible}
                                    placeholderTextColor={"grey"}
                                    onChangeText={(value) => onChangeText(value, i.paramsName)}

                                />
                                {/* eyeIcon */}
                                {i.paramsName == "password" &&
                                    <View style={{ position: "absolute", right: 5 }}>
                                        {!passwordVisible ?
                                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                                <Ionicons name="eye-off-outline" size={normalize(20)} color={APPCOLORS.appTextColor} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                                <Ionicons name="eye-outline" size={normalize(20)} color={APPCOLORS.appTextColor} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                }

                                {i.paramsName != "password" && i.error == true &&
                                    <View style={{ position: "absolute", right: 5 }}>
                                        <Ionicons name="information-circle-outline" size={normalize(20)} color={APPCOLORS.ErrorMsg} />

                                    </View>
                                }


                            </View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: i.error == true ? APPCOLORS.ErrorMsg : APPCOLORS.appTextColor }}></View>
                            {i.error == true && i.error_message && <View style={{ alignSelf: "flex-end" }}><Text style={App_text_styles.ErrorMsg}>{i.error_message}</Text></View>}

                        </View>

                    ))}
            </View>
        )

    } catch (error) {

        <ErrorHandle error_message={error} />

    }
}



// <View>
// {InputValue && InputValue.length > 0 &&
//     InputValue.map((i, index) => (
//         <TextInput
//             placeholder={i.placeHolder}
//             value={i.value}
//             maxLength={i.maxLength}
//             keyboardType={i.keyboardType}
//             // secureTextEntry={passwordEye && passwordVisible}
//             // style={globalStyles.logininputText}
//             placeholderTextColor={"#606563"}
//             onChangeText={(value) => onChangeText(value,i.paramsName)}
//         // onChangeText={(text) => setPassword(text)}
//         />

//     ))}


// </View>