import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { HorizontalSingleCategoryCard } from '../category/categoryHelper'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useEffect } from 'react'
import LoadingModal from '../../component/loading'
import { SubmitBotton, globalStyles } from '../../helper/globalStyle'
import { normalize, wW } from '../../helper/size'
import { IMAGES } from '../../globalImage'

const MostOrder = ({navigation}) => {
  const { loginData } = useSelector(state => state.loginReducer);
  const [SingleCategoryData, setSingleCategoryData] = useState([]);
  const [loading, setloading] = useState(false);

  const [TotalProduct, setTotalProduct] = useState(1);






  useEffect(() => {
    getData()

  },[])




  

  const getData = () => {
    setSingleCategoryData([])
    setloading(true)
    console.log("csdijcnhsd")

    apicallHeaderPost({customer_id:1},'mlastOrderBasedCustomerId',loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
          console.log("csdijcnhsd",response.data.data.order_details)
          setSingleCategoryData(response.data.data.order_details)
        } else {
        }
      }).catch(err => {
        setloading(false)
        if (err) {

        }
      })
  }





try{
  return (
   
    <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => {  navigation.goBack(null) }} />
        <Text style={globalStyles.appTitle}>{"Most Ordered"}</Text>

        <Text style={[globalStyles.heading,{marginTop:15}]}>{"1 items"}</Text>

        <ScrollView  >
          {SingleCategoryData && SingleCategoryData.length > 0 &&
            SingleCategoryData.map((i, index) => (
              <View key={index} >
                <HorizontalSingleCategoryCard imageSource={i.image_url} title={i.product_name} price={i.per_unit_price} weight={i.unit_name} quantity={i.quantity} product_id={i.product_id}  updateMasterState={(text) => { console.log("single") }}/>
              </View>
            ))}
        </ScrollView>

        <View style={{ position: "absolute", bottom: 40, marginHorizontal: wW / 20, alignItems: "flex-end", width: "100%" }}>

          <TouchableOpacity onPress={() => { navigation.push('Cart') }} style={{ height: 70, width: 65, borderRadius: 10, backgroundColor: "white", alignItems: "center", justifyContent: 'center' }}>
            <View>
              <Image resizeMode="contain" tintColor={"#333333"} style={[{ width: normalize(25), height: normalize(25), alignSelf: "center" }]} source={IMAGES.Cart} />

              <View style={{ position: "absolute", width: normalize(30), height: normalize(25) }}>
                <View style={{ backgroundColor: "red", width: normalize(18), height: normalize(18), alignSelf: "flex-end", borderRadius: 30, justifyContent: "center", alignItems: "center", bottom: normalize(5) }}>
                  <Text style={{ color: "white", fontSize: normalize(10) }}>{TotalProduct}</Text>
                </View>

              </View>
            </View>


            <Text style={[globalStyles.cart_title2, { color: "black" }]}>Cart</Text>
          </TouchableOpacity>

        </View>

    </BackGround>
  
)
}
catch{

}
}

export default MostOrder

const styles = StyleSheet.create({})