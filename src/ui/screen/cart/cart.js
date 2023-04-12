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
import { CartBox, CheckedBox, Divider, globalStyles, SubmitBotton, UnCheckedBox } from '../../helper/globalStyle'
import { useState } from 'react'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import LoadingModal from '../../component/loading'
import { useFocusEffect } from '@react-navigation/native';
import { getContactName, getContactNumber } from '../../../stateManage/asynstorage/asyncStore'
import { ADDRESS_SET } from '../../../stateManage/userDetails/actions'
import { Category_SET } from '../../../stateManage/category/actions'
import Toast from 'react-native-simple-toast';

const Cart = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [Data, setData] = useState([]);
  const { loginData } = useSelector(state => state.loginReducer);
  const { contact_Data } = useSelector(state => state.userDetailsReducer);
  const { address_Data } = useSelector(state => state.addressReducer);
  const { USER_DATA } = useSelector(state => state.userdatareducer);



  const [loading, setloading] = useState(false);

  const [Subtotal, setSubtotal] = useState(0);
  const [Grandtotal, setGrandtotal] = useState(0);
  const [totalTax, settotalTax] = useState(0);
  const [deliveryAmt, setdeliveryAmt] = useState(0);
  const [Balance_Credit, setBalance_Credit] = useState(0);

  const [SelectMobileNumber, setSelectMobileNumber] = useState("Select Contact");
  const [SelectName, setSelectName] = useState("");

  const dispatch = useDispatch()




  // useEffect(() => {
  //   setloading(true)
  //   setSubtotal(0)
  //   setGrandtotal(0)
  //   settotalTax(0)
  //   setData([])
  //   getData()

  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      setloading(true)
      setSubtotal(0)
      setGrandtotal(0)
      settotalTax(0)
      setData([])
      getData()
      GetLocalData()

    }, [])
  );


  useEffect(() => {

    dispatch(ADDRESS_SET({ customer_unique_id: loginData.data.customer_shipping_address_alias_id.customer_unique_id }, "mgetParticularCustomershippingAddressDetails", loginData.data.token))


  }, [])

  useEffect(() => {
    dispatch(Category_SET("mgetCategoryDetails",loginData.data.token))



  })



  const GetLocalData = async () => {
    const getNumber = await getContactNumber();
    const getName = await getContactName();




    {
      getNumber != null && getNumber != undefined &&
        setSelectMobileNumber(getNumber)

    }

    {
      getName != null && getName != undefined &&
        setSelectName(getName)

    }

  }


  const getData = () => {





    apicallHeaderPost({ 'customer_id': USER_DATA.customer_unique_id }, 'getCartDetail', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
          setData(response.data.data.data_list)

          const data = response.data.data.data_list
          const total_Price = (data.reduce((a, v) => a = a + v.total_price_without_tax, 0))
          const total_Price_with_Tax = (data.reduce((a, v) => a = a + v.total_price_with_tax, 0))
          setdeliveryAmt(response.data.data.delivery_charge)
          setBalance_Credit(response.data.data.pending_amount)
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


  const Place_order = () => {


    setloading(true)
    let formData = new FormData();




    let ModifyReciveData = Data.map((item) => {
      return {
        product_id: item.product_id,
        batch_id: "",
        quantity: item.quantity,
        unit_id: item.unit_id,
        unit_price: item.standard_price,
        total_amount: item.total_price_with_tax,
        gross_amount: item.total_price_without_tax,
        tax_id: item.tax_id,
        tax_amount: (item.total_price_with_tax - item.total_price_without_tax)
      }
    });




    // const data = [{ "product_id": 6, "batch_id": "", "quantity": "1", "unit_id": 6, "unit_price": "5.00", "total_amount": "5.00", "gross_amount": "4.63", "tax_id": 2, "tax_amount": "0.37" }]



    formData.append('order_details', JSON.stringify(ModifyReciveData));
    formData.append('sub_total', Subtotal);
    formData.append('tax', totalTax);
    formData.append('order_total', Grandtotal);
    formData.append('order_notes', "test");
    formData.append('ordered_via', "Mobile");
    formData.append('delivery_notes_voice', "");
    formData.append('payment_mode_id', 1);

    formData.append('mobile_number', SelectMobileNumber);
    formData.append('payment_date', "2001-01-01");





    apicallHeaderPost(formData, 'mcreateOrderDetails', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.status == 201 && response.data.status == true || response.data.status == 'true') {
          navigation.push('PaymentSuccess')
        } else {

        }

      }).catch(err => {
        setloading(false)



        if (err) {
   
          const data = [err.response.data.data]


     
          for (var i = 0; i < 1; i++) {
            for (var key in data[i]) {
              // console.log(data[i][key]);
              Toast.showWithGravity(data[i][key], Toast.LONG, Toast.BOTTOM);

            }
          }







          // for (var i = 0; i < peoples.length; i++) {
          //   for (var key in peoples[i]) {
          //     console.log(key + ' == ' + peoples[i][key]);
          //   }
          // }
        }
      })

  }



  return (
    <BackGround>
      <LoadingModal loading={loading} setloading={setloading} />

      <BackBottonHeader updateSingleCategory={() => { navigation.push("DashBoard") }} />
      <Text style={globalStyles.appTitle}>{t('cart.cart')}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>


        <CartDivider imageSource={IMAGES.ItemsImage} title={'ITEMS'} />
        <CartBox>
          {Data && Data.length > 0 &&
            Data.map((i, index) => (
              <ItemCartBox title={i.product_name} price={i.standard_price} weight={i.unit_name} quantity={i.quantity} product_id={i.product_id} totalPrice={i.total_price_with_tax} updatequantity={(data) => getData()} />
            ))}
          <TouchableOpacity onPress={() => { navigation.push('SingleCategory') }} style={{ flexDirection: 'row', alignItems: "center", width: "100%", justifyContent: "space-between" }}>
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
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>S$ {Subtotal.toFixed(2)}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
              <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Tax</Text>
            </View>
            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {totalTax.toFixed(2)}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image resizeMode='contain' source={IMAGES.truck} style={{ width: 18, height: 18, borderRadius: 10 }} />
              <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}> Delivery</Text>
            </View>
            <Text style={{ color: COLORS.appTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {deliveryAmt.toFixed(2)}</Text>
          </View>
          <View style={{ backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10 }}></View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Grand total"}</Text>
            <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>S$ {Grandtotal.toFixed(2)}</Text>
          </View>
        </CartBox>

        <CartDivider imageSource={IMAGES.personalcard} title={'CONTACT '} />



        <TouchableOpacity onPress={() => navigation.push('Contact')}>
          <CartBox>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image resizeMode='contain' source={IMAGES.ContactUser} style={{ width: normalize(35), height: normalize(35), borderRadius: 10, marginRight: 20 }} />

                <View>
                  {
                    SelectName != undefined && SelectName != null && SelectName != "" &&
                    <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{SelectName}</Text>
                  }
                  <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{SelectMobileNumber}</Text>
                </View>
              </View>

              <View>
                <Ionicons name="chevron-forward" size={normalize(25)} color="white" />
              </View>
            </View>
          </CartBox>
        </TouchableOpacity>




        {/* <CartBox>
          {contact_Data && contact_Data.length > 0 &&
            contact_Data.map((i, index) => (
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, }}>
                <View>
                  <Text style={globalStyles.heading}>{i.contact_name}</Text>
                  <Text style={globalStyles.title}>{i.contact_number}</Text>
                </View>
                <TouchableOpacity onPress={() => { setSelectMobileNumber(i.contact_number) }} style={{ flexDirection: "row", justifyContent: "center" }}>

                  {i.contact_number == SelectMobileNumber ?
                    <CheckedBox /> : <UnCheckedBox />

                  }


                </TouchableOpacity>
              </View>
            ))}
        </CartBox> */}



        <CartDivider imageSource={IMAGES.cardtick} title={'PAYMENT MODE '} />

        <CartBox>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>{"Cash"}</Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: normalize(16), }}>Balance Credit: S$ {(Balance_Credit).toFixed(2)}</Text>
            </View>
            <View>
              {/* <Ionicons name="chevron-forward" size={normalize(25)} color="white" /> */}
            </View>

          </View>
        </CartBox>


        <CartDivider title={'SHIPPING ADDRESS '} />

        <CartBox>
          {address_Data && address_Data.length > 0 &&
            address_Data.map((i, index) => (
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                <View>
                  <Text style={globalStyles.heading}>{"Shipping Address"}</Text>
                  <Text></Text>
                  <Text style={globalStyles.title}>{i.shipping_block_number} {i.shipping_street_drive_number}</Text>
                  <Text style={globalStyles.title}>{i.shipping_unit_number} - {i.shipping_postal_code}</Text>

                </View>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                </TouchableOpacity>


              </View>
            ))}
        </CartBox>




        <View style={{ height: 100, width: wW, justifyContent: "center", right: wW / 20, }}>

          <TouchableOpacity onPress={() => { Place_order() }}>
            <SubmitBotton title={"Place Order"} loadingStaus={false} />
          </TouchableOpacity>
        </View>

      </ScrollView>


    </BackGround>
  )
}

export default Cart

const styles = StyleSheet.create({})