import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import { useTranslation } from 'react-i18next';
import { globalStyles } from '../../helper/globalStyle';
import { IMAGES } from '../../globalImage';
import { normalize } from '../../helper/size';

const Success = () => {
    
    const { t, i18n } = useTranslation();
    return (
        <BackGround>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Image style={[{ width: normalize(150), height: normalize(150), }]} source={IMAGES.Thanks} />

                <Text style={globalStyles.loginHeading}><Text>{t('login.thanks')}</Text></Text>
                <Text style={globalStyles.loginTitle}><Text>{t('login.thanks_descripton')}</Text></Text>


            </View>
        </BackGround>
    )
}

export default Success

const styles = StyleSheet.create({})