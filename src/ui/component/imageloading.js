import React,{useState} from "react";
import { Text,ImageBackground,View,ActivityIndicator, Image } from "react-native";
import { IMAGES } from "../globalImage";
import { normalize, wW } from "../helper/size";



const Imagewithloader=(props)=>{
    const {imageurl,styles,...restOfProps}=props

    const [imageloading,setimageloading]=useState(false)
   // const [currentdate, setcurrentdate] = useState(new Date())
    return (
        <View>
            <ImageBackground source={imageurl} onLoadStart={() =>  setimageloading(true) } onLoad={()=>{}} onLoadEnd={() =>  setimageloading(false) } style={[{ width: wW / 6, height: wW / 6, borderRadius: 20,justifyContent:'center' },styles]} 
            {...restOfProps} >
            {imageloading == true && 
            
            // <ActivityIndicator size={'small'} style={{ }} />
            <Image resizeMode="contain" source={IMAGES.AppLogo} style={{ width: "100%", height: "100%",  }}   imageStyle={{borderRadius: 20}}/>
            
            }
           </ImageBackground>
        </View>
    ) 

}
export default Imagewithloader




