import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { HorizontalSingleCategoryCard, HorizontalSingleWithoutAdd } from '../category/categoryHelper'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useEffect } from 'react'
import LoadingModal from '../../component/loading'
import { CartBox, SubmitBotton, globalStyles } from '../../helper/globalStyle'
import { normalize, wW } from '../../helper/size'
import Toast from 'react-native-simple-toast';
import { COLORS } from '../../helper/color'
import Imagewithloader from '../../component/imageloading'
import { UPLOAD_IMAGE_PATH } from '../../../../config'
import { CartDivider } from '../cart/cartHelper'
import { IMAGES } from '../../globalImage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getContactName, getContactNumber, storeContactNumber, storeName } from '../../../stateManage/asynstorage/asyncStore'
import { SingleCategorySET } from '../../../stateManage/add_product/actions'

const LastOrder = ({ navigation }) => {
  const dispatch = useDispatch()

  const { loginData } = useSelector(state => state.loginReducer);

  const { address_Data } = useSelector(state => state.addressReducer);
  const { contact_Data } = useSelector(state => state.userDetailsReducer);
  const { single_category_Data } = useSelector(state => state.single_categoryReducer);


  const [loading, setloading] = useState(false);


  // const [Subtotal, setSubtotal] = useState(0);
  // const [Grandtotal, setGrandtotal] = useState(0);
  // const [totalTax, settotalTax] = useState(0);
  const [mobileNumber, setmobileNumber] = useState(0);
  const [ValidData, setValidData] = useState([]);

  const [orderID, setorderID] = useState("");


    // Total VAlue 
    const [subTotal, setsubTotal] = useState("");
    const [TaxAmount, setTaxAmount] = useState("");
    const [Grandtotal, setGrandtotal] = useState("");


  const [SelectMobileNumber, setSelectMobileNumber] = useState("Select Contact");
  const [SelectName, setSelectName] = useState("");

  useEffect(() => {
    getData()
    ContactDATaSEt()

  }, [])




  const ContactDATaSEt = async () => {
    await storeContactNumber(contact_Data[0].contact_number)
    await storeName(contact_Data[0].contact_name)

    // get data

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
    setValidData([])
    setloading(true)


    apicallHeaderPost({ customer_id: loginData.data.customer_shipping_address_alias_id.id }, 'mlastOrderBasedCustomerId', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
          // setSubtotal(response.data.data.sub_total)
          // setGrandtotal(response.data.data.order_total)
          // settotalTax(response.data.data.tax)
          // setmobileNumber(response.data.data.mobile_number)

          // setValidData(response.data.data.order_details)
 

          setorderID(response?.data?.data?.id)
          setValidData(response?.data?.data.order_details)
          setsubTotal(response?.data?.data.sub_total)
          setTaxAmount(response?.data?.data.tax)
          setGrandtotal(response?.data?.data.order_total)
        } else {
        }
      }).catch(err => {
        setloading(false)
        if (err) {

        }
      })
  }





  const CardForSingleCategory = ({ index, item }) => {


    return (
      <View key={index} style={{
        backgroundColor: COLORS.appLightColor, height: 100, flexDirection: "row", alignItems: "center", marginTop: 20,
        shadowColor: "#000", borderColor: "white", borderWidth: 1, padding: 10,
        borderRadius: 15,
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
      }}>


        <Imagewithloader imageurl={{ uri: `${UPLOAD_IMAGE_PATH + item.image_url}` }} style={{ width: normalize(70), height: normalize(70), marginRight: 10 }} imageStyle={{ borderRadius: 20 }} />

        <View style={{ width: "50%" }}>
          <Text numberOfLines={1} style={{ color: COLORS.appOppsiteTextColor, fontWeight: "700", fontSize: normalize(13), }}>{item.product_name}</Text>
          <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "700", fontSize: normalize(5), }}></Text>

          <Text style={{ color: COLORS.appOppsiteTextColor }}>{item.unit_name}</Text>

        </View>


        <View style={{ flexDirection: "row", borderRadius: 20, }}>


          <TouchableOpacity onLongPress={() => changeEditValue(0, item.id, index)} disabled={item.quantity <= 0} onPress={() => { changeEditValue(item.quantity - 1, item.id, index) }} style={{ width: 30, height: 30, backgroundColor: item.quantity <= 0 ? COLORS.transParent : COLORS.appColor, borderRadius: 20, justifyContent: "center", alignItems: "center" }} >
            <Text style={{ color: COLORS.appTextColor }}>-</Text>
          </TouchableOpacity>


          <TextInput onChangeText={(text) => changeEditValue(parseInt(text), item.id, index)} value={JSON.stringify(item.quantity)} keyboardType="number-pad" style={{ width: 30, height: 30, fontSize: 15, textAlign: "center", borderRadius: 10, paddingVertical: 0, color: COLORS.appOppsiteTextColor }} />
          <TouchableOpacity onLongPress={() => changeEditValue(item.quantity + 10, item.id, index)} onPress={() => { changeEditValue(item.quantity + 1, item.id, index) }} style={{ width: 30, height: 30, backgroundColor: COLORS.appColor, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: COLORS.appTextColor }}>+</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }



  const changeEditValue = (value, id, key) => {
    setloading(true)

    const value2 = value ? value : 0
    const updatedData = [...ValidData];
    updatedData[key].quantity = value2;
    const filteredData = updatedData.filter(item => item.quantity > 0)
    // setValidData(filteredData)
    let formData = new FormData();
    formData.append('customer_alias_id', loginData.data.customer_shipping_address_alias_id.id)
    formData.append('order_details', JSON.stringify(filteredData));

    apicallHeaderPost(formData, 'addCartLocalStorageValidate', loginData.data.token)
      .then(response => {

        setloading(false)


        if (response?.status == 200 && response?.data?.status == true || response?.data?.status == 'true') {

          setValidData(response?.data?.data.order_details)
          setsubTotal(response?.data?.data.sub_total)
          setTaxAmount(response?.data?.data.tax)
          setGrandtotal(response?.data?.data.order_total)

        } else {

        }

      }).catch(err => {

        setloading(false)

        // console.log("err", err.response.data)


        if (err) {

        }
      })






  }


  
  const Place_order = () => {
    setloading(true)
    // console.log("haii", subTotal)
    let formData = new FormData();
    formData.append('order_details', JSON.stringify(ValidData));
    formData.append('sub_total', subTotal.toFixed(2));
    formData.append('tax', TaxAmount.toFixed(2));
    formData.append('order_total', Grandtotal.toFixed(2));
    formData.append('order_notes', "-");
    formData.append('ordered_via', "Mobile");
    formData.append('payment_mode_id', 1);
    formData.append('mobile_number', SelectMobileNumber);
    formData.append('payment_date', "2001-01-01");
    formData.append('delivery_notes_voice', "")

 

    // console.log()

    apicallHeaderPost(formData, 'mcreateOrderDetails', loginData.data.token)
      .then(response => {
        // console.log('err,response', response)

        setloading(false)
        if (response.status == 200 && response.status == 201 && response.data.status == true || response.data.status == 'true') {
       
          navigation.push('PaymentSuccess')
        } else {

        }

      }).catch(err => {
        setloading(false)



        if (err) {

          console.log(err.response.data)
          {
            err.response.data != undefined && err.response.data.message != undefined &&
              Toast.showWithGravity(err.response.data.message, Toast.LONG, Toast.BOTTOM)

          }

        }
      })
  }


  
  const ADD_order = () => {
    const modifiedData = ValidData.map(item => {
      return {
        id: item.product_id,
        quantity: item.quantity
      };
    });
    const mergedArray = [...modifiedData, ...single_category_Data]
    const uniqueArray = [];

    mergedArray.forEach((obj) => {
      const isDuplicate = uniqueArray.some((item) => item.id === obj.id);

      if (!isDuplicate) {

        uniqueArray.push(obj);

      }
    });
    const filteredData = uniqueArray
      .filter(item => item.quantity > 0)
      .map(({ id, quantity }) => ({ id, quantity }));


    dispatch(SingleCategorySET(filteredData))

    navigation.push('Cart')

  }


  try {
    return (

      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={globalStyles.appTitle}>{"Last Ordered"}</Text>
          <Text style={{color:'white',fontSize:normalize(16),fontFamily: "RedHatDisplay-Medium"}}>Order #{orderID}</Text>


          {/* 
        <ScrollView  >
          {ValidData && ValidData.length > 0 &&
            ValidData.map((i, index) => (
              <View key={index} >
                <HorizontalSingleWithoutAdd imageSource={i.image_url} title={i.product_name} price={i.per_unit_price} weight={i.unit_name} quantity={i.quantity} product_id={i.product_id} updateMasterState={(text) => { getData() }} />
              </View> 
            ))}
        </ScrollView> */}

          <FlatList
            data={ValidData}
            // onRefresh={onRefresh}

            showsVerticalScrollIndicator={false}
            refreshing={loading}
            renderItem={(item) => CardForSingleCategory(item)}
          />



          {/* <CartDivider imageSource={IMAGES.personalcard} title={'CONTACT'} />
          <TouchableOpacity onPress={() => navigation.push('Contact')}>
            <CartBox>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image resizeMode="cover" source={IMAGES.ContactUser} style={{ width: normalize(35), height: normalize(35), borderRadius: 10, marginRight: 20 }} />

                  <View>
                    {
                      SelectName != undefined && SelectName != null && SelectName != "" &&
                      <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>{SelectName}</Text>
                    }
                    {
                      SelectName != undefined && SelectName != null && SelectName != "" &&

                      <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>+ 65 {SelectMobileNumber}</Text>

                    }
                  </View>
                </View>

                <View>
                  <Ionicons name="chevron-forward" size={normalize(25)} color={COLORS.appOppsiteTextColor} />
                </View>
              </View>
            </CartBox>
          </TouchableOpacity> */}

          {/* <CartDivider title={'SHIPPING ADDRESS  '} /> */}

          {/* <CartBox>
            {address_Data && address_Data.length > 0 &&
              address_Data.map((i, index) => (
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                  <View>
                    <Text style={globalStyles.heading}>{"Shipping Address"}</Text>
              
                    <Text style={globalStyles.title}>{i.shipping_block_number} , {i.shipping_street_drive_number},</Text>
                    <Text style={globalStyles.title}>{i.shipping_unit_number} - {i.shipping_postal_code}</Text>

                  </View>
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                  </TouchableOpacity>


                </View>
              ))}
          </CartBox> */}



     
{/* 
          <View style={{ height: 100, width: wW, justifyContent: "center", right: wW / 20, }}>

            <TouchableOpacity onPress={() => { ADD_order() }}>
              <SubmitBotton title={"Repeat Order"} loadingStaus={false} />
            </TouchableOpacity>
          </View> */}
          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
        <View style={{ position: "absolute", bottom: 0, alignItems: 'center', width: wW, height: 100, justifyContent: "center", borderTopWidth: 1, borderTopColor: "grey" }}>
          <TouchableOpacity onPress={() => { ADD_order() }}>
            <SubmitBotton title={"Repeat Order"} loadingStaus={false} />
          </TouchableOpacity>
        </View>
      </BackGround>

    )
  }
  catch (e) {
    console.log(e.message)
  }
}

export default LastOrder

const styles = StyleSheet.create({})