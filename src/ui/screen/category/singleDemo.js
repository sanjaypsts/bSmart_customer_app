// import React, { useEffect, useState } from 'react'
// import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
// import Modal from "react-native-modal";
// import { useSelector } from 'react-redux';
// import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
// import BackGround from '../../component/backgroundImage';
// import BackBottonHeader from '../../component/header/dashboardHeader';
// import LoadingModal from '../../component/loading';
// import { wH } from '../../helper/size';
// import { HorizontalSingleCategoryCard, Search, SmallCategoryCard } from './categoryHelper';


// const SingleCategory = (props) => {
//     const { loginData } = useSelector(state => state.loginReducer);
//     const [SingleCategoryData, setSingleCategoryData] = useState([]);
//     const [loading, setloading] = useState(false);
   

//     const { isVisible, id, categoryData } = props
//     const [currentCategory, setcurrentCategory] = useState(id);

//     const onChangeChild = (updatedValue) => {
//         const { updateCategory } = props;
//         updateCategory(updatedValue);
//     };




//     useEffect(() => {
//         setcurrentCategory(id)
//         getData(id)
//     }, [id])


//     const getData = (category_unique_id) => {
//         setSingleCategoryData([])

//         setloading(true)
//         let formData = new FormData();
//         formData.append('category_unique_id',category_unique_id);
//         formData.append('limit',3);
//         formData.append('page_number',1);
//         formData.append('sorting',JSON.stringify({"id":"asc"}));
//         apicallHeaderPost(formData/* {'category_unique_id':id,'limit':3,'page_number':1,'sorting':{"id":"asc"}} */,'mfilterProductDetailsUsingCategoryId',loginData.data.token)
//             .then(response => {
//                 console.log("err",response)
     
//                 setloading(false)
//                 if (response.data.status == true || response.data.status == 'true') {
//                     setSingleCategoryData(response.data.data.data_list)
//                 } else {

//                 }

//             }).catch(err => {
//                 setloading(false)

             

//                 if (err) {
                
//                 }
//             })
//     }

//     try {
  
//         console.log('currentCategory')
//         return (

//             <Modal
//                 isVisible={isVisible}
//                 deviceHeight={wH}

//                 style={{ justifyContent: 'center', alignItems: "center", }}
//             >

//                 <LoadingModal loading={loading} setloading={setloading} />
//                 <BackGround>
//                     <BackBottonHeader updateSingleCategory={(text) => { onChangeChild(false) }} />

//                     <Search />
//                     <View style={{ flexDirection: "row" }}>
//                         <ScrollView horizontal={true} >

//                             {categoryData && categoryData.length > 0 &&
//                                 categoryData.map((i, index) => (
//                                     <TouchableOpacity key={index} onPress={() => {getData(i.id),setcurrentCategory(i.id)}}  >
//                                         <SmallCategoryCard title={i.category_name} currentCategory={i.id == currentCategory ? "#333333" : "white" } TextcurrentCategory={i.id != currentCategory ? "#333333" : "white" }  />
//                                     </TouchableOpacity>
//                                 ))}

//                         </ScrollView>
//                     </View>



//                     {SingleCategoryData && SingleCategoryData.length > 0 &&
//                         SingleCategoryData.map((i, index) => (
//                             <View key={index} >
//                                 <HorizontalSingleCategoryCard imageSource={i.image_url} title={i.product_name} price={i.standard_price} weight={i.unit_name} />
//                             </View>
//                         ))}



//                     {/* <SmallCategoryCard /> */}

//                 </BackGround>



//             </Modal>

//         )
//     } catch (e) {

//     }
// }

// export default SingleCategory;