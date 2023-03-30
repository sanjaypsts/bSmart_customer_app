
// import React, { useEffect, useState } from 'react';
// import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import {  Relogin } from '../../../stateManage/auth/actions';
// import {useSelector, useDispatch} from 'react-redux';

// const Login = () => {
//     const dispatch = useDispatch()
//     const fetchLoginData = () => dispatch(Relogin({ 'login_email': username, 'password': password }));

//     const {loginData} = useSelector(state => state.loginReducer);
//     const [username, setUsername] = useState('customer@wms.com');
//     const [password, setPassword] = useState('Admin123@');
//     const [loading, setLoading] = useState(false);


//     const authentication = async () => {
//         setLoading(true)
//         fetchLoginData();

//         setLoading(false)

//     }


//     try {
//         return (
//             <View>
//                 <TextInput
//                     placeholder='Enter username'
//                     value={username}
//                     onChangeText={(text) => setUsername(text)}
//                 />
//                 {
//                     !loading &&

//                     <TextInput
//                         placeholder='Enter password'
//                         secureTextEntry={true}
//                         value={password}
//                         onChangeText={(text) => setPassword(text)}
//                     />
//                 }
//                 <TouchableOpacity onPress={() => authentication()} >
//                     <Text>
//                         submit
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     } catch {

//     }
// }

// export default Login

// const styles = StyleSheet.create({})

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
import { useTranslation } from "react-i18next";
import { globalStyles, GradiateText, SubmitBotton } from '../../helper/globalStyle';

const Login = ({ navigation }) => {
    const dispatch = useDispatch()



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, seterrorMessage] = useState('');
    const [loading, setLoading] = useState(false);



    const createAccount = async () => {
        setLoading(true)
        let formData = new FormData();
        formData.append('customer_name',name);
        formData.append('office_contact_number',contactNumber);
        formData.append('customer_email',email);
        apicall(formData, 'mcreateCustomerDetails')
            .then(response => {
                setLoading(false)
                if (response.data.status == true || response.data.status == 'true') {
                    console.log(response.data)
                    navigation.push('Success')
                } 
            }).catch(err => {
                setLoading(false)
                console.log(err)
                if (err.response.status == 400) {
                    seterrorMessage(err.response.data.message)
                }
                if (err) {

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
                        <AppLogo width={normalize(100)} height={normalize(100)} />

                        {/* create Account title */}
                        <Text style={globalStyles.loginHeading}><Text>{t('login.create_account')}</Text></Text>
                        <Text style={globalStyles.loginTitle}><Text>{t('login.sign_up_descripton')}</Text></Text>


                        {/* input */}
                        <View style={{ width: "100%", marginVertical: 30, }} >
                            <LoginInput imageSource={IMAGES.emailIcon} title={t('login.name')} value={name} updateMasterState={(text) => { setName(text); seterrorMessage("") }} err={error} />
                            <View style={{ marginVertical: 5 }}></View>

                            <LoginInput imageSource={IMAGES.Sms_tracking} title={t('login.email_address')} value={email} updateMasterState={(text) => { setEmail(text); seterrorMessage("") }} err={error} />
                            <View style={{ marginVertical: 5 }}></View>

                            <LoginInput imageSource={IMAGES.Contact} title={t('login.contact_number')} value={contactNumber} updateMasterState={(text) => { setContactNumber(text); seterrorMessage("") }} err={error} />
                            <View style={{ marginBottom: 8 }}></View>

                        </View>



                        <TouchableOpacity disabled={loading} onPress={() => { createAccount() }} >
                            <SubmitBotton title={"Create account"} loadingStaus={loading} />
                        </TouchableOpacity>


                        <View style={{ flexDirection: "row", marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                            <Text style={{ color: "white", }}>  {t('login.or')}  </Text>
                            <View style={{ height: 1, backgroundColor: "white", width: 60 }}></View>
                        </View>


                        <TouchableOpacity style={{ borderWidth: 1, borderColor: "white", borderRadius: 10, justifyContent: "center", alignItems: 'center', flexDirection: "row", paddingHorizontal: 15, }}>
                            <Image style={[{ width: normalize(18), height: normalize(20), }]} source={IMAGES.GoogleIcon} />
                            <Text style={{ color: "white", margin: 10, fontSize: normalize(15), fontWeight: '500' }}>Google</Text>
                        </TouchableOpacity>


                        {/* login  */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
                            <Text style={{ color: "white" }}>{t('login.already_have_an_account')} </Text>
                            <TouchableOpacity onPress={() => navigation.push('Login')}>
                                <GradiateText title={t('login.login')} />
                            </TouchableOpacity>
                        </View>





                    </View>

                </BackGround>
            </KeyboardAvoidingView>
        )
    } catch (err) {
        console.log(err
        );
        <Errorhandling />
    }
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
})


