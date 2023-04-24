import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MainLogin from './src/ui/screen/auth/mainLogin'
import { store, persistor } from './src/stateManage/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Splashscreen from './src/ui/splashscreen';
import Errorhandling from './src/ui/errorHandle/errorhandling';
import { COLORS } from './src/ui/helper/color';
import { useEffect } from 'react';
import apicallHeader from './src/stateManage/apicallHeader';


const App = () => {
  const [Data, setData] = useState([]);
  const [Status, setStatus] = useState([]);


  useEffect(() => {
    getData()
  }, [])




  const getData = () => {

    apicallHeader('appNames')
      .then(response => {

        if (response.status == 200 && response.data.status == true || response.data.status == 'true' && response.data.data != undefined) {

          setData(response.data.data)
          setStatus(true)


        } else {

        }
      }).catch(err => {

        if (err.status == 401) {

        } else {

        }

      })
  }



  try {
    return (
      <Provider store={store}>
        <PersistGate loading={<Text>{/* Lo ading... */}</Text>} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: COLORS.appColor }}>
            <StatusBar animated={true} backgroundColor={COLORS.appColor} barStyle={COLORS.barStyle} />
            {Status && Data.logourl != undefined &&

              <Splashscreen data={Data} />
            }
            

          </View>
        </PersistGate>
      </Provider>

    )
  } catch {
    <Errorhandling />

  }
}

export default App

const styles = StyleSheet.create({})
