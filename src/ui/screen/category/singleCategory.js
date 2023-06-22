import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage';
import { NewSearch } from './singlecategoryhelper';
import BackBottonHeader from '../../component/header/dashboardHeader';
import { COLORS } from '../../helper/color';
import { FilterBotton } from '../../custumsIcons';
import Feather from 'react-native-vector-icons/Feather';
import { normalize, wW } from '../../helper/size';
import { useState } from 'react';
import { CustumModal, Divider, SubmitBotton, globalStyles } from '../../helper/globalStyle';
import Modal from 'react-native-modal';
import { FilterCheckBox, FilterUNCheckBox, HorizontalSingleCategoryCard, SmallCategoryCard } from './categoryHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import Imagewithloader from '../../component/imageloading';
import { UPLOAD_IMAGE_PATH } from '../../../../config';
import { SingleCategorySET } from '../../../stateManage/add_product/actions';
import { IMAGES } from '../../globalImage';



const SingleCategory = ({ route, navigation }) => {
  const dispatch = useDispatch()

  const { category_Data } = useSelector(state => state.categoryReducer);

  const { loginData } = useSelector(state => state.loginReducer);
  const { single_category_Data } = useSelector(state => state.single_categoryReducer);

  const [visible, setvisible] = useState(false);
  const [TempmultycurrentCategory, setTempmultycurrentCategory] = useState("");

  const [multycurrentCategory, setmultycurrentCategory] = useState("");
  const [loading, setloading] = useState(false);

  const [Data, setData] = useState("");
  const [selectCategory, setselectCategory] = useState("");

  const routedata = route?.params

  // console.log("single_categoryinitialState", single_category_Data)
  try {

    useFocusEffect(
      React.useCallback(() => {
        const respoceData = category_Data?.Data
        {
          category_Data.status &&

            respoceData.map((item, key) => {

              if (item) {
                item.selectstatus = false
              }
            })

        }
        setmultycurrentCategory(respoceData)
        setTempmultycurrentCategory(respoceData)

        if (routedata != undefined && routedata.id != undefined) {

          respoceData.map((item, key) => {

            if (item.id == routedata.id) {
              item.selectstatus = true
              setselectCategory(routedata.id)
              const sendId = routedata.id
              ApisingleCategoryData(sendId)

            }
          })


        } else {

          respoceData.map((item, key) => {

            if (item.id) {
              item.selectstatus = true
             
           
            }
          })


          const sendId = [respoceData[0].id]
          ApisingleCategoryData(sendId)
        }

      }, [])
    );


    const onChangeChild = (categoryId, updatedValue) => {
      navigation.goBack(null)
    };



    // data api 
    const ApisingleCategoryData = (id,searchText) => {
      const searchVAlue = searchText?.length >0  ? searchText : " "
   
      setselectCategory(id)
      setData([])

      setloading(true)

      let formData = new FormData();
      formData.append('category_id', JSON.stringify([id]));
      formData.append('limit', 100);
      formData.append('page_number', 1);
      formData.append('sorting', JSON.stringify({ "id": "asc" }));
      formData.append('search_data', searchVAlue);

      apicallHeaderPost(formData, 'mfilterProductDetailsUsingCategoryId', loginData.data.token)
        .then(response => {


          setloading(false)
          if (response?.status == 200 && response?.data?.status == true || response?.data?.status == 'true') {

            // setData(response?.data?.data.data_list)
            const newdata = response.data.data.data_list
            // const newdat2 = [...newsinglecategoryData]
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
            setData(mergedArray)
            // console.log(mergedArray)
          } else {

          }

        }).catch(err => {
          setloading(false)



          if (err) {

          }
        })

    }




    const FilterCard = (props) => {

      let NewData = [...TempmultycurrentCategory]

      const ChangeStatus = (id) => {
        let temp = NewData.map((NewData) => {
          if (id === NewData.id) {
            return { ...NewData, selectstatus: !NewData.selectstatus };
          }
          return NewData;
        })
        // setmultycurrentCategory(temp)
        setTempmultycurrentCategory(temp)

      }
      const key = 'selectstatus';
      const valueToMatch = true;

      const matchingElements = TempmultycurrentCategory.filter(item => item[key] === valueToMatch);
      const count = matchingElements.length;
     
      return (
        <>
          {NewData && NewData.length > 0 &&
            NewData.map((i, index) => (
              <TouchableOpacity disabled={count == 1 && i.selectstatus } onPress={() => ChangeStatus(i.id)} style={{ flexDirection: 'row', marginTop: 5, alignItems: "center", }}>
                {
                  i.selectstatus ? <FilterCheckBox /> : <FilterUNCheckBox />
                }


                <Text style={{ fontSize: normalize(16), fontFamily: "RedHatDisplay-Regular", color: COLORS.appColor, marginLeft: 20 }}>{i.category_name}</Text>

              </TouchableOpacity>
              // <TouchableOpacity onPress={() => ChangeStatus(i.id)} style={{ width: 110, height: 50, backgroundColor: i.selectstatus ? COLORS.imageBgCOLOR3 : COLORS.transParent, margin: 2, borderRadius: 10, borderWidth: 0.5, justifyContent: "center", alignItems: "center" }}>
              //   <Text style={[globalStyles.appSubtitle, { color: i.selectstatus ? COLORS.appTextColor : COLORS.appColor }]}>{i.category_name}</Text>
              // </TouchableOpacity>
            ))}
        </>
      )
    }




    const FilterSet = () => {

      const key = 'selectstatus';
      const valueToMatch = true;

     
      setmultycurrentCategory(TempmultycurrentCategory)
      const matchingElements = TempmultycurrentCategory.filter(item => item[key] === valueToMatch);
      ApisingleCategoryData(matchingElements[0].id)
      setvisible(false)
      // const filteredIds = multycurrentCategory
      //   .filter(item => item.selectstatus == true)
      //   .map(item => item.id);
      // ApisingleCategoryData(filteredIds)
      // setvisible(false)

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


      const value2 = value ? value : 0
      const updatedData = [...Data];
      updatedData[key].quantity = value2;

      setData(updatedData)




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


      dispatch(SingleCategorySET(filteredData))



    }




    const CategorySliderData = () => {




      return (
        <>
          {multycurrentCategory && multycurrentCategory.length > 0 &&
            multycurrentCategory.map((i, index) => (


              <>

                {i.selectstatus &&

                  <TouchableOpacity onPress={() => ApisingleCategoryData(i.id)} style={{ width: 110, height: 50, backgroundColor: selectCategory == i.id ? COLORS.imageBgCOLOR3 : COLORS.transParent, margin: 2, borderRadius: 10, borderWidth: 0.5, justifyContent: "center", alignItems: "center", borderColor: selectCategory == i.id ? COLORS.appTextColor : "white" }}>
                    <Text style={[globalStyles.appSubtitle, { color: selectCategory == i.id ? COLORS.appTextColor : "white" }]}>{i.category_name}</Text>
                  </TouchableOpacity>

                }
              </>
            ))}
        </>
      )
    }

    const Reset = () => {
      if (routedata != undefined && routedata.id != undefined) {

        TempmultycurrentCategory.map((item, key) => {

          if (item.id == routedata.id) {
            item.selectstatus = true
            setselectCategory(routedata.id)
            const sendId = routedata.id
            ApisingleCategoryData(sendId)
            setvisible(false)

          }
        })


      } else {

        TempmultycurrentCategory.map((item, key) => {
          setvisible(false)
          if (item.id) {
            item.selectstatus = true
           
         
          }
        })


        const sendId = [TempmultycurrentCategory[0].id]
        ApisingleCategoryData(sendId)
      }
    }


    return (

      <BackGround>


        <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ justifyContent: 'flex-end', margin: 0 }}
          onBackdropPress={() => setvisible(false)}
          swipeDirection={'down'}
          onSwipeComplete={() => setvisible(false)}
        >
          <CustumModal>
            {/* <FilterCheckBox /> */}
            {/* <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row" }}>
               
                <Text style={{ color: COLORS.appColor, fontSize: normalize(20), marginBottom: 10 }}>Category</Text>
              </View>

              <View style={{ flexWrap: 'wrap', height: "60%", alignItems: "center", alignContent: "center" }}>
                <FilterCard />
              </View>

            </View> */}

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: normalize(20), fontFamily: "RedHatDisplay-Bold", color: COLORS.appColor }}>Filter</Text>
              <TouchableOpacity onPress={() => Reset()}>
              <Text style={{ fontSize: normalize(16), fontFamily: "RedHatDisplay-Medium", color: COLORS.appColor }}>Reset</Text>
              </TouchableOpacity>
             

            </View>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "100%", marginVertical: 10 }}></View>
            <Text style={{ fontSize: normalize(18), fontFamily: "RedHatDisplay-Bold", color: COLORS.appColor }}>Categories</Text>


            <View style={{ width: "90%", alignSelf: 'center', marginTop: 10 }}>

              <FilterCard />
            </View>

            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { FilterSet() }}>
              <SubmitBotton title={' Filter'} loadingStaus={loading} />
             
            </TouchableOpacity>
          </CustumModal>

        </Modal>



        <BackBottonHeader updateSingleCategory={(text) => { onChangeChild(false) }} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 50 }}>
          <NewSearch updateMasterState={(text) => { ApisingleCategoryData(selectCategory, text) }} />
          <TouchableOpacity onPress={() => { setvisible(true) }} style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.appTextColor, borderRadius: 5 }}>
            <Feather name="filter" size={normalize(20)} color={COLORS.appOppsiteTextColor} />
          </TouchableOpacity>
        </View>


        <View style={{ marginVertical: 10 }} >

          <View style={{ flexDirection: "row" }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
              <CategorySliderData />
            </ScrollView>
          </View>


          <FlatList
            data={Data}
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

  } catch (error) {
    console.log(error)
  }
}

export default SingleCategory

const styles = StyleSheet.create({})