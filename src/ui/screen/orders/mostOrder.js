import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { HorizontalSingleCategoryCard } from '../category/categoryHelper'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useEffect } from 'react'
import LoadingModal from '../../component/loading'
import { SubmitBotton, globalStyles } from '../../helper/globalStyle'
import { normalize, wW } from '../../helper/size'
import { IMAGES } from '../../globalImage'
import { getCartCount } from '../../../stateManage/asynstorage/asyncStore'
import { UPLOAD_IMAGE_PATH } from '../../../../config'
import { COLORS } from '../../helper/color'
import Imagewithloader from '../../component/imageloading'
import { SingleCategorySET } from '../../../stateManage/add_product/actions'

const MostOrder = ({ navigation }) => {
  const dispatch = useDispatch()

  const { loginData } = useSelector(state => state.loginReducer);
  const { single_category_Data } = useSelector(state => state.single_categoryReducer);

  const [SingleCategoryData, setSingleCategoryData] = useState([]);
  const [loading, setloading] = useState(false);

  const [TotalProduct, setTotalProduct] = useState(0);






  useEffect(() => {
    getData()

  }, [])






  const getData = () => {
    setSingleCategoryData([])
    setloading(true)


    apicallHeaderPost({ customer_id: loginData.data.customer_shipping_address_alias_id.id, limit: 30 }, 'mmostOrderBasedCustomerId', loginData.data.token)
      .then(response => {
        console.log("responce", response.status)
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {

          const RecievedData = response.data.data
          const newdata = RecievedData.map(item => {
            return {
              id: item.product_id,
              ...item
            };
          });

          const newdat2 = [...single_category_Data]

          const mergedArray = [];

          newdata.forEach((item) => {
            const matchingItem = newdat2.find((array2Item) => array2Item.id === item.id);

            if (matchingItem) {
              const mergedItem = { ...item, ...matchingItem };
              // const array2ValueToShow = matchingItem.city; // Specify the array2 value to show separately

              mergedArray.push({ ...mergedItem });
            } else {
              mergedArray.push(item);
            }
          });
          setSingleCategoryData(mergedArray)
          // console.log("modifiedData", modifiedData)
          // setSingleCategoryData(modifiedData)
        } else {
        }
      }).catch(err => {
        setloading(false)
        if (err) {

        }
      })
  }


  const GetLocal = async () => {

    const getTotalCount = await getCartCount();
    console.log(getTotalCount)
    setTotalProduct(getTotalCount)
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


          <TextInput onChangeText={(text) => changeEditValue(parseInt(text), item.id, index)} value={JSON.stringify(item.quantity)} keyboardType="number-pad" style={{ width: 30, height: 30, fontSize: 15, textAlign: "center", borderRadius: 10, paddingVertical: 0,color:COLORS.appOppsiteTextColor }} />
          <TouchableOpacity onLongPress={() => changeEditValue(item.quantity + 10, item.id, index)} onPress={() => { changeEditValue(item.quantity + 1, item.id, index) }} style={{ width: 30, height: 30, backgroundColor: COLORS.appColor, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: COLORS.appTextColor }}>+</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }






  const changeEditValue = (value, id, key) => {


    const value2 = value ? value : 0
    const updatedData = [...SingleCategoryData];
    updatedData[key].quantity = value2;

    setSingleCategoryData(updatedData)




    const mergedArray = [...updatedData, ...single_category_Data]

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

    console.log(filteredData)
    dispatch(SingleCategorySET(filteredData))

  }




  try {
    return (

      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />
        <Text style={globalStyles.appTitle}>{"Most Ordered"}</Text>

        {/* <Text style={[globalStyles.heading,{marginTop:15}]}>{"1 items"}</Text> */}

        {/* <ScrollView  >
          {SingleCategoryData && SingleCategoryData.length > 0 &&
            SingleCategoryData.map((i, index) => (
              <View key={index} >
                <HorizontalSingleCategoryCard imageSource={i.image_url} title={i.product_name} price={i.per_unit_price} weight={i.unit_name} quantity={i.quantity} product_id={i.product_id} show_price={0}   updateMasterState={(text) => { GetLocal() }}/>
              </View> 
            ))}
        </ScrollView> */}



        <View style={{ marginVertical: 10 }} >


          <FlatList
            data={SingleCategoryData}
            // onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            renderItem={(item) => CardForSingleCategory(item)}
          />

        </View>

        <View style={{ position: "absolute", bottom: 40, marginHorizontal: wW / 20, alignItems: "flex-end", width: "100%" }}>

          <TouchableOpacity onPress={() => { navigation.push('Cart') }} style={{ height: 70, width: 65, borderRadius: 10, backgroundColor: "white", alignItems: "center", justifyContent: 'center' }}>
            <View>
              <Image resizeMode="contain" tintColor={"#333333"} style={[{ width: normalize(25), height: normalize(25), alignSelf: "center" }]} source={IMAGES.Cart} />

              <View style={{ position: "absolute", width: normalize(30), height: normalize(25) }}>
                <View style={{ backgroundColor: "red", width: normalize(18), height: normalize(18), alignSelf: "flex-end", borderRadius: 30, justifyContent: "center", alignItems: "center", bottom: normalize(5) }}>
                  <Text style={{ color: "white", fontSize: normalize(10) }}>{single_category_Data.length}</Text>
                </View>

              </View>
            </View>


            <Text style={[globalStyles.cart_title2, { color: "black" }]}>Cart</Text>
          </TouchableOpacity>

        </View>

      </BackGround>

    )
  }
  catch {

  }
}

export default MostOrder

const styles = StyleSheet.create({})