import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './login'

const MainLogin = () => {
  return (
    <View style={{flex:1}}>
      <StatusBar animated={true} backgroundColor="white" barStyle={'dark-content'} />
      <Login/>
    </View>
  )
}

export default MainLogin

const styles = StyleSheet.create({})