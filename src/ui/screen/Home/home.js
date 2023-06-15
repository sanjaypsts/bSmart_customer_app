import { BackHandler, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import { Order_Products, PlaceOrderHorizontalCard, SmallCardList } from './homeHelper'
import { IMAGES } from '../../globalImage'
import { useTranslation } from "react-i18next";
import { CustumModal, globalStyles } from '../../helper/globalStyle'
import { useNavigation } from '@react-navigation/native'
import Carousel_Screen from './Carousel'
import { useEffect } from 'react'
import apicallHeader from '../../../stateManage/apicallHeader'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal';

import Toast from 'react-native-simple-toast';
import { Category_SET } from '../../../stateManage/category/actions'
import Imagewithloader from '../../component/imageloading'
import { UPLOAD_IMAGE_PATH } from '../../../../config'
import { COLORS } from '../../helper/color'
import { CarouselSet } from '../../../stateManage/Carousel/actions'
import { useRoute } from '@react-navigation/native';
const Home = () => {
    
    const dispatch = useDispatch()
    
    const navigation = useNavigation();
    const { loginData } = useSelector(state => state.loginReducer);
    const { category_Data } = useSelector(state => state.categoryReducer);
    
    const { carouselData_Data } = useSelector(state => state.carouselReducer);
    
    const [categoryData, setCategoryData] = useState([]);
    
    const [Data, setData] = useState([]);
    
    const [visible, setvisible] = useState(false);
    const { t, i18n } = useTranslation();
    const sendWhatsApp = () => {

        let url =
            'whatsapp://send?text=' +
            "whatsAppMsg" +
            '&phone=91' + 123456789;

        Linking.openURL(url)
            .then((data) => {
                console.log('WhatsApp Opened');
            })
            .catch(() => {
                alert('Make sure Whatsapp installed on your device');
            });
    }

    const route = useRoute();

  
  

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    function handleBackButtonClick() {

   
        setvisible(true)
        return true;
        
    }

    useEffect(() => {
        getData()
        // dispatch(Category_SET("mgetCategoryDetails", loginData.data.token))
    }, [])

    useEffect(() => {
        setCategoryData(category_Data.Data)


    }, [category_Data])

    const getData = () => {


        apicallHeader('mgetSliderDetails', loginData.data.token)
            .then(response => {


                if (response.status == 200 && response.data.status == true || response.data.status == 'true' && response.data.data != undefined) {
                    // setData(response?.data?.data?.data_list)

                    dispatch(CarouselSet(response?.data?.data?.data_list))
                } else {

                }
            }).catch(err => {
                dispatch(CarouselSet([]))
                if (err.status == 401) {

                } else {

                }

            })
    }

    const single_category = (id) => {
        // props.singleCategory(id, categoryData);

        navigation.push('SingleCategory', { id })
    }
    


    return (

        <>

            <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ justifyContent: 'flex-end', margin: 0 }}
                onBackdropPress={() => setvisible(false)}
                swipeDirection={'down'}
                onSwipeComplete={() => setvisible(false)}
            >

                <CustumModal>
                    <Text style={{color: COLORS.appColor , fontSize: normalize(20), fontFamily: "RedHatDisplay-Bold",marginVertical:20}}>Do you really want to exit ?</Text>
           
                    <TouchableOpacity onPress={() => { setvisible(false);BackHandler.exitApp() }}  style={{marginHorizontal:5,backgroundColor:"skyblue",height:50,justifyContent:"center",alignItems:"center",marginBottom:20,borderRadius:5,borderWidth:0.5}}>
                    <Text style={{color: COLORS.appColor , fontSize: normalize(20), fontFamily: "RedHatDisplay-Bold",}}>Yes</Text>

                    </TouchableOpacity>

                 
                    <TouchableOpacity onPress={() => { setvisible(false)}} style={{marginHorizontal:5,backgroundColor:"#F6F6F6",height:50,justifyContent:"center",alignItems:"center",borderRadius:5,borderWidth:0.5}}>
                    <Text style={{color: COLORS.appColor , fontSize: normalize(20), fontFamily: "RedHatDisplay-Bold",}}>No</Text>

                    </TouchableOpacity>



                </CustumModal>

            </Modal>


            <Text style={[globalStyles.appTitle, { marginBottom: 10 }]}>Welcome {loginData.data.customer_shipping_address_alias_id.alias_name}</Text>

            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                {carouselData_Data.length > 0 &&

                    <Carousel_Screen data={carouselData_Data} />
                }
            </View>

            <View style={{ marginVertical: 10, }}>

                {/* <PlaceOrderHorizontalCard /> */}
            </View>


            {/* <Order_Products /> */}




            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                <TouchableOpacity onPress={() => sendWhatsApp()}>
                    <SmallCardList imageSource={IMAGES.Whatsapp} title={"Whatsapp"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.push('LastOrder') }}>
                    <SmallCardList imageSource={IMAGES.backInTime} title={"Last Order"} />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { navigation.push('MostOrder') }}>

                    <SmallCardList imageSource={IMAGES.Most_orderdered} title={"Most Ordered"} />
                </TouchableOpacity>

            </View>


            <Text style={[globalStyles.appTitle, { marginVertical: 15 }]}>Category</Text>


            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {categoryData && categoryData.length > 0 &&
                    categoryData.map((i, index) => (
                        <TouchableOpacity onPress={() => single_category(i.id)} style={{
                            width: normalize(95), height: normalize(95),
                            backgroundColor: COLORS.appLightColor, marginHorizontal: 5,
                            borderRadius: 10, borderColor: "white", borderWidth: 1, justifyContent: "center", alignItems: "center",
                            elevation: 100, shadowColor: "white",

                        }} key={index} >
                            <Imagewithloader imageurl={{ uri: `${UPLOAD_IMAGE_PATH + i.image_url}` }} style={{ width: normalize(93), height: normalize(93), }} imageStyle={{ borderRadius: 10 }} />

                        </TouchableOpacity>
                    ))}
            </ScrollView>



        </>



    )
}

export default Home

const styles = StyleSheet.create({})