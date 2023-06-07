
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

const OtpScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [error, seterrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const { loginData } = useSelector(state => state.loginReducer);

    const authentication = async () => {


        navigation.push('OtpScreen')
     


    }


    const { t, i18n } = useTranslation();

    try {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={styles.container}>
                <BackGround>
                <BackBottonHeader logoHide ={true} updateSingleCategory={(text) => {  navigation.push('Login') }} />


                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <DynamicAppLogo style={{ width: normalize(120), height: normalize(120)}} imageStyle={{ borderRadius: 10 }} />

                      
                          <Text style={globalStyles.loginHeading}><Text>Enter OTP</Text></Text>
                        <Text style={globalStyles.loginTitle}><Text>Enter the OTP sent to your mail</Text></Text>

                       


               


                       

                        <TouchableOpacity disabled={true} onPress={() => { authentication() }} >
                            <SubmitBotton title={"Verify"} loadingStaus={loading} />
                        </TouchableOpacity>


                      


                        <TouchableOpacity onPress={() =>  navigation.push('Login')}>
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

export default OtpScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
})


