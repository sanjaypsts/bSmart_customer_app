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


const SingleCategory = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();

  const { loginData } = useSelector(state => state.loginReducer);
  const [categoryData, setcategoryData] = useState([]);

  const [SingleCategoryData, setSingleCategoryData] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentCategory, setcurrentCategory] = useState("");

  const routedata = route.params

  useEffect(() => {
    if (routedata != undefined && routedata.data != undefined && routedata.id != undefined) {
      setcategoryData(routedata.data)
      getData(routedata.id)
      setcurrentCategory(routedata.id)
    }
  }, [])


  const onChangeChild = (updatedValue) => {
    navigation.goBack(null)
  };




  const getData = (category_unique_id) => {
    setSingleCategoryData([])

    setloading(true)
    let formData = new FormData();
    formData.append('category_id',JSON.stringify([ category_unique_id]));
    formData.append('limit', 3);
    formData.append('page_number', 1);
    formData.append('sorting', JSON.stringify({ "id": "asc" }));
    apicallHeaderPost(formData/* {'category_unique_id':id,'limit':3,'page_number':1,'sorting':{"id":"asc"}} */, 'mfilterProductDetailsUsingCategoryId', loginData.data.token)
      .then(response => {
        console.log("err", response)

        setloading(false)
        if ( response.status == 200 && response.data.status == true || response.data.status == 'true') {
          setSingleCategoryData(response.data.data.data_list)
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
                  <SmallCategoryCard title={i.category_name} currentCategory={i.id == currentCategory ? "#333333" : "#E1E9F1"} TextcurrentCategory={i.id != currentCategory ? "#333333" : "white"} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>



        {SingleCategoryData && SingleCategoryData.length > 0 &&
          SingleCategoryData.map((i, index) => (
            <View key={index} >
              <HorizontalSingleCategoryCard imageSource={i.image_url} title={i.product_name} price={i.standard_price} weight={i.unit_name}  quantity={i.quantity} product_id={i.id} />
            </View>
          ))}




        <View style={{ position: "absolute", bottom: 40, marginHorizontal: wW / 20, alignItems: "flex-end", width: "100%" }}>
           
          <TouchableOpacity onPress={() => { navigation.push('Cart')}} style={{ height: 60, width: 60, borderRadius: 10, backgroundColor: "white", alignItems: "center", justifyContent: 'center' }}>
            <Image resizeMode="contain" tintColor={"#333333"} style={[{ width: normalize(25), height: normalize(25), }]} source={IMAGES.Cart} />
            <Text>Cart</Text>
          </TouchableOpacity>

        </View>

      </BackGround>
    )

  } catch {

  }

}

export default SingleCategory

