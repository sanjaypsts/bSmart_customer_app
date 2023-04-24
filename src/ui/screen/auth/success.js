import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import { useTranslation } from 'react-i18next';
import { SubmitBotton, globalStyles } from '../../helper/globalStyle';
import { IMAGES } from '../../globalImage';
import { normalize } from '../../helper/size';

import BackBottonHeader from '../../component/header/dashboardHeader';


const Success = ({navigation}) => {
    const onChangeChild = (updatedValue) => {
        navigation.push('Login')
      };
    
    
    const { t, i18n } = useTranslation();
    return (
        <BackGround>
        <BackBottonHeader  logoHide ={true} updateSingleCategory={(text) => { onChangeChild(false) }} />

            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Image style={[{ width: normalize(150), height: normalize(150), }]} source={IMAGES.Thanks} />

                <Text style={globalStyles.loginHeading}><Text>{t('login.thanks')}</Text></Text>
                <Text style={globalStyles.loginTitle}><Text>{t('login.thanks_descripton')}</Text></Text>
                <TouchableOpacity style={{marginVertical:50}} onPress={() => { onChangeChild() }} >
                            <SubmitBotton title={"Back to Login"}  />
                        </TouchableOpacity>

            </View>
        </BackGround>
    )
}

export default Success

const styles = StyleSheet.create({})