import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackGround from '../component/backgroundImage'

const Errorhandling = ({message}) => {
  return (
    <BackGround> 
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

      <Text style={{color:"white"}}>{message}</Text>
      </View>
      </BackGround> 
  )
}

export default Errorhandling

const styles = StyleSheet.create({})