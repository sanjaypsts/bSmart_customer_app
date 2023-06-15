import { BackHandler, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { CardView, CartBox, CheckedBox, Divider, globalStyles, SubmitBotton, UnCheckedBox } from '../../helper/globalStyle'
import { IMAGES } from '../../globalImage'
import { ItemCartBox, CartDivider } from './cartHelper'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { COLORS } from '../../helper/color'
import { normalize, wW } from '../../helper/size'
import { UPLOAD_IMAGE_PATH } from '../../../../config'
import Imagewithloader from '../../component/imageloading'
import { SingleCategorySET } from '../../../stateManage/add_product/actions'
import Record from '../../helper/Record'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getContactName, getContactNumber, storeContactNumber, storeName } from '../../../stateManage/asynstorage/asyncStore'
import LoadingModal from '../../component/loading'
import Toast from 'react-native-simple-toast';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()

  const { loginData } = useSelector(state => state.loginReducer);
  const { single_category_Data } = useSelector(state => state.single_categoryReducer);
  const { contact_Data } = useSelector(state => state.userDetailsReducer);
  const { address_Data } = useSelector(state => state.addressReducer);
  const [loading, setloading] = useState(true);

  const [ValidData, setValidData] = useState([]);
  const [AudioFIle, setAudioFIle] = useState(null);


  const [SelectMobileNumber, setSelectMobileNumber] = useState("Select Contact");
  const [SelectName, setSelectName] = useState("");


  // Total VAlue 
  const [subTotal, setsubTotal] = useState("");
  const [TaxAmount, setTaxAmount] = useState("");
  const [Grandtotal, setGrandtotal] = useState("");



  useEffect(() => {
    ApiCallForVAlidCartDAta(single_category_Data)
    ContactDATaSEt()
  }, [])



  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);


  function handleBackButtonClick() {


    navigation.push("DashBoard")
    return true;

  }

  const ApiCallForVAlidCartDAta = (LocalData) => {
    setloading(true)

    {
      LocalData.length > 0


      const modifiedData = LocalData.map(item => {
        return {
          product_id: item.id,
          quantity: item.quantity
        };
      });

      let formData = new FormData();
      formData.append('customer_alias_id', loginData.data.customer_shipping_address_alias_id.id)
      formData.append('order_details', JSON.stringify(modifiedData));

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
  }





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



  const CardForSingleCategory = ({ index, item }) => {


    return (
      <>


        <View key={index} style={{
          backgroundColor: COLORS.appLightColor, height: 60, flexDirection: "row", alignItems: "center", marginTop: 10,
          shadowColor: "#000", borderColor: "white", borderWidth: 0.2, padding: 10, justifyContent: "space-between",
          borderRadius: 5,
          // shadowOffset: {
          //   width: 0,
          //   height: 7,
          // },
          // shadowOpacity: 0.43,
          // shadowRadius: 9.51,

          // elevation: 15,
        }}>
          <View style={{ maxWidth: "70%" }}>

            <Text style={{ color: COLORS.appColor, fontSize: normalize(16), fontFamily: "RedHatDisplay-Bold" }}>{item.product_name}</Text>
            {/* <Text numberOfLines={1} style={{ color: COLORS.appOppsiteTextColor, fontFamily: "RedHatDisplay-Regular", fontSize: normalize(13), }}>{"item.product_name"}</Text> */}
          </View>


          <View style={{ flexDirection: "row", borderRadius: 20, }}>


            <TouchableOpacity onLongPress={() => changeEditValue(0, item.product_id, index)} disabled={item.quantity <= 0} onPress={() => { changeEditValue(item.quantity - 1, item.product_id, index) }} style={{ width: 30, height: 30, backgroundColor: item.quantity <= 0 ? COLORS.transParent : COLORS.appColor, borderRadius: 20, justifyContent: "center", alignItems: "center" }} >
              <Text style={{ color: COLORS.appTextColor }}>-</Text>
            </TouchableOpacity>


            <TextInput onChangeText={(text) => changeEditValue(parseInt(text), item.product_id, index)} value={JSON.stringify(item.quantity)} keyboardType="number-pad" style={{ width: 30, height: 30, fontSize: 15, textAlign: "center", borderRadius: 10, paddingVertical: 0 ,color:COLORS.appOppsiteTextColor}} />
            <TouchableOpacity onLongPress={() => changeEditValue(item.quantity + 10, item.product_id, index)} onPress={() => { changeEditValue(item.quantity + 1, item.product_id, index) }} style={{ width: 30, height: 30, backgroundColor: COLORS.appColor, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: COLORS.appTextColor }}>+</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ borderBottomWidth: 0.5, borderColor: "grey", marginHorizontal: 20 }}>

        </View>
      </>
    )
  }




  const changeEditValue = (value, id, key) => {
    setloading(true)
    const value2 = value ? value : 0
    const updatedData = [...ValidData];
    updatedData[key].quantity = value2;

    const filteredData = updatedData.filter(item => item.quantity > 0)
    // setValidData(filteredData)

    // console.log(filteredData)




    const modifiedData = filteredData.map(item => {
      return {
        id: item.product_id,
        quantity: item.quantity
      };
    });
    // console.log(modifiedData)
    dispatch(SingleCategorySET(modifiedData))

    // console.log("modifiedData", modifiedData)
    ApiCallForVAlidCartDAta(modifiedData)
    // dispatch(SingleCategorySET(filteredData))

    // ApiCallForVAlidCartDAta()

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

    {
      AudioFIle == null || AudioFIle == "" || AudioFIle == " " || AudioFIle == undefined ?
        formData.append('delivery_notes_voice', "")
        :
        formData.append('delivery_notes_voice', {
          uri: AudioFIle,

          type: 'audio/mpeg', name: 'audio.mp3',
        })

    }


    // console.log()

    apicallHeaderPost(formData, 'mcreateOrderDetails', loginData.data.token)
      .then(response => {
        // console.log('err,response', response)

        setloading(false)
        if (response.status == 200 && response.status == 201 && response.data.status == true || response.data.status == 'true') {
          dispatch(SingleCategorySET([]))
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


  try {
    return (

      <BackGround>
        <LoadingModal loading={loading} />
        <BackBottonHeader updateSingleCategory={() => { navigation.push("DashBoard") }} />
        <Text style={globalStyles.appTitle}>Cart</Text>



        {ValidData.length > 0 ?
          <ScrollView showsVerticalScrollIndicator={false}>


            <CartDivider imageSource={IMAGES.ItemsImage} title={'ITEMS'} />
            <CardView style={{ backgroundColor: COLORS.appLightColor, borderRadius: 10 }}>

              <FlatList
                data={ValidData}
                // onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                renderItem={(item) => CardForSingleCategory(item)}
              />

              <TouchableOpacity onPress={() => { navigation.push('SingleCategory') }} style={{ flexDirection: 'row', alignItems: "center", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                  <Image resizeMode="contain" source={IMAGES.Shopping_cart} style={{ width: 30, height: 30, borderRadius: 10 }} />
                  <Text style={{ color: COLORS.appOppsiteTextColor }}>  Add more products</Text>
                </View>

                <View>
                  <Ionicons name="chevron-forward" size={normalize(25)} color="white" />
                </View>

              </TouchableOpacity>

            </CardView>

            <CartDivider imageSource={IMAGES.personalcard} title={'CONTACT'} />
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
            </TouchableOpacity>

            <CartDivider title={'SHIPPING ADDRESS  '} />

            <CartBox>
              {address_Data && address_Data.length > 0 &&
                address_Data.map((i, index) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                    <View>
                      <Text style={globalStyles.heading}>{"Shipping Address"}</Text>
                      {/* <Text></Text> */}
                      {/* <Text style={globalStyles.title}>{i.shipping_block_number} , {i.shipping_street_drive_number},</Text> */}
                      <Text style={globalStyles.title}>{i.shipping_block_number} , {i.shipping_street_drive_number},</Text>
                      <Text style={globalStyles.title}>{i.shipping_unit_number} - {i.shipping_postal_code}</Text>

                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                    </TouchableOpacity>


                  </View>
                ))}
            </CartBox>

            <Record updateMasterState={(value) => { setAudioFIle(value) }} />





            <View style={{ height: 100, width: wW, justifyContent: "center", right: wW / 20, }}>

              <TouchableOpacity onPress={() => { Place_order() }}>
                <SubmitBotton title={"Place Order"} loadingStaus={false} />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 100 }}></View>
          </ScrollView>



          :


          <View style={{ justifyContent: 'center', alignItems: "center", marginVertical: "70%" }}>
            {!loading &&
              <>
                <Image resizeMode='contain' source={IMAGES.No_Cart} style={{ width: 150, height: 100, borderRadius: 10 }} />
                {/* <Text style={{color:"white"}}> Empty cart</Text> */}
                <TouchableOpacity onPress={() => { navigation.push('SingleCategory') }} style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: COLORS.appLightColor, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}>

                    <Text style={{ color: COLORS.appOppsiteTextColor }}>Add products</Text>
                  </View>

                </TouchableOpacity>
              </>

            }
          </View>


        }




      </BackGround>
    )

  } catch (error) {
    console.log(error)
  }
}

export default Cart

const styles = StyleSheet.create({})