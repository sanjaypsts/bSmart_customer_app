
import { StyleSheet, Text, View, Animated, Image } from 'react-native'
import React, { useRef, useEffect } from 'react';
import { AppLogo, PowerdBy } from './globalSvg';
import { useDispatch, useSelector } from 'react-redux';
import { SplashBackGround } from './component/backgroundImage';
import { normalize, wW } from './helper/size';
import { globalStyles } from './helper/globalStyle';
import MainLogin from './screen/auth/mainLogin';
import AppNavigation from './navigation/navigation';
import { useTranslation } from "react-i18next";
import Errorhandling from './errorHandle/errorhandling';
import { UPLOAD_IMAGE_PATH } from '../../config';
import DynamicAppLogo from './AppLogo';
import { App_Logo_Set } from '../stateManage/userDetails/actions';
import { fcmService } from '../../app/notification/Fcm';
import { localNotificationService } from '../../app/notification/Local';
import apicallHeaderPost from '../stateManage/apicallHeaderPost';




const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(

      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();

  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}


// useEffect(() => {


//   forgroundmsg()
//   requestUserPermission()
//   GetFCMToken()
//   console.log("haii")
//   NotificationListner()

// }, [])













const Splashscreen = ({ data }) => {
  const { loginData } = useSelector(state => state.loginReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(App_Logo_Set(data))

  }, [])

  useEffect(() => {
    fcmService.registerAppWithFCM();

    fcmService.register(onRegister, onNotification, onOpenNotification);

    localNotificationService.configure(onOpenNotification)
  }, [])




  const onRegister = (token) => {
    console.log('tocken', token)

    let formData = new FormData();
    formData.append('fcm_token', token);
    formData.append('allow_notification', 1);

    apicallHeaderPost(formData, 'cfcm_token_save', loginData.data.token)
      .then(response => {
        console.log(response)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {

        } else {

        }

      }).catch(err => {
        console.log(err)

        if (err) {

        }
      })

  }

  const onNotification = (notify) => {
    const options = {
      soundName: 'default',
      playSound: true,
    }

    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    )
  }

  const onOpenNotification = async (notify) => {


  }
  const trigger = async (notify) => {
    console.log("haii", notify)
  }

  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(function () {
      setIsVisible(false)
    }, 5000);
  }, [])



  let { t, i18n } = useTranslation();

  let Splash_Screen = (

    <FadeInView style={styles.container2}>
      <View></View>

      <View style={{ alignItems: 'center' }}>
        {/* <Image resizeMode="contain" source={{ uri: `${UPLOAD_IMAGE_PATH + data.logourl}` }}   style={{width:130,height:130}}  /> */}
        <DynamicAppLogo style={{ width: normalize(130), height: normalize(130) }} imageStyle={{ borderRadius: 10 }} />

        {/* <AppLogo width={normalize(130)} height={normalize(130)} /> */}
        <Text style={globalStyles.SplashHeading}>{t('splashScreen.splash')}</Text>

      </View>

      <View style={{ alignItems: "flex-end" }}>
        <PowerdBy width={normalize(110)} height={normalize(130)} />
      </View>
    </FadeInView >

  )

  try {
    return (

      <SplashBackGround >

        {
          isVisible ? Splash_Screen :
            loginData.status == true || loginData.status == 'true' ? <AppNavigation /> : <MainLogin />

        }

      </SplashBackGround>


    )
  } catch (e) {
    <Errorhandling />


  }

}


export default Splashscreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  container2: {
    flex: 1, justifyContent: "space-between", paddingHorizontal: wW / 20
  },
  appName: {
    color: "#0f2c6f", fontSize: 26, fontWeight: '700',
  }

})
