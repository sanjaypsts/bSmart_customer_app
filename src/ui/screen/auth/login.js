
import { View, Text, StyleSheet,  TouchableOpacity, KeyboardAvoidingView,  Image, Platform } from 'react-native';
import React, {  useState } from 'react'
import BackGround from '../../component/backgroundImage'
import { AppLogo } from '../../globalSvg'
import { normalize } from '../../helper/size'
import Errorhandling from '../../errorHandle/errorhandling'
import { LoginInput } from './loginHelper';
import { IMAGES } from '../../globalImage';
import { useDispatch } from 'react-redux';
import { Relogin } from '../../../stateManage/auth/actions';
import apicall from '../../../stateManage/apicall';
import { useTranslation } from "react-i18next";
import { globalStyles, GradiateText, SubmitBotton } from '../../helper/globalStyle';




const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('cuswms@gmail.com');
    const [password, setPassword] = useState('Admin123@');
    const [error, seterrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    // const [InputData, setInputData] = useState([
    //     {
    //         id: 1,
    //         params:"login_email",
    //         icon: IMAGES.emailIcon,
    //         title: "email",
    //         value: "",
    //         textLength: 50,
    //         keyboardType: "email-address",
    //         error: false,
    //         errorMessage: ''
    //     },
    //     {
    //         id: 2,
    //         params:"password",
    //         icon: IMAGES.PassIcon,
    //         title: "password",
    //         value: "",
    //         textLength: 50,
    //         keyboardType: "email-address",
    //         error: false,
    //         errorMessage: '',
    //         passwordEye:true


    //     }
    // ]);



    const authentication = async () => {
        setLoading(true)
        apicall({ 'login_email': username, 'password': password },'mcustomerLogin')
            .then(response => {
                setLoading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    dispatch(Relogin(response.data))
                } else {

                }
            }).catch(err => {
                setLoading(false)
                if (err.response.status == 401) {
                }
                if (err) {
                    seterrorMessage(err.response.data.message)

                }
            })
    }


    const { t, i18n } = useTranslation();
    try {

        return (

            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={styles.container}>
                <BackGround>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <AppLogo width={normalize(120)} height={normalize(120)} />

                        {/* welcome title */}
                        <Text style={globalStyles.loginHeading}>{t('login.welcome')}</Text>
                        <Text style={globalStyles.loginTitle}>{t('login.login_descripton')}</Text>


                        {/* input box */}
                        <View style={{ width: "100%", marginVertical: 30 }} >
                            <LoginInput imageSource={IMAGES.emailIcon} title={t('login.email')} value={username} textLength={50} keyBoardType={"email-address"} updateMasterState={(text) => { setUsername(text); seterrorMessage("") }} err={error} />
                            <View style={{ marginVertical: 5 }}></View>
                            <LoginInput imageSource={IMAGES.PassIcon} title={t('login.password')} value={password} textLength={50} keyBoardType={"default"} updateMasterState={(text) => { setPassword(text); seterrorMessage("") }} err={error} passwordEye={true} />
                        </View>

                        {/* ForgetPassword */}
                        <TouchableOpacity onPress={() => navigation.push('ForgetPassword')} style={{ alignSelf: "flex-end" }}><Text style={{ color: "white", marginBottom: 30, }}>{t('login.forgot_password')}</Text></TouchableOpacity>

                        {/* login Botton */}
                        <TouchableOpacity disabled={loading} onPress={() => { authentication() }} >
                            <SubmitBotton title={t('login.login')} loadingStaus={loading} />
                        </TouchableOpacity>


                        {/* divider */}
                        <View style={{ flexDirection: "row", marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                            <Text style={{ color: "white", }}>  {t('login.or')}  </Text>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                        </View>

                        {/* Google login */}
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: "white", borderRadius: 10, justifyContent: "center", alignItems: 'center', flexDirection: "row", paddingHorizontal: 15, }}>
                            <Image style={[{ width: normalize(18), height: normalize(20), }]} source={IMAGES.GoogleIcon} />
                            <Text style={{ color: "white", margin: 10, fontSize: normalize(15), fontWeight: '500' }}>{t('login.google')}</Text>
                        </TouchableOpacity>


                        {/* sign up  */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
                            <Text style={{ color: "white" }}>{t('login.dont_have_an_account')} </Text>
                            <TouchableOpacity onPress={() => navigation.push('Signup')}>
                                <GradiateText title={t('login.sign_Up')} />
                                {/* <Text style={{ color: "white" }}>{t('login.sign_Up')}</Text> */}
                            </TouchableOpacity>
                        </View>


                    </View>

                </BackGround>
            </KeyboardAvoidingView>
        )
    } catch (err) {

        <Errorhandling />
    }
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
})


