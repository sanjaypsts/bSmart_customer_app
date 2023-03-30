import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackGround from '../backgroundImage'
import BackBottonHeader from '../header/dashboardHeader'
import { Divider, globalStyles } from '../../helper/globalStyle'
import { useTranslation } from 'react-i18next'

const Address = ({navigation}) => {
    const { t, i18n } = useTranslation();

  return (
    <BackGround>
          <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />
          <Text style={globalStyles.appTitle}>{t('Address.Address')}</Text>
          <Divider title={t('Address.view_addresses')}/>

          
    </BackGround>
  )
}

export default Address

const styles = StyleSheet.create({})