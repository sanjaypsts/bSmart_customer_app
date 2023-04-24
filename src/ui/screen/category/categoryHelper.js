import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { UPLOAD_IMAGE_PATH } from '../../../../config';
import { normalize, wW } from '../../helper/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FilterBotton } from '../../custumsIcons';
import { COLORS } from '../../helper/color';
import { globalStyles } from '../../helper/globalStyle';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../component/loading';
import { IMAGES } from '../../globalImage';
import { storeCartCount } from '../../../stateManage/asynstorage/asyncStore';
import { Product_Count_SET } from '../../../stateManage/userDetails/actions';
import Imagewithloader from '../../component/imageloading';






export const CategoryCard = ({ imageSource, title }) => {


    return (

        <View style={{ width: normalize(100), backgroundColor: "#F0F0F0", borderRadius: 10, alignItems: "center",marginBottom:10,
        shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>
            <Imagewithloader imageurl={{ uri: `${UPLOAD_IMAGE_PATH + imageSource}` }} style={{ width: normalize(90), height: normalize(90), marginVertical: 5 }} imageStyle={{ borderRadius: 10 }} />
            <View style={{ height: 40, alignItems: "center", justifyContent: "center" }} >

                <Text numberOfLines={2} style={globalStyles.categoryProductText}>{title}</Text>
            </View>

        </View>
        // <View style={{
        //     alignItems: "center", backgroundColor: COLORS.appLightColor, width: 115, alignSelf: "flex-start",
        //     shadowColor: "#000", borderColor: COLORS.appOppsiteTextColor, borderWidth: 1, marginTop: 10, padding: 5,/* marginHorizontal:2, */
        //     borderRadius: 20,
        //     shadowOffset: {
        //         width: 0,
        //         height: 7,
        //     },
        //     shadowOpacity: 0.43,
        //     shadowRadius: 9.51,

        //     elevation: 15,
        // }}>


        //     <Imagewithloader imageurl={{ uri: `${UPLOAD_IMAGE_PATH + imageSource}` }} style={{ width: normalize(90), height: normalize(90), }} imageStyle={{ borderRadius: 20 }} />

        //     <View style={{ height: 40, alignItems: "center", justifyContent: "center" }} >

        //         <Text numberOfLines={2} style={globalStyles.categoryProductText}>{title}</Text>
        //     </View>
        // </View>
    )
}



export const SmallCategoryCard = ({ title, currentCategory, TextcurrentCategory }) => {
    return (
        <View style={{
            alignItems: "center", backgroundColor: currentCategory, justifyContent: "center", height: 50, width: 110, paddingHorizontal: 5, marginRight: 8,
            shadowColor: "#000",
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>

            <Text style={[globalStyles.appSubtitle, { color: TextcurrentCategory }]}>{title}</Text>
        </View>
    )
}



export const Search = ({ title }) => {
    const { t, i18n } = useTranslation();

    return (
        <View style={{ flexDirection: "row", width: "100%", marginVertical: 15, justifyContent: "space-between" }}>
            <View style={{
                backgroundColor: "#333333", alignItems: "center", height: 60, flexDirection: "row", paddingLeft: 15, width: "80%",
                shadowColor: "#000",
                borderRadius: 15,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
            }}>
                <Ionicons name="search" size={normalize(25)} color="white" />
                <TextInput
                    placeholder={t('category.search_products')}
                    // value={'value'}
                    style={globalStyles.logininputText}
                    placeholderTextColor={"#8E8F8F"}
                // onChangeText={onChangeText}
                // onChangeText={(text) => setPassword(text)}
                />


            </View>
            <FilterBotton backgroundColor={"#333333"} />

        </View>
    )
}





export const HorizontalSingleCategoryCard = (props) => {

    const { imageSource, title, price, weight, quantity, product_id, show_price } = props


    const onChangenewCount = (newCount) => {
        console.log(newCount)
        // const { updateMasterState } = props;
        // updateMasterState(updatedValue);
    };
    return (
        <View style={{
            backgroundColor: COLORS.appLightColor, height: 100, flexDirection: "row", alignItems: "center", marginTop: 20,
            shadowColor: "#000", borderColor: "white", borderWidth: 1,
            borderRadius: 15,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", width: '40%' }} >

                    {/* {imageSource == undefined && imageSource == null ?
                        <Image resizeMode="contain" source={IMAGES.AppLogo} style={{ width: normalize(70), height: normalize(70), borderRadius: 20, marginRight: 10 }} />
                        :
                        <Image resizeMode="contain" source={{ uri: UPLOAD_IMAGE_PATH + imageSource }} style={{ width: normalize(70), height: normalize(70), borderRadius: 20, marginRight: 10 }} />
                    } */}
                    <Imagewithloader imageurl={{ uri: `${UPLOAD_IMAGE_PATH + imageSource}` }} style={{ width: normalize(70), height: normalize(70), marginRight: 10 }} imageStyle={{ borderRadius: 20 }} />



                    <View>

                        <Text numberOfLines={1} style={{ color: COLORS.appOppsiteTextColor, fontWeight: "700", fontSize: normalize(13), }}>{title}</Text>
                        <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "700", fontSize: normalize(5), }}></Text>

                        <Text style={{ color: COLORS.appOppsiteTextColor }}>{weight}</Text>
                    </View>
                    {/* <Text style={{ color: "white", fontWeight: "700", fontSize: normalize(13), width: 150 }}>{title}</Text> */}
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end" }}>
                    {show_price == 1 &&
                        < Text style={{ color: COLORS.appOppsiteTextColor }}>S${price.toFixed(2)}   </Text>
                    }


                    <AddBotton quantity={quantity} product_id={product_id} updatequantity={(curentQty) => { onChangenewCount(curentQty) }} />
                </View>
            </View>

        </View >
    )
}




// Add btn
export const AddBotton = (props) => {
    const dispatch = useDispatch()

    const { quantity, product_id, updatequantity } = props

    const [quantity1, setQuantity] = useState(quantity);
    const [loading, setloading] = useState(false);
    const { loginData } = useSelector(state => state.loginReducer);

    const { t, i18n } = useTranslation();


    // const AddCategory = (params) => {
    //     setQuantity(params)



    // }


    const setLocal = async (count) => {

        dispatch(Product_Count_SET({ "total_Product_count": count }))
        typeof (count)
        console.log(count)
        await storeCartCount(JSON.stringify(count))

    }
    const AddCategory = (params) => {

        setQuantity(params)


        setloading(true)
        let formData = new FormData();
        formData.append('customer_id', 1);
        formData.append('product_id', product_id);
        formData.append('quantity', params);

        apicallHeaderPost(formData, 'addCartDetail', loginData.data.token)
            .then(response => {

                setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    console.log("Add")
                    const data = response.data.data.data_list.quantity == undefined ? 0 : response.data.data.data_list.quantity
                    // updatequantity(response.data.data.data_list.quantity)
                    // console.log("bsjhdubcsdjub",response.data.data.data_list.quantity)
                    updatequantity(data)

                    setQuantity(data)

                    setLocal(response.data.data.data_total_count)
                } else {

                }

            }).catch(err => {
                console.log("err", err.response.data)
                setloading(false)




                if (err) {

                }
            })
    }






    return (

        <View style={{ height: 35, borderColor: "white", borderWidth: 1, width: 90, backgroundColor: COLORS.appColor, flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 5, borderRadius: 50, }}>


            <LoadingModal loading={loading} setloading={setloading} />


            <View>
                {quantity1 >= 1 &&
                    <TouchableOpacity onPress={() => { AddCategory(parseInt(quantity1) - 1) }} style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
                        <Text >-</Text>
                    </TouchableOpacity>
                }
            </View>

            {quantity1 <= 0 && quantity1 != undefined ?
                <Text style={{ color: "white", fontSize: normalize(15) }}>{t('category.add')}</Text>

                :



                <Text style={{ color: "white", fontSize: normalize(15) }}>{quantity1}</Text>

            }
            <TouchableOpacity onPress={() => { AddCategory(parseInt(quantity1) + 1) }} style={{ width: 25, height: 25, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
                <Text >+</Text>
            </TouchableOpacity>

        </View>




    )
}




