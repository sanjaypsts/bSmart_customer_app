import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { normalize } from '../../helper/size'
import { CategoryCard } from './categoryHelper'
import apicallHeader from '../../../stateManage/apicallHeader'
import { useDispatch, useSelector } from 'react-redux'
import LoadingModal from '../../component/loading'
import { globalStyles } from '../../helper/globalStyle'
import { useTranslation } from 'react-i18next'
import { Category_SET } from '../../../stateManage/category/actions'
import { useFocusEffect } from '@react-navigation/native'

const Category = (props) => {
    const { loginData } = useSelector(state => state.loginReducer);
    const { category_Data } = useSelector(state => state.categoryReducer);

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setloading] = useState(false);
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch()

    // useEffect(() => {
    //     getData()
    // }, [])


    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
      );


      useFocusEffect(
        React.useCallback(() => {
            setCategoryData(category_Data)
        }, [category_Data])
      );
    

    // useEffect(() => {
    //     setCategoryData(category_Data)
    // }, [category_Data])
   
    const getData = () => {
        setloading(true)
        setCategoryData([])
        dispatch(Category_SET("mgetCategoryDetails",loginData.data.token))
        setloading(false)
       




        // apicallHeader('mgetCategoryDetails', loginData.data.token)
        //     .then(response => {
        //         setloading(false)

        //         if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
        //             setCategoryData(response.data.data)
        //             dispatch(Category_SET(response.data.data))


        //         } else {

        //         }

        //     }).catch(err => {
        //         setloading(false)

        //        

        //         if (err) {
        //            
        //         }
        //     })
    }

    const single_category = (id) => {
        props.singleCategory(id, categoryData);


    }


    return (
        <View>
            <LoadingModal loading={category_Data.loading} setloading={setloading} />
            {/* <SingleCategory isVisible={singleCategoryVisible} id={singleCategoryId} categoryData={categoryData} updateCategory={() => { setsingleCategoryVisible(false) }} /> */}
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginVertical: normalize(20), }}>
                <Text style={globalStyles.appTitle}>{t('category.category')}</Text>
                <Text style={globalStyles.appSubtitle}>{t('category.delivery_window')}</Text>
            </View>

            <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-around" }}>
                {categoryData && categoryData.length > 0 &&
                    categoryData.map((i, index) => (
                        <TouchableOpacity key={index} onPress={() => single_category(i.id)}>
                            <CategoryCard imageSource={i.image_url} title={i.category_name} />
                        </TouchableOpacity>
                    ))}
            </View>


        </View>
    )
}

export default Category

const styles = StyleSheet.create({})
