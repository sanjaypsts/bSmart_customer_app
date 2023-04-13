import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react'
import BackGround from '../../component/backgroundImage';
import BackBottonHeader from '../../component/header/dashboardHeader';
import { HorizontalSingleCategoryCard, Search, SmallCategoryCard } from './categoryHelper';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import { normalize, wH, wW } from '../../helper/size';
import LoadingModal from '../../component/loading';
import { useSelector } from 'react-redux';
import { IMAGES } from '../../globalImage';
import { useTranslation } from 'react-i18next'
import { globalStyles } from '../../helper/globalStyle';

import { getCartCount } from "../../../stateManage/asynstorage/asyncStore"
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../helper/color';


const SingleCategory = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();

  const { loginData } = useSelector(state => state.loginReducer);
  const { category_Data } = useSelector(state => state.categoryReducer);

  const [categoryData, setcategoryData] = useState([]);

  const [SingleCategoryData, setSingleCategoryData] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentCategory, setcurrentCategory] = useState("");


  const [TotalProduct, setTotalProduct] = useState("");
  const routedata = route.params

  const { USER_DATA } = useSelector(state => state.userdatareducer);
  const { TotalCount } = useSelector(state => state.ProductCountReducer);

  useFocusEffect(
    React.useCallback(() => {

      {
        category_Data.status &&
          setcategoryData(category_Data.Data)

      }
      GetLocal()

      if (routedata != undefined && routedata.id != undefined) {



        getData(routedata.id)
        setcurrentCategory(routedata.id)
      } else {
      
        try {
          {
            category_Data.status && category_Data.Data[0].id != undefined &&
              getData(category_Data.Data[0].id)
            setcurrentCategory(category_Data.Data[0].id)
          }
        }
        catch {

        }


      }
    }, [category_Data])
  );


  // useEffect(() => {
  //   { category_Data.status == true   && category_Data.Data.length >= 0 && category_Data.Data[0].id &&
  //     getData(category_Data.Data[0].id)
  //     setcurrentCategory(category_Data.Data[0].id)
  //     }

  // },[])


  const onChangeChild = (updatedValue) => {
    navigation.goBack(null)
  };



  const GetLocal = async () => {
    const getTotalCount = await getCartCount();
    console.log("getTotalCount", getTotalCount)
    setTotalProduct(getTotalCount)
  }

  useEffect(() => {
    setTotalProduct(TotalCount.total_Product_count)
  }, [TotalCount])



  const getData = (category_unique_id) => {
    setSingleCategoryData([])

    setloading(true)
    let formData = new FormData();
    formData.append('category_id', JSON.stringify([category_unique_id]));
    formData.append('limit', 50);
    formData.append('page_number', 1);
    formData.append('sorting', JSON.stringify({ "id": "asc" }));
    apicallHeaderPost(formData/* {'category_unique_id':id,'limit':3,'page_number':1,'sorting':{"id":"asc"}} */, 'mfilterProductDetailsUsingCategoryId', loginData.data.token)
      .then(response => {


        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
          setSingleCategoryData(response.data.data.data_list)
          console.log(response.data.data.data_total_count, "bsduvbsudvb")
          setTotalProduct(response.data.data.data_total_cart_count)

        } else {

        }

      }).catch(err => {
        setloading(false)



        if (err) {

        }
      })
  }



  try {

    return (
      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />
        <BackBottonHeader updateSingleCategory={(text) => { onChangeChild(false) }} />
        <Search />
        <View style={{ flexDirection: "row" }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
            {categoryData && categoryData.length > 0 &&
              categoryData.map((i, index) => (
                <TouchableOpacity key={index} onPress={() => { getData(i.id), setcurrentCategory(i.id) }}  >
                  <SmallCategoryCard title={i.category_name} currentCategory={i.id != currentCategory ? COLORS.appLightColor : "#333333" } TextcurrentCategory={i.id == currentCategory ?  COLORS.appLightColor : "#333333"} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>


        <ScrollView  >
          {SingleCategoryData && SingleCategoryData.length > 0 &&
            SingleCategoryData.map((i, index) => (
              <View key={index} >
                <HorizontalSingleCategoryCard imageSource={i.image_url} title={i.product_name} price={i.standard_price} weight={i.unit_name} quantity={i.quantity} product_id={i.id} updateMasterState={(text) => { console.log("single") }} />
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

  } catch {

  }

}

export default SingleCategory

