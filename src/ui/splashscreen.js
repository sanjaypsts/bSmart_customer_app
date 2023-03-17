
import { StyleSheet, Text, View, StatusBar, Image, Platform, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react';
import { AppLogo, PowerdBy } from './globalSvg';





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

const Splashscreen = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  React.useEffect(() => {
    setTimeout(function () {
      setIsVisible(false)
    }, 2000);
  }, [])


   

  let Splash_Screen = (

    <FadeInView style={styles.container2}>
      <View></View>

      <View style={{  alignItems: 'center' }}>
        <AppLogo width={180} height={180} />
      </View>

      <View style={{  alignItems: "flex-end" }}>
        <PowerdBy width={100} height={150} />
      </View>
    </FadeInView >

  )

  return (

    <View style={styles.container}>
      <StatusBar hidden={false} />
      {
        isVisible ? Splash_Screen : Splash_Screen
      }

    </View>

  )
}

export default Splashscreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  container2: {
    flex: 1, justifyContent: "space-between",
  },
  appName: {
    color: "#0f2c6f", fontSize: 26, fontWeight: '700',
  }

})
