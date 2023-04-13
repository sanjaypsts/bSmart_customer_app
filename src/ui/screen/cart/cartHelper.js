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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import LoadingModal from '../../component/loading';
import { useTranslation } from 'react-i18next';




export const CartDivider = ({ imageSource, title }) => {
    return (
        <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-around", alignItems: "center", paddingHorizontal: 20 }}>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "30%" }}></View>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                <Image source={imageSource} style={{ width: 20, height: 20, borderRadius: 10 }} />
                <Text style={[globalStyles.cart_title,{  letterSpacing: 5 }]}> {title}</Text>

            </View>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "30%" }}></View>

        </View>

    )
}



export const ItemCartBox = (props) =>{
    const { title, price, weight, quantity, product_id,totalPrice,updatequantity} = props
    const [loading, setloading] = useState(false);
    const { loginData } = useSelector(state => state.loginReducer);
    // const [quantity1, setQuantity] = useState(quantity);
  


  
    const AddCategory = (params) => {
        setloading(true)

        let formData = new FormData();
        formData.append('customer_id', 1);
        formData.append('product_id', product_id);
        formData.append('quantity',params);
        apicallHeaderPost(formData, 'addCartDetail',loginData.data.token)
        .then(response => {
           
            setloading(false)
            if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
       
                updatequantity(response.data.data.data_list.quantity)

           
            } else {

            }

        }).catch(err => {
            console.log("err")
            setloading(false)




            if (err) {

            }
        })
    }
    const { t, i18n } = useTranslation();

  return (
<>
    {/* {quantity1 >= 1   && */}
    <>

    <LoadingModal loading={loading} setloading={setloading} />

    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center",width:"100%" }}>
        <View style={{width:'70%'}}>
          <Text style={globalStyles.cart_heading1}>{title}</Text>
           <Text style={globalStyles.cart_title2}>{weight}</Text>
         <Text style={globalStyles.cart_title2}>S$ {(price).toFixed(2)} </Text>
     </View>
     <View style={{width:'30%',alignItems:"flex-end"}} >



    {/* Add btn */}


     <View style={{ height: 35, borderColor: "white", borderWidth: 1, width: 90, backgroundColor:COLORS.appColor, flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 5, borderRadius: 50, }}>


        <LoadingModal loading={loading} setloading={setloading} />
          <View>
              { quantity >= 1 &&
                   <TouchableOpacity onPress={() => { AddCategory(parseInt(quantity) - 1,product_id) }} style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
                    <Text >-</Text>
                   </TouchableOpacity>
                 }
              </View>

                {  quantity <= 0 ?
                 <Text style={{ color: "white", fontSize: normalize(15) }}>{t('category.add')}</Text>
                    :
              <Text style={{ color: "white", fontSize: normalize(15) }}>{quantity}</Text>

                      }
            <TouchableOpacity onPress={() => { AddCategory(parseInt(quantity) + 1) }} style={{ width: 25, height: 25, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
                <Text >+</Text>
            </TouchableOpacity>

                  </View>

{/* end Add btn */}

     <Text style={[globalStyles.cart_title2,]}>S$ {(totalPrice).toFixed(2) }</Text>
     </View>
   </View>
   <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical:10 }}></View>

   </>
   {/* } */}

   </>
  )


}


// export const ItemCartBox = (props) => {
//     const {title,price,weight, quantity, product_id,updateCalculate } = props

//     const [quantity1, setQuantity] = useState(quantity);
//     let totalValue = (price * quantity1)


//     return (
//         <>
   
     
 
        
    
//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center",width:"100%" }}>
//                 <View style={{width:'70%'}}>
//                     <Text style={globalStyles.cart_heading1}>{title} {quantity}</Text>
//                     <Text style={globalStyles.cart_title}>{weight}</Text>
//                     <Text style={globalStyles.cart_title2}>S$ {(price).toFixed(2)} </Text>

//                 </View>

//                 <View style={{width:'30%',alignItems:"flex-end"}} >
//                     <AddBotton2 quantity={quantity1} product_id={product_id} updatequantity={(curentQty) => {setQuantity(curentQty),updateCalculate(curentQty)}} />
//                     <Text style={[globalStyles.cart_title2,]}>S$ {(price * quantity1 != 'NaN' ?  price : price * quantity)}</Text>
//                 </View>
//             </View>
//             <View style={{ height: 1, backgroundColor: "#8E8E8E", marginVertical:10 }}></View>



//             </>
          

//     )
// }




// // Add btn
// export const AddBotton2 = (props) => {
//     const dispatch = useDispatch()

//     const { quantity, product_id, updatequantity } = props

//     console.log(quantity, product_id,"quantity, product_id, updatequantity")
//     const [quantity1, setQuantity] = useState(quantity);
//     const [totalquantity, settotalquantity] = useState("");
//     const { loginData } = useSelector(state => state.loginReducer);
//     const [loading, setloading] = useState(false);
 
//     const AddCategory = (params) => {
//    console.log("demo")
//         let formData = new FormData();
//         formData.append('customer_id', 1);
//         formData.append('product_id', product_id);
//         formData.append('quantity',params);
//         apicallHeaderPost(formData, 'addCartDetail',loginData.data.token)
//         .then(response => {
//             console.log("demo",response)
//             setloading(false)
//             if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
//                 console.log("Add")
//                 updatequantity(response.data.data.data_list.quantity)
//                 setQuantity(response.data.data.data_list.quantity)
           
//             } else {

//             }

//         }).catch(err => {
//             console.log("err")
//             setloading(false)




//             if (err) {

//             }
//         })
//     }


//     return (

//         <View style={{ height: 35, borderColor: "white", borderWidth: 1, width: 90, backgroundColor: "#666C72", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 5, borderRadius: 50, }}>


//                 <View>
//                 {quantity1 >= 1 &&
//                     <TouchableOpacity onPress={() => { AddCategory(quantity1 - 1) }} style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
//                         <Text >-</Text>
//                     </TouchableOpacity>
//                 }
//             </View>

//             {quantity1 <= 0 ?
//                 <Text style={{ color: "white", fontSize: normalize(15) }}>{"ADD"}</Text>
//                 :
//                 <Text style={{ color: "white", fontSize: normalize(15) }}>{quantity1}</Text>

//             }
//             <TouchableOpacity onPress={() => { AddCategory(quantity1 + 1) }} style={{ width: 25, height: 25, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
//                 <Text >+</Text>
//             </TouchableOpacity>

//         </View>

       




//     )
// }




