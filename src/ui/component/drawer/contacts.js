import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackGround from '../backgroundImage'
import BackBottonHeader from '../header/dashboardHeader'
import { CartBox, CheckedBox, Divider, globalStyles, MiniCartBox, UnCheckedBox } from '../../helper/globalStyle'
import { useTranslation } from 'react-i18next'
import { normalize } from '../../helper/size'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useDispatch, useSelector } from 'react-redux'
import { CustumTextInput } from '../inputBox'
import LoadingModal from '../loading'
import NoDataFound from '../../errorHandle/noDataFound'
import { CONTACT_SET } from '../../../stateManage/userDetails/actions'
import { getContactNumber, storeContactNumber, storeName } from '../../../stateManage/asynstorage/asyncStore'

const Contact = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { loginData } = useSelector(state => state.loginReducer);
  const { contact_Data } = useSelector(state => state.userDetailsReducer);
  const { USER_DATA } = useSelector(state => state.userdatareducer);

  const [Data, setData] = useState([]);

  const [loading, setloading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [Selecteditnumber, setSelecteditnumber] = useState("");
  const [SelecteditName, setSelecteditName] = useState("");
  const [Selecteditid, setSelecteditid] = useState("");


  const [SelectMobileNumber, setSelectMobileNumber] = useState(0);


  const [ERROR_Name, setERROR_Name] = useState("");
  const [ERROR_MobileNumber, setERRORMobileNumber] = useState("");



  const dispatch = useDispatch()

  useEffect(() => {
    setData(contact_Data)
    GetLocal()
  }, [contact_Data])


  useEffect(() => {

    // getData()

  }, [])



  const getData = () => {

    setloading(true)
    dispatch(CONTACT_SET({ customer_unique_id: loginData.data.customer_shipping_address_alias_id.id }, "mgetParticularCustomerContactDetails", loginData.data.token))
    setloading(false)

  }


  const setLocal = async (mobileNumber, name) => {
    await storeContactNumber(mobileNumber)
    await storeName(name)

    setSelectMobileNumber(mobileNumber)
  }


  const GetLocal = async () => {
    const getNumber = await getContactNumber();
    setSelectMobileNumber(getNumber)

  }


  function validateInput(inputValue) {


    if (inputValue && inputValue.length > 3) {
    
      return true; 
      // return 'Input value cannot be empty';
    }
    return false
    // additional validation logic here
    // return null if input is valid
  }


  function validateInputLength(inputValue) {
    if (inputValue.length >= 8) {

      return true;
      // return 'Input value cannot be empty';
    }
    // additional validation logic here
    return false // return null if input is valid
  }

  const updateContact = () => {

    const SelecteditName_Check = validateInput(SelecteditName)
    console.log(SelecteditName_Check)
    const Selecteditnumber_Check = validateInputLength(Selecteditnumber)

    if (SelecteditName_Check && Selecteditnumber_Check) {
      setloading(true)
      let formData = new FormData();
      formData.append('customer_unique_id', loginData.data.customer_shipping_address_alias_id.id)
      formData.append('contact_name', SelecteditName);
      formData.append('contact_number', Selecteditnumber);
      formData.append('id', Selecteditid);

      apicallHeaderPost(formData, 'mupdateCustomerContactDetailsUsingId', loginData.data.token)
        .then(response => {


          setloading(false)
          if (response.status == 200 && response.status == 201 && response.data.status == true || response.data.status == 'true') {
            setEditMode(false)
            getData()
          } else {

          }

        }).catch(err => {
          setloading(false)




          if (err) {

          }
        })

    } else {
      
      {!SelecteditName_Check && 
        setERROR_Name("Please enter a Name")
      }
      {!Selecteditnumber_Check && 
        setERRORMobileNumber("Please enter a Mobile Number")
      }

    }


  }








  try {
    return (
      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />


        {editMode ?
          // edit mode
          <>
            <Text style={globalStyles.appTitle}>{'Contacts'}</Text>

            <Divider title={'Edit CONTACTS'} />
            <CartBox>

              <>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View>
                    <Text style={globalStyles.edit_heading}>{"Contact Name"}</Text>
                    <CustumTextInput title={"Contact Name"} value={SelecteditName} textLength={50} keyBoardType={"default"} errMessage={ERROR_Name}  updateMasterState={(value) => {(setSelecteditName(value));setERROR_Name("")}} />
                    <Text style={[globalStyles.edit_heading, { marginTop: 15 }]}>{"Contact Number"}</Text>
                    <CustumTextInput title={"Contact Number"} value={Selecteditnumber} textLength={8} keyBoardType={"number-pad"} errMessage={ERROR_MobileNumber}  updateMasterState={(value) => {(setSelecteditnumber(value));setERRORMobileNumber("")}} />
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

                <TouchableOpacity onPress={() => updateContact()} style={{ flexDirection: "row", justifyContent: "center" }}>
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
            <Text style={globalStyles.appTitle}>{t('Address.contact')}</Text>
            <Divider title={t('Address.view_contacts')} />
            {Data && Data.length > 0 &&
              Data.map((i, index) => (
                <CartBox>

                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "80%" }}>


                      <TouchableOpacity onPress={() => { setLocal(i.contact_number, i.contact_name) }} style={{ width: normalize(20), height: normalize(20) }}>


                        {i.contact_number == SelectMobileNumber ?
                          <CheckedBox /> : <UnCheckedBox />
                        }
                      </TouchableOpacity>

                      <View style={{ marginHorizontal: 20 }}>
                        <Text style={globalStyles.heading}>{i.contact_name}</Text>
                        <Text style={globalStyles.title}>+65 {i.contact_number}</Text>
                      </View>
                    </View>


                    <TouchableOpacity onPress={() => { setEditMode(true); setSelecteditnumber(i.contact_number); setSelecteditName(i.contact_name); setSelecteditid(i.id) }} style={{ flexDirection: "row", justifyContent: "center", width: "20%", }}>
                      <MiniCartBox >
                        <Feather name="edit-3" size={normalize(15)} color="white" />
                        <Text style={[globalStyles.title, { color: "white" }]}>   Edit</Text>

                      </MiniCartBox>
                    </TouchableOpacity>

                  </View>

                </CartBox>
              ))}

            {/* <Text style={globalStyles.appTitle}>{t('Address.contact')}</Text>
            <Divider title={t('Address.view_contacts')} />
            <CartBox>
              {Data && Data.length > 0 &&
                Data.map((i, index) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                      <TouchableOpacity onPress={() => { setLocal(i.contact_number, i.contact_name) }} style={{ marginRight: 20 }}>
                        {i.contact_number == SelectMobileNumber ?
                          <CheckedBox /> : <UnCheckedBox />
                        }
                      </TouchableOpacity>

                      <View>
                        <Text style={globalStyles.heading}>{i.contact_name}</Text>
                        <Text style={globalStyles.title}>+65 {i.contact_number}</Text>
                      </View>
                    </View>



                    <TouchableOpacity onPress={() => { setEditMode(true); setSelecteditnumber(i.contact_number); setSelecteditName(i.contact_name);setSelecteditid(i.id) }} style={{ flexDirection: "row", justifyContent: "center" }}>
                      <MiniCartBox >
                        <Feather name="edit-3" size={normalize(15)} color="white" />
                        <Text style={[globalStyles.title, { color: "white" }]}>   Edit</Text>

                      </MiniCartBox>
                    </TouchableOpacity>


                  </View>
                ))}
            </CartBox> */}
          </>
        }








      </BackGround>
    )
  } catch {

  }
}

export default Contact

const styles = StyleSheet.create({})