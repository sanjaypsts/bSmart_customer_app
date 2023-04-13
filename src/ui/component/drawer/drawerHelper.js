import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartBotton } from '../../custumsIcons';
import { IMAGES } from '../../globalImage';
import { normalize } from '../../helper/size';
import { COLORS } from '../../helper/color';






export const DrawerListButton = ({ imageSource, title }) => {
    return (
        <LinearGradient
            colors={['#00A298', '#0155A0']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
               flexDirection: "row", alignItems: "center", justifyContent: "center",
                shadowColor: "#329BFF",height:60,
                marginTop:10,padding:0.8,borderRadius: 10,
                // shadowOffset: {
                //     width: 0, 
                //     height: 7,
                // },
                // shadowOpacity: 0.30,
                // shadowRadius: 1.51,

                // elevation: 2,
            }}
        >
      <View style={{flex:1,height:"100%",backgroundColor:COLORS.appLightColor, borderRadius: 10, flexDirection: "row",alignItems:"center",padding:10}}>
        <View style={{backgroundColor:COLORS.appColor,borderRadius:50, width: normalize(35), height: normalize(35),justifyContent:"center",alignItems:"center",marginRight: 15,}}>

      <Image style={[{ width: normalize(20), height: normalize(20),  }]} source={imageSource} />
        </View>

      <Text style={{ color:COLORS.appOppsiteTextColor, fontSize: normalize(13) }}>{title}</Text>
      </View>
     
        </LinearGradient>

    )
}


// export const DrawerListButton = ({ imageSource, title }) => {
//     return (
//         <LinearGradient
//             colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
//             start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
//             style={{
//                 backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "center",
//                 shadowColor: "#329BFF", marginTop: 20,
//                 borderRadius: 15,
//                 shadowOffset: {
//                     width: 0,
//                     height: 7,
//                 },
//                 shadowOpacity: 0.43,
//                 shadowRadius: 9.51,

//                 elevation: 10,
//             }}
//         >

//             <View style={{ backgroundColor: "#202020", width:"100%",height:60, borderRadius: 8, alignItems: "center", flexDirection: "row", }}>
//                 <Image style={[{ width: normalize(20), height: normalize(20), marginRight: 15 }]} source={IMAGES.No_order} />
//                 <View>
//                     <Text style={{ color: "white", fontSize: normalize(20) }}>Credits</Text>
                  

//                 </View>
//             </View>
//         </LinearGradient>

//     )
// }
