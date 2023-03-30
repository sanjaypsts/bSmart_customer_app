import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { ItemCartBox, CartDivider } from './cartHelper'
import { IMAGES } from '../../globalImage'
import { COLORS } from '../../helper/color'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next'
import { CartBox, Divider, globalStyles, SubmitBotton } from '../../helper/globalStyle'
import { useState } from 'react'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import LoadingModal from '../../component/loading'

const Cart = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [Data, setData] = useState([]);
  const { loginData } = useSelector(state => state.loginReducer);
  const [loading, setloading] = useState(false);

  const [Subtotal, setSubtotal] = useState(0);
  const [Grandtotal, setGrandtotal] = useState(0);
  const [totalTax, settotalTax] = useState(0);
  const [deliveryAmt, setdeliveryAmt] = useState(0);




  useEffect(() => {
    setloading(true)
    setSubtotal(0)
    setGrandtotal(0)
    settotalTax(0)
    setData([])
    getData()

  }, [])


  const getData = () => {



    apicallHeaderPost({ 'customer_id': 84 }, 'getCartDetail', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
          setData(response.data.data.data_list)

          const data = response.data.data.data_list
          const total_Price = (data.reduce((a, v) => a = a + v.total_price_without_tax, 0))
          const total_Price_with_Tax = (data.reduce((a, v) => a = a + v.total_price_with_tax, 0))
          setdeliveryAmt(response.data.data.delivery_charge)

          setSubtotal(total_Price)
          setGrandtotal(total_Price_with_Tax)
          settotalTax(total_Price_with_Tax - total_Price - response.data.data.delivery_charge)

        } else {

        }

      }).catch(err => {
        setloading(false)



        if (err) {

        }
      })
  }





  return (
    <BackGround>
      <LoadingModal loading={loading} setloading={setloading} />

      <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />
      <Text style={globalStyles.appTitle}>{t('cart.cart')}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>


        <CartDivider imageSource={IMAGES.ItemsImage} title={'ITEMS'} />
        <CartBox>
          {Data && Data.length > 0 &&
            Data.map((i, index) => (
              <ItemCartBox title={i.product_name} price={i.standard_price} weight={i.unit_name} quantity={i.quantity} product_id={i.product_id} updateCalculate={() => getData()} />
            ))}
          <TouchableOpacity onPress={() => {navigation.push('SingleCategory')}} style={{ flexDirection: 'row', alignItems: "center", width: "100%", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', alignItems: "center", }}>
              <Image resizeMode="contain" source={IMAGES.Shopping_cart} style={{ width: 30, height: 30, borderRadius: 10 }} />
              <Text style={{ color: "white" }}>  Add more products</Text>
            </View>

            <View>
              <Ionicons name="chevron-forward" size={normalize(25)} color="white" />
            </View>

          </TouchableOpacity>
        </CartBox>



        <CartDivider imageSource={IMAGES.billImage} title={'SUMMARY '} />

        <CartBox>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Subtotal"}</Text>
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>$ {Subtotal}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
              <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Tax</Text>
            </View>
            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>$ {totalTax}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image resizeMode='contain' source={IMAGES.truck} style={{ width: 18, height: 18, borderRadius: 10 }} />
              <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Delivery</Text>
            </View>
            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>$ {deliveryAmt}</Text>
          </View>
          <View style={{ backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10 }}></View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Grand total"}</Text>
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>$ {Grandtotal}</Text>
          </View>
        </CartBox>

        <CartDivider imageSource={IMAGES.billImage} title={'CONTACT '} />


        <CartBox>
          {/* <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}}>

           
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>  Select Contact</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Customer 4"}</Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>+65 654987321</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward" size={normalize(25)} color="white" />
            </View>

          </View>
        </CartBox>



        <CartDivider imageSource={IMAGES.billImage} title={'PAYMENT MODE '} />

        <CartBox>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Cash"}</Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>Balance Credit: $512</Text>
            </View>
            <View>
              {/* <Ionicons name="chevron-forward" size={normalize(25)} color="white" /> */}
            </View>

          </View>
        </CartBox>


        <View style={{ height: 100, width: wW, justifyContent: "center", right: wW / 20, }}>

          <TouchableOpacity>
            <SubmitBotton title={"Place Order"} loadingStaus={false} />
          </TouchableOpacity>
        </View>

      </ScrollView>


    </BackGround>
  )
}

export default Cart

const styles = StyleSheet.create({})