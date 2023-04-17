
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Splashscreen from './src/ui/component/splashScreen'
import ErrorHandle from './src/ui/ErrorHandling/error'
import Background from './src/ui/helper/background'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/Data/store'


const App = () => {
  try {

    return (
      <Provider store={store}>
        <PersistGate loading={<Text>{/* Lo ading... */}</Text>} persistor={persistor}>
          <Background withoutpadding={true}>

            <Splashscreen />
          </Background>
        </PersistGate>
      </Provider>
    )

  } catch (error) {
    <ErrorHandle error_message={error} />
  }
}

export default App

const styles = StyleSheet.create({})
