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
import { useSelector } from 'react-redux'
import { CustumTextInput } from '../inputBox'
import LoadingModal from '../loading'
import NoDataFound from '../../errorHandle/noDataFound'

const Contact = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { loginData } = useSelector(state => state.loginReducer);
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [editMode, setEditMode] = useState(false);




  useEffect(() => {

    getData()

  }, [])



  const getData = () => {

    setloading(true)
    apicallHeaderPost({ customer_id: "" }, 'mgetParticularCustomerContactDetails', loginData.data.token)
      .then(response => {
   
        setloading(false)
        if (response.data.status == true || response.data.status == 'true') {
       
          setData(response.data.data)
        } else {

        }

      }).catch(err => {
        setloading(false)




        if (err) {

        }
      })
  }












  console.log(Data.length)

  try {
    return (
      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />


        {editMode ?
          // edit mode
          <>
            <Text style={globalStyles.appTitle}>{t('Address.edit_address')}</Text>

            <Divider title={t('Address.edit_shipping_address')} />
            <CartBox>
              {Data && Data.length > 0 &&
                Data.map((i, index) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                      <Text style={globalStyles.edit_heading}>{"Contact Name"}</Text>
                      <CustumTextInput title={"Contact Name"} value={i.contact_name} />
                      <Text style={[globalStyles.edit_heading, { marginTop: 15 }]}>{"Contact Number"}</Text>
                      <CustumTextInput title={"Contact Number"} value={i.contact_number} />
                    </View>
                  </View>
                ))}

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                <TouchableOpacity onPress={() => { setEditMode(false) }} style={{ flexDirection: "row", justifyContent: "center" }}>
                  <MiniCartBox>
                    <AntDesign name="close" size={normalize(16)} color="white" />
                    <Text style={globalStyles.title}> Cancel</Text>

                  </MiniCartBox>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }}>
                  <MiniCartBox>
                    <Feather name="check" size={normalize(15)} color="white" />
                    <Text style={globalStyles.title}>  Save</Text>

                  </MiniCartBox>
                </TouchableOpacity>
              </View>
            </CartBox>
          </>
          :

          <>
            <Text style={globalStyles.appTitle}>{t('Address.contact')}</Text>
            <Divider title={t('Address.view_contacts')} />
            <CartBox>
              {Data && Data.length > 0 &&
                Data.map((i, index) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, }}>
                    <View>
                      <Text style={globalStyles.heading}>{i.contact_name}</Text>
                      <Text style={globalStyles.title}>{i.contact_number}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { setEditMode(true) }} style={{ flexDirection: "row", justifyContent: "center" }}>
                      <MiniCartBox>
                        <Feather name="edit-3" size={normalize(15)} color="white" />
                        <Text style={globalStyles.title}>   Edit</Text>

                      </MiniCartBox>
                    </TouchableOpacity>


                  </View>
                ))}
            </CartBox>
          </>
        }








      </BackGround>
    )
  } catch {

  }
}

export default Contact

const styles = StyleSheet.create({})