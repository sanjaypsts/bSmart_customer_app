import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Background from '../../ui/helper/background'
import ErrorHandle from '../ErrorHandling/error'
import { AppLogo } from '../helper/appSvg'
import { normalize } from '../helper/appSize'
import { LoginInput } from './authHelper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { App_text_styles } from '../helper/appText'
import { IMAGES } from '../helper/appImages'
import { SubmitBotton } from '../helper/globalStyle'
import apicall from '../../Data/apicall/apicall'
import { useDispatch, useSelector } from 'react-redux'
import { Relogin } from '../../Data/redux/auth/actions'


const Login = () => {
    const dispatch = useDispatch()

    let { identifyData ,userDetails} = useSelector(state => state.loginReducer);
   


    try {
        let { t } = useTranslation();
        const [loading, setLoading] = useState(false);

        const [InputData, setInputData] = useState([
            {
                id: 1,
                paramsName: "login_email",
                imageSource: IMAGES.emailIcon,
                value: "cuswms@gmail.com",
                maxLength: 20,
                keyboardType: "email-address",
                placeHolder: t('login.email'),
                error: false,
                error_message: "somthing"
            },
            {
                id: 2,
                paramsName: "password",
                imageSource: IMAGES.PassIcon,
                value: "Admin123@",
                maxLength: 20,
                keyboardType: "default",
                placeHolder: "password",
                error: false,
                error_message: ""
            },

        ]);



        const authentication = async () => {
            let temp = InputData.map((item) => {
                if ("login_email" === item.paramsName) {
                    return { "login_email": item.value };
                } else {
                    return { "password": item.value };
                }

            })
            let merged = { ...temp[0], ...temp[1] };


            setLoading(true)


            apicall(merged, 'mcustomerLogin')
                .then(response => {
                    setLoading(false)
                    if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                        dispatch(Relogin(response.data))

                    } else {

                    }
                }).catch(err => {
                    setLoading(false)

                    let ErrorHandle = InputData.map((item) => {
                        if ("login_email" === item.paramsName) {
                            return { ...item, error:true,error_message:""};
                        }else{
                            return { ...item, error:true,error_message:err.response.data.message};
                        }
                    
                    })
                    setInputData(ErrorHandle);

                    if (err.response.status == 401) {
                    }
                 
                })
        }







        return (

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={{ flex: 1 }}>
                <Background>
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <AppLogo width={normalize(144)} height={normalize(144)} />
                        <Text style={App_text_styles.LoginHeading}>{t('login.welcome')}</Text>
                        <Text style={App_text_styles.LoginTitle}>{t('login.login_descripton')}</Text>
                        <LoginInput InputValue={InputData} updateMasterState={(text) => { setInputData(text); }} />


                        <TouchableOpacity style={{ marginVertical: normalize(20), alignSelf: "flex-end" }}>
                            <Text style={App_text_styles.forgetPass} >{t('login.forgot_password')}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity disabled={loading} onPress={() => authentication()}>
                            <SubmitBotton title={t('login.login')} loadingStaus={loading} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                            <Text style={{ color: "white", }}>  {t('login.or')}  </Text>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                        </View>

                        
                    </View>


                </Background>
            </KeyboardAvoidingView>

        )
    } catch (error) {

        <ErrorHandle error_message={error} />

    }
}

export default Login

const styles = StyleSheet.create({})