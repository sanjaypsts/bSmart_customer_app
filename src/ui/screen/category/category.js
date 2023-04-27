import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { normalize } from '../../helper/size'
import { CategoryCard } from './categoryHelper'
import { useDispatch, useSelector } from 'react-redux'
import LoadingModal from '../../component/loading'
import { globalStyles } from '../../helper/globalStyle'
import { useTranslation } from 'react-i18next'
import { Category_SET } from '../../../stateManage/category/actions'
import { useFocusEffect } from '@react-navigation/native'
import NoDataFound from '../../errorHandle/noDataFound'



const Category = (props) => {
    const { loginData } = useSelector(state => state.loginReducer);
    const { category_Data } = useSelector(state => state.categoryReducer);

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setloading] = useState(false);
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch()

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getData()
    //     }, [])
    // );
    useEffect(() => {
        getData()
    }, [])


    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log("fusfbsufb",category_Data)
    //         {
    //             category_Data.status &&
    //             setCategoryData(category_Data.Data)
    //         }
    //     }, [category_Data])
    // );

    useEffect(() => {
        setCategoryData(category_Data.Data)
        setloading(category_Data.loading)

    }, [category_Data])



    const getData = () => {
        setloading(true)

 
        dispatch(Category_SET("mgetCategoryDetails",loginData.data.token))
     
    }

    const single_category = (id) => {
        props.singleCategory(id, categoryData);


    }



    try {

        return (
            <View>
                 <LoadingModal loading={loading} setloading={setloading} />
                {/* <SingleCategory isVisible={singleCategoryVisible} id={singleCategoryId} categoryData={categoryData} updateCategory={() => { setsingleCategoryVisible(false) }} /> */}
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginVertical: normalize(20), }}>
                    <Text style={globalStyles.appTitle}>{t('category.category')}</Text>
                    <Text style={globalStyles.appSubtitle}>{t('category.delivery_window')}</Text>
                </View>


                {/* {categoryData.length > 0 ? */}

                    <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-around" }}>
                        {categoryData && categoryData.length > 0 &&
                            categoryData.map((i, index) => (
                                <TouchableOpacity key={index} onPress={() => single_category(i.id)}>
                                    <CategoryCard imageSource={i.image_url} title={i.category_name} />
                                </TouchableOpacity>
                            ))}
                    </View>
                    {/* :

                    <View >

                        <NoDataFound />
                    </View>
                } */}


            </View>
        )

    } catch {

    }
}

export default Category

const styles = StyleSheet.create({})
