import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { App_text_styles } from '../helper/appText'

const ErrorHandle = ({error_message}) => {
    const showText = error_message == undefined ||  error_message == null ||  error_message == " " || error_message < 0  ? "Somthing Went Wrong" : error_message
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={App_text_styles.ErrorHeading}>{showText}</Text>
    </View>
  )
}

export default ErrorHandle

const styles = StyleSheet.create({})