// import { Image, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { UPLOAD_IMAGE_PATH } from '../../config'

// const DynamicAppLogo = () => {
//     return (
//         <Image resizeMode="contain" source={{ uri: 'https://wms.demopsts.comBSmart/customer_applogo.png'/* `${UPLOAD_IMAGE_PATH + data.logourl}` */ }} style={{ width: 130, height: 130 }} />
//     )
// }

// export default DynamicAppLogo

// const styles = StyleSheet.create({})

import React,{useState} from "react";
import { Text,ImageBackground,View,ActivityIndicator, Image } from "react-native";
import { wW } from "./helper/size";
import { useSelector } from "react-redux";
import { UPLOAD_IMAGE_PATH } from '../../config'



const DynamicAppLogo=(props)=>{
  const { appdata } = useSelector(state => state.appDatareducer);

    const {styles,...restOfProps}=props

    const [imageloading,setimageloading]=useState(false)
   // const [currentdate, setcurrentdate] = useState(new Date())
    return (
        <View>
            <ImageBackground source={{ uri: `${UPLOAD_IMAGE_PATH + appdata.logourl}`  }} onLoadStart={() =>  setimageloading(true) } onLoad={()=>{}} onLoadEnd={() =>  setimageloading(false) } style={[{ width: wW / 6, height: wW / 6, borderRadius: 20,justifyContent:'center' },styles]} 
            {...restOfProps} >
            {imageloading == true && 
            
            <ActivityIndicator size={'small'} style={{ }} />
           
            
            }
           </ImageBackground>
        </View>
    ) 

}
export default DynamicAppLogo




