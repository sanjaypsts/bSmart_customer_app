import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { normalize, wW } from '../../helper/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../helper/color';
import { globalStyles } from '../../helper/globalStyle';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import Imagewithloader from '../../component/imageloading';




export const NewSearch = (props) => {
    const { t, i18n } = useTranslation();
    const [searchData, setsearchData] = useState('');

    const onChangeText = (value) => {
        setsearchData(value)
        const { updateMasterState } = props;
        updateMasterState(value);

    };

    return (
        <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-between", width: "80%", }}>
            <View style={{
                backgroundColor: COLORS.appTextColor, alignItems: "center", height: 50, flexDirection: "row", paddingLeft: 15, width: "100%",
                shadowColor: "#000",
                borderRadius: 5,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
            }}>
                <Ionicons name="search" size={normalize(20)} color={COLORS.appOppsiteTextColor} />
                <TextInput
                    placeholder={t('category.search_products')}
                    // value={'value'}
                    maxLength={50}
                    style={[globalStyles.logininputText, { color: "black" }]}
                    placeholderTextColor={"#8E8F8F"}


                    onChangeText={(text) => onChangeText(text)}
                />


            </View>


        </View>
    )
}



// export const FilterCard = (props) => {
// const {Data } = props

//     const ChangeStatus = (id) => {
//         console.log(id)
//         const NewData = Data
//         Data.map((item, key) => {

//             if (item.id == id) {
//                 item.selectstatus = !item.selectstatus
//             }
//         })
//         const { updateMasterState } = props;
//         updateMasterState(NewData);
//     }
//     return (
//         <>
//             {Data && Data.length > 0 &&
//                 Data.map((i, index) => (
//                     <TouchableOpacity onPress={() => ChangeStatus(i.id)} style={{ width: 110, height: 50, backgroundColor: i.selectstatus ? COLORS.imageBgCOLOR3 : COLORS.transParent, margin: 2, borderRadius: 10, borderWidth: 0.5, justifyContent: "center", alignItems: "center" }}>
//                         <Text style={[globalStyles.appSubtitle, { color: i.selectstatus ? COLORS.appTextColor : COLORS.appColor }]}>{i.category_name}</Text>
//                     </TouchableOpacity>
//                 ))}
//         </>
//     )
// }




