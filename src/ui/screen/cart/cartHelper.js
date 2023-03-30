import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UPLOAD_IMAGE_PATH } from '../../../../config';
import { normalize, wW } from '../../helper/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FilterBotton } from '../../custumsIcons';
import { COLORS } from '../../helper/color';
import { AddBotton } from '../category/categoryHelper';
import { globalStyles } from '../../helper/globalStyle';
import { useState } from 'react';




export const CartDivider = ({ imageSource, title }) => {
    return (
        <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-around", alignItems: "center", paddingHorizontal: 20 }}>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "30%" }}></View>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                <Image source={imageSource} style={{ width: 20, height: 20, borderRadius: 10 }} />
                <Text style={{ color: "white", letterSpacing: 5 }}> {title}</Text>

            </View>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "30%" }}></View>

        </View>

    )
}



export const ItemCartBox = (props) => {
    const {title,price, quantity, product_id,updateCalculate } = props

    const [quantity1, setQuantity] = useState(quantity);
    return (
        <>
   
     
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center",width:"100%" }}>
                <View style={{width:'70%'}}>
                    <Text style={globalStyles.cart_heading1}>{title}</Text>
                    <Text style={globalStyles.cart_title}>10 KG</Text>
                    <Text style={globalStyles.cart_title2}>$ {price}</Text>

                </View>

                <View style={{width:'30%',alignItems:"flex-end"}} >
                    <AddBotton quantity={quantity1} product_id={product_id} updatequantity={(curentQty) => {setQuantity(curentQty),updateCalculate(curentQty)}} />
                    <Text style={[globalStyles.cart_title2,]}>$ {price * quantity1}  </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical:10 }}></View>




            </>
          

    )
}




// export const ItemCartBox = ({ imageSource, title }) => {
//     return (
//         <View style={{
//             backgroundColor: "#46494F", alignItems: "center", marginVertical: 20,
//             shadowColor: "#000", borderColor: "white", borderWidth: 0.5, padding: 15,
//             borderRadius: 15,
            
//             shadowOffset: {
//                 width: 0,
//                 height: 7,
//             },
//             shadowOpacity: 0.43,
//             shadowRadius: 9.51,

//             elevation: 15,
//         }}>
//             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", }}>

//                 <View style={{ height: '100%' }}>
//                     <Text style={{ color: "white", fontWeight: "700", fontSize: normalize(18), }}>{"Carrots"}</Text>
//                     <Text style={{ color: "white", fontWeight: "300", fontSize: normalize(15), lineHeight: 30 }}>{"10 KG"}</Text>
//                     <Text style={{ color: "white", fontWeight: "400", fontSize: normalize(17) }}>{"$5"}</Text>

//                 </View>
//                 <View style={{ alignItems: "flex-end" }}>
//                     <AddBotton />
//                     <Text style={{ color: "white", fontWeight: "400", fontSize: normalize(17), marginTop: 8 }}>{"$5"} </Text>
//                 </View>
//             </View>
//             <View style={{ backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 20 }}></View>

//             <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", width: "100%", justifyContent: "space-between" }}>
//                 <View style={{ flexDirection: 'row', alignItems: "center", }}>
//                     <Image resizeMode="contain" source={imageSource} style={{ width: 30, height: 30, borderRadius: 10 }} />
//                     <Text style={{ color: "white" }}>  Add more products</Text>
//                 </View>

//                 <View>
//                     <Ionicons name="chevron-forward" size={normalize(25)} color="white" />
//                 </View>

//             </TouchableOpacity>





//         </View>

//     )
// }






