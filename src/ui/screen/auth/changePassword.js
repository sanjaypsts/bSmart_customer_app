
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

const ChangePassword = ({ route, navigation }) => {
    const { loginData } = useSelector(state => state.loginReducer);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setpasswordError] = useState("");

    const [RepeatPassword, setRepeatPassword] = useState('');
    const [RepeatPasswordError, setRepeatPasswordError] = useState("");

    const [error, seterrorMessage] = useState(false);
    const [emailError, setemailError] = useState("");

    try {

        const authentication = () => {
     

            if (password !== RepeatPassword) {
   
                setRepeatPasswordError('Passwords do not match');
                seterrorMessage(true)
            } else if (password.length < 6) {
                seterrorMessage(true)
                setRepeatPasswordError('Password must be at least 6 characters long');
            } else {
                // Password is valid, perform further actions
                setLoading(true)
                  let formData = new FormData();
            formData.append('login_email', route?.params);
            formData.append('new_password', password);
            formData.append('confirm_password', RepeatPassword);

                setRepeatPasswordError('');
                apicallHeaderPost(formData, 'mcustomernewpassword', loginData.data.token)
                    .then(response => {

                        setLoading(false)

                        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                            const data = response.data.data

                            navigation.push('Login')

                        } else {
                        }
                    }).catch(err => {

                     
                        setLoading(false)

                        if (err.response.status == 404 || err.response.status == 400) {
                            setErr(true)
                            seterrorMessage(err.response.data.message)

                        }
                    })
                // ...
            }

        }
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={{ flex: 1 }}>
                <BackGround>
                    <BackBottonHeader logoHide={true} updateSingleCategory={(text) => { navigation.push('Login') }} />
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <DynamicAppLogo style={{ width: normalize(120), height: normalize(120) }} imageStyle={{ borderRadius: 10 }} />


                        <Text style={globalStyles.loginHeading}><Text>Enter new password</Text></Text>
                        <Text style={globalStyles.loginTitle}><Text>Set a new password for your account</Text></Text>




                        <View style={{ width: "100%", marginVertical: 80 }} >
                            <LoginInput imageSource={IMAGES.PassIcon} title={'New password'} value={password} textLength={50} keyBoardType={"default"} updateMasterState={(text) => { setPassword(text); seterrorMessage(false); setpasswordError("") }} err={error} errorMessage={passwordError} passwordEye={true} />


                            <View style={{ marginVertical: 5 }}></View>
                            <LoginInput imageSource={IMAGES.PassIcon} title={'Repeat password'} value={RepeatPassword} textLength={50} keyBoardType={"default"} updateMasterState={(text) => { setRepeatPassword(text); seterrorMessage(false); setRepeatPasswordError("") }} err={error} errorMessage={RepeatPasswordError} passwordEye={true} />
                        </View>







                        <TouchableOpacity onPress={() => { authentication() }} >
                            <SubmitBotton title={"Verify"} loadingStaus={loading} />
                        </TouchableOpacity>










                    </View>

                </BackGround>
            </KeyboardAvoidingView>
        )

    } catch (error) {
        return (
            <Errorhandling message={error.message} />
        )

    }
}

export default ChangePassword

const styles = StyleSheet.create({})