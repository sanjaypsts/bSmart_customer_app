import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalPaddingHorizontal, normalize, wW } from '../../helper/size'
import { Order_Products, PlaceOrderHorizontalCard, SmallCardList } from './homeHelper'
import { IMAGES } from '../../globalImage'
import { useTranslation } from "react-i18next";
import { globalStyles } from '../../helper/globalStyle'
import { useNavigation } from '@react-navigation/native'
import Carousel_Screen from './Carousel'
import { useEffect } from 'react'
import apicallHeader from '../../../stateManage/apicallHeader'
import { useDispatch, useSelector } from 'react-redux'

import Toast from 'react-native-simple-toast';
import { Category_SET } from '../../../stateManage/category/actions'
import Imagewithloader from '../../component/imageloading'
import { UPLOAD_IMAGE_PATH } from '../../../../config'

const Home = () => {
    const dispatch = useDispatch()

    const navigation = useNavigation();
    const { loginData } = useSelector(state => state.loginReducer);
    const { category_Data } = useSelector(state => state.categoryReducer);
    const [categoryData, setCategoryData] = useState([]);

    const [Data, setData] = useState([]);

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


    useEffect(() => {
        getData()
        // dispatch(Category_SET("mgetCategoryDetails", loginData.data.token))
    }, [])

    useEffect(() => {
        setCategoryData(category_Data.Data)


    }, [category_Data])



    const getData = () => {
        console.log('mgetSliderDetails')
        apicallHeader('mgetSliderDetails', loginData.data.token)
            .then(response => {

                if (response.status == 200 && response.data.status == true || response.data.status == 'true' && response.data.data != undefined) {
                    setData(response.data.data.data_list)
                } else {

                }
            }).catch(err => {

                if (err.status == 401) {

                } else {

                }

            })
    }


    return (

        <>
            <Text style={[globalStyles.appTitle, { marginBottom: 10 }]}>Welcome {loginData.data.customer_contact_number.contact_name}</Text>

            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                {Data.length > 0 &&

                    <Carousel_Screen data={Data} />
                }
            </View>

            <PlaceOrderHorizontalCard />
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
                        <TouchableOpacity style={{  width: normalize(80), height: normalize(80), 
                            backgroundColor: "red", marginHorizontal: 5,
                             borderRadius: 10,borderColor:"white",borderWidth:1,justifyContent:"center",alignItems:"center",
                             elevation:100, shadowColor: "white",

                        }} key={index} >
                            <Imagewithloader imageurl={{ uri: `${UPLOAD_IMAGE_PATH + i.image_url}` }} style={{ width: normalize(78), height: normalize(78), }} imageStyle={{ borderRadius: 10 }} />

                        </TouchableOpacity>
                    ))}

            </ScrollView>

          

        </>



    )
}

export default Home

const styles = StyleSheet.create({})