import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackGround from './backgroundImage'
import BackBottonHeader from './header/dashboardHeader'
import { globalStyles } from '../helper/globalStyle'
import { useTranslation } from 'react-i18next'
import apicallHeaderPost from '../../stateManage/apicallHeaderPost'
import { useDispatch, useSelector } from 'react-redux'
import { OrderNotification, OTPNotification } from '../globalSvg'
import { normalize } from '../helper/size'
import LoadingModal from './loading'
import NoDataFound from '../errorHandle/noDataFound'
import Toast from 'react-native-simple-toast';
import { COLORS } from '../helper/color'
import { Order_SET } from '../../stateManage/order/actions'


const Notification = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [DATA, setDATA] = useState([]);

  const [ReadData, setReadData] = useState([]);
  const [UnReadReadData, setUnReadReadData] = useState([]);

  const [loading, setloading] = useState(false);
  const { loginData } = useSelector(state => state.loginReducer);

  const goBack = () => {
    navigation.goBack(null)
  };

  useEffect(() => {
    getData()
  }, [])


  const dispatch = useDispatch()

  const getData = () => {
    setDATA([])
    setloading(true)
    apicallHeaderPost({ 'limit': 20, }, 'getCustomerNotificationDetails', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true' && response.data.data != undefined && response.data.data.notification_list != undefined) {
          setDATA(response.data.data.notification_list)
          // setReadData(response.data.data.notification_list.read)
          // setUnReadReadData(response.data.data.notification_list.unread)

          getOrderData()
     
        } else {

        }
      }).catch(err => {
   
        setloading(false)
        if (err.status == 401) {

        } else {
        
          {
            err.response != undefined && err.response.data.message != undefined ?
              Toast.showWithGravity(err.response.data.message, Toast.SHORT, Toast.BOTTOM)
              :
              Toast.showWithGravity("'Somthing went wrong'", Toast.LONG, Toast.BOTTOM)
          }
        }

      })
  }

  const getOrderData = () => {
   
  
    let formData = new FormData();
    formData.append('customer_id', loginData.data.customer_shipping_address_alias_id.id);
    formData.append('sorting', JSON.stringify({ "id": "desc" }));
    dispatch(Order_SET(formData,"mpreviousOrderDetailsByCustomerId",loginData.data.token))
  
}



  const renderreadNotificationItem = ({ item }) => {

    return (

      <TouchableOpacity onPress={() => { navigation.push('OrderDetails', { id: item.order_id }) }}  style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 10, alignItems: "center" }}>

        {item.readable != 1 &&
          <View style={{ width: 8, height: 8, backgroundColor: "green", borderRadius: 20 }}>
          </View>

        }



        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
          {item.type == 'OTP' ? <OTPNotification width={normalize(20)} height={normalize(20)} /> : <OrderNotification width={normalize(20)} height={normalize(20)} />}
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Text style={globalStyles.notifyHeading}>{item.description}</Text>
          {/* <Text style={globalStyles.notifytitle}>{item.time}</Text> */}
          <Text style={globalStyles.notifytitle}>{item.time}</Text>

        </View>

      </TouchableOpacity>
    )
  }

  const onRefresh = async () => {

    getData()

  };

  try {

    return (
      <BackGround>
        {/* <LoadingModal loading={loading} setloading={setloading} /> */}

        <BackBottonHeader updateSingleCategory={(text) => { goBack(false) }} />

        <Text style={globalStyles.appTitle}>{t('Notifications.notifications')}</Text>

        {/* <Text style={{ color: COLORS.appTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Medium", marginVertical: 10 }}>Newer</Text> */}

        <FlatList
          data={DATA}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          renderItem={(item) => renderreadNotificationItem(item)}
        />




        {/* <Text style={{ color: COLORS.appTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Medium", marginVertical: 10 }}>Older</Text>



        <FlatList
          data={ReadData}
          onRefresh={onRefresh}
          refreshing={loading}
          renderItem={(item) => renderreadNotificationItem(item)}
        /> */}



      </BackGround>
    )

  } catch (error) {

  }
}

export default Notification

const styles = StyleSheet.create({})