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


  const dispatch = useDispatch()

  useEffect(() => {
    // setData(contact_Data)
   
  }, [address_Data])


  useEffect(() => {

    getData()

  }, [])



  const getData = () => {

    setloading(true)
    dispatch(ADDRESS_SET({customer_unique_id:loginData.data.customer_shipping_address_alias_id.customer_unique_id},"mgetParticularCustomershippingAddressDetails", loginData.data.token))
    setloading(false)
  }













  try {
    return (
      <BackGround>
        <LoadingModal loading={address_Data.loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />


    

          <>
            <Text style={globalStyles.appTitle}>{t('Address.Address')}</Text>

            <Divider title={t('Address.view_addresses')} />
            <CartBox>
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
            </CartBox>
          </>
        








      </BackGround>
    )
  } catch {

  }
}


const styles = StyleSheet.create({})