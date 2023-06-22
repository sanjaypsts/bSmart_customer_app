
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react'
import BackGround from '../../component/backgroundImage'
import { AppLogo } from '../../globalSvg'
import { normalize, wW } from '../../helper/size'
import Errorhandling from '../../errorHandle/errorhandling'
import { LoginInput } from './loginHelper';
import { IMAGES } from '../../globalImage';
import { useSelector, useDispatch } from 'react-redux';
import { Relogin } from '../../../stateManage/auth/actions';
import apicall from '../../../stateManage/apicall';
import { globalStyles, GradiateText, SubmitBotton } from '../../helper/globalStyle';
import { useTranslation } from 'react-i18next';
import BackBottonHeader from '../../component/header/dashboardHeader';
import DynamicAppLogo from '../../AppLogo';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';

const ForgetPassword = ({ navigation }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [error, seterrorMessage] = useState('');
    const [emailError, setemailError] = useState("");
    const [loading, setLoading] = useState(false);

    const { loginData } = useSelector(state => state.loginReducer);



    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Function to validate an email address
    const validateEmail = (email) => {
        return emailPattern.test(email);
    };

    

    const authentication = async () => {


        const email = username;
        const isValid = validateEmail(email);

        if (isValid) {


            setLoading(true)
            apicallHeaderPost({ "login_email": username }, 'mcustomerForgetPassword', loginData.data.token)
                .then(response => {
                    setLoading(false)

                    if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                        const data = response.data.data
                        navigation.push('OtpScreen', { data })

                    } else {
                    }
                }).catch(err => {
                    setLoading(false)

                    if (err.response.status == 404 || err.response.status == 404) {
                        seterrorMessage(true)
                        setemailError(err.response.data.message)

                    }
                })
        } else {

            seterrorMessage(true)
            setemailError("Invalid email address")

        }


    }


    const { t, i18n } = useTranslation();

    try {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={styles.container}>
                <BackGround>
                    <BackBottonHeader logoHide={true} updateSingleCategory={(text) => { navigation.push('Login') }} />


                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <DynamicAppLogo style={{ width: normalize(120), height: normalize(120) }} imageStyle={{ borderRadius: 10 }} />

                        {/* <AppLogo width={normalize(120)} height={normalize(120)} /> */}
                        {/* Forget Password title */}
                        <Text style={globalStyles.loginHeading}><Text>{t('login.forgot_password')}</Text></Text>
                        <Text style={globalStyles.loginTitle}><Text>{t('login.forgot_password_descripton')}</Text></Text>



                        <View style={{ width: "100%", marginVertical: 30, }} >
                            <LoginInput imageSource={IMAGES.emailIcon} title={t('login.email')} value={username} updateMasterState={(text) => { setUsername(text); seterrorMessage(false); setemailError("") }} err={error} errorMessage={emailError} />
                        </View>

                        <TouchableOpacity disabled={loading} onPress={() => { authentication() }} >
                            <SubmitBotton title={"Send Request"} loadingStaus={loading} />
                        </TouchableOpacity>


                        <View style={{ flexDirection: "row", marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                            <Text style={{ color: "white", }}>  OR  </Text>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                        </View>



                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <GradiateText title={t('Login Instead')} />
                        </TouchableOpacity>




                    </View>

                </BackGround>
            </KeyboardAvoidingView>
        )
    } catch (err) {

        <Errorhandling />
    }
}

export default ForgetPassword

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
})


