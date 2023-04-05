import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackGround from './backgroundImage'
import BackBottonHeader from './header/dashboardHeader'
import { globalStyles } from '../helper/globalStyle'
import { useTranslation } from 'react-i18next'
import apicallHeaderPost from '../../stateManage/apicallHeaderPost'
import { useSelector } from 'react-redux'
import { OrderNotification, OTPNotification } from '../globalSvg'
import { normalize } from '../helper/size'
import LoadingModal from './loading'
import NoDataFound from '../errorHandle/noDataFound'


const Notification = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [DATA, setDATA] = useState([]);
  const [loading, setloading] = useState(false);
  const { loginData } = useSelector(state => state.loginReducer);


  const goBack = () => {
    navigation.goBack(null)
  };

  useEffect(() => {

    getData()

  }, [])




  const getData = () => {
    setDATA([])

    setloading(true)

    apicallHeaderPost({ 'limit': 50, }, 'getCustomerNotificationDetails', loginData.data.token)
      .then(response => {


        setloading(false)
        if (response.data.status == true || response.data.status == 'true') {
          setDATA(response.data.data.notification_list)
        } else {

        }

      }).catch(err => {
        setloading(false)



        if (err) {

        }
      })
  }




  const renderNotificationItem = ({ item }) => {

    return (
      <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 10 }}>
        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: "#424445", borderRadius: 30 }}>
          {item.type == 'OTP' ? <OTPNotification width={normalize(20)} height={normalize(20)} /> : <OrderNotification width={normalize(20)} height={normalize(20)} />}
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Text style={globalStyles.notifyHeading}>{item.creats_for}</Text>
          <Text style={globalStyles.notifytitle}>{item.description}</Text>
        </View>

      </View>
    )
  }

  return (
    <BackGround>
      <LoadingModal loading={loading} setloading={setloading} />

      <BackBottonHeader updateSingleCategory={(text) => { goBack(false) }} />

      <Text style={globalStyles.appTitle}>{t('Notifications.notifications')}</Text>



      {DATA.length == 0 ? <NoDataFound /> :


        <FlatList
          data={DATA}
          renderItem={(item) => renderNotificationItem(item)}
        />
      }
    </BackGround>
  )
}

export default Notification

const styles = StyleSheet.create({})