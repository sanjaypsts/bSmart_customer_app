

import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';
import { normalize } from './appSize';
import { APPCOLORS } from './appColors';



// header icons

export const MenuBotton = ({ }) => {
  return (
    // <View style={styles.bottonStyle}>
      <Ionicons name="menu" size={normalize(28)} color="white" />
    // </View>
  )
}

export const NotificationBotton = ({ }) => {
  return (
    // <View style={styles.bottonStyle}>
      <Ionicons name="notifications-outline" size={normalize(25)} color="white" />
    // </View>
  )
}

export const BackBotton = ({ }) => {
  return (

      <Ionicons name="md-chevron-back" size={normalize(30)} color={APPCOLORS.appTextColor} />

  )
}

export const LanguageBotton = ({ }) => {
  return (
  
      <Ionicons name="language-sharp" size={normalize(25)} color="white" />
  
  )
}





const styles = StyleSheet.create({

  bottonStyle: {
    backgroundColor: "#444748", padding: 12, borderRadius: 15, justifyContent: "center", alignItems: 'center'
  },
  bottomIcon: {

    padding: 15, borderRadius: 10, justifyContent: "center", alignItems: 'center'

  }

})
