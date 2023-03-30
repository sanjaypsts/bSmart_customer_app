import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { normalize } from '../../helper/size'
import { CategoryCard } from './categoryHelper'
import { IMAGES } from '../../globalImage'
import apicallHeader from '../../../stateManage/apicallHeader'
import { useSelector } from 'react-redux'
import LoadingModal from '../../component/loading'
import SingleCategory from './singleCategory'
import { globalStyles } from '../../helper/globalStyle'
import { useTranslation } from 'react-i18next'

const Category = (props) => {
    const { loginData } = useSelector(state => state.loginReducer);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setloading] = useState(false);
    const [singleCategoryVisible, setsingleCategoryVisible] = useState(false);
    const [singleCategoryId, setsingleCategoryId] = useState(0);
    const { t, i18n } = useTranslation();





    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setloading(true)
        apicallHeader('mgetCategoryDetails',loginData.data.token)
            .then(response => {
                setloading(false)
            
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    setCategoryData(response.data.data)
                } else {

                }

            }).catch(err => {
                setloading(false)

                console.log(err)

                if (err) {
                    // console.log(err)
                }
            })
    }

    const single_category = (id) => {
        props.singleCategory(id,categoryData);
        // setsingleCategoryId(id)
        // setsingleCategoryVisible(true)

    }


    return (
        <View>
            <LoadingModal loading={loading} setloading={setloading} />
            {/* <SingleCategory isVisible={singleCategoryVisible} id={singleCategoryId} categoryData={categoryData} updateCategory={() => { setsingleCategoryVisible(false) }} /> */}
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginVertical: normalize(20), }}>
                <Text style={globalStyles.appTitle}>{t('category.category')}</Text>
                <Text style={globalStyles.appSubtitle}>{t('category.delivery_window')}</Text>
            </View>

            <View style={{ flexWrap: "wrap", flexDirection: "row",justifyContent:"space-around"}}>
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
