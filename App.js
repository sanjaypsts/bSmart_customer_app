import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLogin from './src/ui/screen/auth/mainLogin'
import { store } from './src/stateManage/store'
import {Provider} from 'react-redux';
// import { store, persistor } from './src/stateManage/store';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
    <View style={{ flex: 1,}}>
      <StatusBar animated={true} backgroundColor="white" barStyle={'dark-content'} />
      <MainLogin />
    </View>
    </Provider>
   
  //   <Provider store={store}>
  //   <PersistGate loading={<Text>{/* Loading... */}</Text>} persistor={persistor}>
  //     <View style={styles.container}>
  //       <StatusBar backgroundColor={'rgba(52, 52, 52, 0.8)'}

  //       />
  //       {
  //          <MainLogin />

  //       }
       

  //     </View>
  //   </PersistGate>
  // </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
