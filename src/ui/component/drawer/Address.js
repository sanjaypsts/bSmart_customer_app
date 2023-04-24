// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import BackGround from '../backgroundImage'
// import BackBottonHeader from '../header/dashboardHeader'
// import { Divider, globalStyles } from '../../helper/globalStyle'
// import { useTranslation } from 'react-i18next'

// const Address = ({navigation}) => {
//     const { t, i18n } = useTranslation();

//   return (
//     <BackGround>
//           <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />
//           <Text style={globalStyles.appTitle}>{t('Address.Address')}</Text>
//           <Divider title={t('Address.view_addresses')}/>


//     </BackGround>
//   )
// }

// export default Address

// const styles = StyleSheet.create({})



import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackGround from '../backgroundImage'
import BackBottonHeader from '../header/dashboardHeader'
import { CartBox, Divider, globalStyles, MiniCartBox } from '../../helper/globalStyle'
import { useTranslation } from 'react-i18next'
import { normalize } from '../../helper/size'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useDispatch, useSelector } from 'react-redux'
import { CustumTextInput } from '../inputBox'
import LoadingModal from '../loading'
import NoDataFound from '../../errorHandle/noDataFound'
import { ADDRESS_SET, CONTACT_SET } from '../../../stateManage/userDetails/actions'


export default Address = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { loginData } = useSelector(state => state.loginReducer);
  const { address_Data } = useSelector(state => state.addressReducer);
  let { USER_DATA } = useSelector(state => state.userdatareducer);

  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [block_number, setshipping_block_number] = useState("");
  const [street_drive_number, setshipping_street_drive_number] = useState("");
  const [unit_number, setshipping_unit_number] = useState("");
  const [postal_code, setshipping_postal_code] = useState("");
  const [Selecteditid, setSelecteditid] = useState("");

  


  
  const dispatch = useDispatch()

  useEffect(() => {
    // setData(contact_Data)
   
  }, [address_Data])


  useEffect(() => {

    // getData()

  }, [])



  const getData = () => {

    setloading(true)
    dispatch(ADDRESS_SET({customer_unique_id:loginData.data.customer_shipping_address_alias_id.id},"mgetParticularCustomershippingAddressDetails", loginData.data.token))
    setloading(false)
  }







  
  const updateContact = () => {
  
    setloading(true)
    let formData = new FormData();
    formData.append('customer_unique_id', loginData.data.customer_shipping_address_alias_id.id)
    formData.append('id', Selecteditid);
    formData.append('shipping_block_number', block_number);
    formData.append('shipping_street_drive_number', street_drive_number);
    formData.append('shipping_unit_number', unit_number);
    formData.append('shipping_postal_code', postal_code);

    apicallHeaderPost(formData,'mupdateCustomerShippingAddressDetailsUsingId',loginData.data.token)
      .then(response => {
        console.log(response)

        setloading(false)
        if (response.status == 200 && response.status == 201 && response.data.status == true || response.data.status == 'true') {
          setEditMode(false)
          getData()
        } else {

        }

      }).catch(err => {
        setloading(false)

        console.log(err.response.data)


        if (err) {

        }
      })

  }








  try {
    return (
      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />


    

          <>
            <Text style={globalStyles.appTitle}>{t('Address.Address')}</Text>

            <Divider title={t('Address.view_addresses')} />
            {/* <CartBox>
              {address_Data && address_Data.length > 0 &&
                address_Data.map((i, index) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                    <View>
                      <Text style={globalStyles.heading}>{"Shipping Address"}</Text>
                      <Text></Text>
                      <Text style={globalStyles.title}>{i.shipping_block_number} {i.shipping_street_drive_number}</Text>
                      <Text style={globalStyles.title}>{i.shipping_unit_number} - {i.shipping_postal_code}</Text>
                  
                    </View>
                    <TouchableOpacity  style={{ flexDirection: "row", justifyContent: "center" ,alignItems:"center"}}>
             
                    </TouchableOpacity>


                  </View>
                ))}
            </CartBox> */}






            

        {editMode ?
          // edit mode
          <>
         
            <CartBox>

              <>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View>
                    <Text style={globalStyles.edit_heading}>{"Block number"}</Text>
                    <CustumTextInput title={"Block number"} value={block_number} textLength={50} keyBoardType={"number-pad"} updateMasterState={(value) => (setshipping_block_number(value))} />
                    <Text style={[globalStyles.edit_heading, { marginTop: 15 }]}>{"Street"}</Text>
                    <CustumTextInput title={"Street"} value={street_drive_number} textLength={50} keyBoardType={"number-pad"} updateMasterState={(value) => (setshipping_street_drive_number(value))} />
                 
                    <Text style={[globalStyles.edit_heading, { marginTop: 15 }]}>{"Unit number"}</Text>
                    <CustumTextInput title={"unit number"} value={unit_number} textLength={50} keyBoardType={"default"} updateMasterState={(value) => (setshipping_unit_number(value))} />
                 
                    <Text style={[globalStyles.edit_heading, { marginTop: 15 }]}>{"Postal code"}</Text>
                    <CustumTextInput title={"Postal code"} value={postal_code} textLength={6} keyBoardType={"default"} updateMasterState={(value) => (setshipping_postal_code(value))} />
                 
                 
                 
                  </View>
                </View>

              </>


              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                <TouchableOpacity onPress={() => { setEditMode(false); }} style={{ flexDirection: "row", justifyContent: "center" }}>
                  <MiniCartBox bg_color={'#480607'}>
                    <AntDesign name="close" size={normalize(16)} color="white" />
                    <Text style={[globalStyles.title, { color: "white" }]}> Cancel</Text>

                  </MiniCartBox>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>   {setloading(true);updateContact()}} style={{ flexDirection: "row", justifyContent: "center" }}>
                  <MiniCartBox bg_color="#00416A">
                    <Feather name="check" size={normalize(15)} color="white" />
                    <Text style={[globalStyles.title, { color: "white" }]}>  Save  </Text>

                  </MiniCartBox>
                </TouchableOpacity>
              </View>
            </CartBox>
          </>
          :

          <>
       
            <CartBox>
              {address_Data && address_Data.length > 0 &&
                address_Data.map((i, index) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                 

                      <View>
                      <Text style={globalStyles.heading}>{"Shipping Address"}</Text>
                      <Text></Text>
                      <Text style={globalStyles.title}>{i.shipping_block_number} {i.shipping_street_drive_number}</Text>
                      <Text style={globalStyles.title}>{i.shipping_unit_number} - {i.shipping_postal_code}</Text>
                  
                    </View>
                    </View>



                    <TouchableOpacity onPress={() => { setEditMode(true);setshipping_block_number(i.shipping_block_number);setshipping_street_drive_number(i.shipping_street_drive_number);setshipping_unit_number(i.shipping_unit_number);setshipping_postal_code(JSON.stringify(i.shipping_postal_code));setSelecteditid(i.id) }} style={{ flexDirection: "row", justifyContent: "center" }}>
                      <MiniCartBox >
                        <Feather name="edit-3" size={normalize(15)} color="white" />
                        <Text style={[globalStyles.title, { color: "white" }]}>   Edit</Text>

                      </MiniCartBox>
                    </TouchableOpacity>


                  </View>
                ))}
            </CartBox>
          </>
        }
          </>
        








      </BackGround>
    )
  } catch {

  }
}


const styles = StyleSheet.create({})