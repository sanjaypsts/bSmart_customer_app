import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppLogo, PowerdBy } from '../helper/appSvg'
import { normalize } from '../helper/appSize'
import { App_text_styles } from '../helper/appText'
import ErrorHandle from '../ErrorHandling/error'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useEffect } from 'react'
import MainAuth from '../authentication/mainAuth'
import { useState } from 'react'
import Background from '../helper/background'
import AppNavigation from '../navigation/navigation'
import { useSelector } from 'react-redux'

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const Splashscreen = () => {

  const [isVisible, setIsVisible] = useState(true);
  React.useEffect(() => {
    setTimeout(function () {
      setIsVisible(false)
    }, 2000);
  }, [])


  try {
    let { t } = useTranslation();

    let Splash_Screen = (

      <FadeInView style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <AppLogo width={normalize(128)} height={normalize(128)} />
        <Text style={App_text_styles.SplashHeading}>{t('splashScreen.splash')}</Text>
        <View style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
          <PowerdBy width={normalize(128)} height={normalize(128)} />
        </View>
      </FadeInView>

    )
    let { identifyData, userDetails } = useSelector(state => state.loginReducer);
console.log(identifyData.loginStatus)
    return (
      <Background withoutpadding={true}>
        {
          isVisible ? Splash_Screen :
            identifyData.loginStatus == true || identifyData.loginStatus == 'true' ?
      
              <AppNavigation /> : <MainAuth />
              
        }
      </Background>
    )


  } catch (error) {
    <ErrorHandle error_message={error} />
  }
}

export default Splashscreen

const styles = StyleSheet.create({})