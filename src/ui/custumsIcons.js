// import React from 'react';
// // Vector Icons
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Foundation from 'react-native-vector-icons/Foundation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// const Icon = ({ iconType, iconName, size, color, customStyle = {} }) => {
//  switch(iconType) {
//    case 'AntDesign':
//      return <AntDesign name={iconName} size={size} color={color} style={customStyle} />
//    case 'Entypo':
//      return <Entypo name={iconName} size={size} color={color} style={customStyle} />
//    case 'EvilIcons':
//      return <EvilIcons name={iconName} size={size} color={color} style={customStyle} />
//    case 'Feather':
//      return <Feather name={iconName} size={size} color={color} style={customStyle} />
//    case 'FontAwesome':
//      return <FontAwesome name={iconName} size={size} color={color} style={customStyle} />
//    case 'FontAwesome5':
//      return <FontAwesome5 name={iconName} size={size} color={color} style={customStyle} />
//    case 'Fontisto':
//      return <Fontisto name={iconName} size={size} color={color} style={customStyle} />
//    case 'Foundation':
//      return <Foundation name={iconName} size={size} color={color} style={customStyle} />
//    case 'Ionicons':
//      return <Ionicons name={iconName} size={size} color={color} style={customStyle} />
//    case 'MaterialIcons':
//      return <MaterialIcons name={iconName} size={size} color={color} style={customStyle} />
//    case 'MaterialCommunityIcons':
//      return <MaterialCommunityIcons name={iconName} size={size} color={color} style={customStyle} />
//    case 'Octicons':
//      return <Octicons name={iconName} size={size} color={color} style={customStyle} />
//    case 'Zocial':
//      return <Zocial name={iconName} size={size} color={color} style={customStyle} />
//    case 'SimpleLineIcons':
//      return <SimpleLineIcons name={iconName} size={size} color={color} style={customStyle} />
//    default:
//      return <MaterialIcons name={iconName} size={size} color={color} style={customStyle} />
//  }
// }

// export {Icon};




import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerBottom from './component/bottom';
import { IMAGES } from './globalImage';
import Feather from 'react-native-vector-icons/Feather';
import { normalize, wH, wW } from './helper/size';


// header icons


export const MenuBotton = ({ }) => {
  return (
    <Image resizeMode='contain' source={IMAGES.Menu} style={{ width:normalize(25), height:normalize(25), borderRadius: 10 }} />

    // <View style={styles.bottonStyle}>
      // <Icon name="menu" size={normalize(30)} color="white" />
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
    // <View style={styles.bottonStyle}>
      <Ionicons name="md-chevron-back" size={normalize(30)} color="white" />
    // </View>
  )
}

export const LanguageBotton = ({ }) => {
  return (
    <View style={styles.bottonStyle}>
      <Ionicons name="language-sharp" size={normalize(25)} color="white" />
    </View>
  )
}

export const FilterBotton = ({ backgroundColor}) => {
  return (
    <View style={[styles.bottonStyle,{backgroundColor:backgroundColor,paddingHorizontal:20}]}>
           <Feather name="filter" size={normalize(20)} color="white" />
    </View>
  )
}








// DrawerBottom

export const HomeBotton = ({ imageSource, title,iconColor,backgroundColor }) => {
  return (
    <View style={[styles.bottomIcon,{backgroundColor:backgroundColor,borderRadius:60}]}>
      <Image  resizeMode="contain"   tintColor={iconColor} style={[{ width: normalize(20), height: normalize(20), }]} source={imageSource} />


      {/* <Ionicons name="notifications-outline" size={normalize(25)} color="white" /> */}
      {/* <Text style={{ color: iconColor }} >{title}</Text> */}
    </View>
  )
}

// DashBoard

export const CartBotton = ({ }) => {
  return (
    <View style={[styles.bottonStyle]}>
      <Image style={[{ width: normalize(25), height: normalize(25), }]} source={IMAGES.OrderCart} />


    </View>
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
