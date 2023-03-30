import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLogin from './src/ui/screen/auth/mainLogin'
import { store, persistor } from './src/stateManage/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Splashscreen from './src/ui/splashscreen';
import Errorhandling from './src/ui/errorHandle/errorhandling';
import { COLORS } from './src/ui/helper/color';


const App = () => {
  try {
    return (
      <Provider store={store}>
        <PersistGate loading={<Text>{/* Loading... */}</Text>} persistor={persistor}>
          <View style={{ flex: 1, }}>
            <StatusBar animated={true} backgroundColor={COLORS.appColor} barStyle={COLORS.barStyle} />

            <Splashscreen />

          </View>
        </PersistGate>
      </Provider>

    )
  } catch {
    <Errorhandling/>

  }
}

export default App

const styles = StyleSheet.create({})
