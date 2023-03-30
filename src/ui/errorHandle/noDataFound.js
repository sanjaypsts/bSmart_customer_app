import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoDataFound = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
      <Text style={{color:'white'}}>No Data Found</Text>
    </View>
  )
}

export default NoDataFound

const styles = StyleSheet.create({})