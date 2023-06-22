
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react'
import BackGround from '../../component/backgroundImage'
import { AppLogo } from '../../globalSvg'
import { normalize, wW } from '../../helper/size'
import Errorhandling from '../../errorHandle/errorhandling'
import { LoginInput } from './loginHelper';
import { IMAGES } from '../../globalImage';
import { useSelector, useDispatch } from 'react-redux';
import { globalStyles, GradiateText, SubmitBotton } from '../../helper/globalStyle';
import { useTranslation } from 'react-i18next';
import BackBottonHeader from '../../component/header/dashboardHeader';
import DynamicAppLogo from '../../AppLogo';
import { useRef } from 'react';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import { COLORS } from '../../helper/color';

const OtpScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState(['', '', '', '',]);
    const [Data, setData] = useState([route?.params?.data]);


    const otpInputs = useRef([]);



    const [loading, setLoading] = useState(false);

    const { loginData } = useSelector(state => state.loginReducer);

    const [err, setErr] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        // Move focus to the next input box
        if (value && index < otp.length - 1) {
            otpInputs.current[index + 1].focus();
        }

        setOtp(newOtp);
    };

    const handleOtpKeyPress = (index, key) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            // Move focus to the previous input box
            otpInputs.current[index - 1].focus();
        }
    };




    const authentication = async () => {


        const mergedNumber = otp.reduce((acc, curr) => acc + curr);



        // setLoading(true)

        if (mergedNumber.length == 4) {
            // let formData = new FormData();
            // formData.append('otp', mergedNumber);
            // formData.append('encrypt_text', route.params.data.encrypt_text);
            // formData.append('email', route.params.data.mail);


            apicallHeaderPost({"otp" : mergedNumber,"encrypt_text" :route.params.data.encrypt_text,"login_email":route.params.data.mail}, 'mcustomerotpvalidate', loginData.data.token)
                .then(response => {
                   
                    setLoading(false)

                    if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                        const data = response.data.data

                        navigation.push('ChangePassword',(route.params.data.mail))
                        
                    } else {
                    }
                }).catch(err => {
                  
                    console.log(err.response.data)
                    setLoading(false)

                    if (err.response.status == 404 || err.response.status == 400) {
                        setErr(true)
                        seterrorMessage(err.response.data.message)

                    }
                })

        } else {
            setErr(true)
            seterrorMessage("Please Enter OTP")

        }




    }

    const { t, i18n } = useTranslation();

    try {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={{ flex: 1 }}>
                <BackGround>
                    <BackBottonHeader logoHide={true} updateSingleCategory={(text) => { navigation.push('Login') }} />


                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <DynamicAppLogo style={{ width: normalize(120), height: normalize(120) }} imageStyle={{ borderRadius: 10 }} />


                        <Text style={globalStyles.loginHeading}><Text>Enter OTP</Text></Text>
                        <Text style={globalStyles.loginTitle}><Text>Enter the OTP sent to your mail</Text></Text>





                        <View style={{marginBottom:50}}> 

                            <View style={styles.container}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        style={[styles.input,{ borderColor:err ? "red" : "#ccc"}]}
                                      
                                        keyboardType="numeric"
                                        maxLength={1}
                                        onChangeText={(value) =>
                                            {
                                                handleOtpChange(index, value)
                                                setErr(false)
                                                seterrorMessage('')
                                            }
                                           
                                            }
                                        onKeyPress={({ nativeEvent: { key } }) =>
                                            handleOtpKeyPress(index, key)
                                        }
                                        value={digit}
                                        ref={(input) => (otpInputs.current[index] = input)}
                                    />
                                ))}

                            </View>
                            {err && errorMessage != undefined &&
                                <Text style={{ alignSelf: "flex-end", color: COLORS.ErrorMsg, fontSize: normalize(14), fontFamily: "RedHatDisplay-Regular",marginVertical:10 }}>{errorMessage}  </Text>

                            }
                        </View>







                        <TouchableOpacity onPress={() => { authentication() }} >
                            <SubmitBotton title={"Verify"} loadingStaus={loading} />
                        </TouchableOpacity>



                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
                            <Text style={{ color: "white" }}>
                                Didn’t receive code?
                            </Text>
                            <TouchableOpacity >
                                <GradiateText title={'  Resend code'} />
                            </TouchableOpacity>


                        </View>

                        {/* <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <GradiateText title={t('Login Instead')} />
                        </TouchableOpacity> */}




                    </View>

                </BackGround>
            </KeyboardAvoidingView>
        )
    } catch (err) {
        return (
            <Errorhandling message={err.message} />
        )


    }
}

export default OtpScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'center',
    },
    input: {
        borderBottomWidth: 1,
      
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        color: "white",
        width: 50,
        textAlign: 'center',
        marginHorizontal: 5,
    },
});

