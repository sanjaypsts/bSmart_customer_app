import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import MapView, { Marker } from 'react-native-maps'

import MapViewDirections from 'react-native-maps-directions'
import { useEffect } from 'react'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useSelector } from 'react-redux'



const MAPScreen = ({ORDERiD}) => {

  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);
  const { loginData } = useSelector(state => state.loginReducer);

  useEffect(() => {
    // Simulating delivery boy location updates
    const interval = setInterval(() => {
      const randomLocation = {
        latitude: 10.999821 ,
        longitude: 77.009009
      };
      setDeliveryBoyLocation(randomLocation);

      console.log("Add")

      // apicallHeaderPost({"order_id" : ORDERiD },'mdriverLocationtrack', loginData.data.token)
      //   .then(response => {

      //     console.log("============>")

      //     if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
      //       const newdata = response.data
      //       console.log(newdata)
           
  
      //     } else {

      //     }

      //   }).catch(err => {

      //     console.log("============>",err.response.data)

      //     if (err) {

      //     }
      //   })
    }, 2000);

    return () => clearInterval(interval);
  }, []);



  try {
    return (

      <View style={[{ height: 350, backgroundColor: "grey", marginVertical: 10 }]}>
        <MapView
          style={StyleSheet.absoluteFill}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsMyLocationButton={true}

          initialRegion={{
            latitude: 11.004230,
            longitude: 77.024323,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          region={{
            latitude: 11.004230,
            longitude: 77.024323,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}

          //  ref={mapViewRef}
          followsUserLocation={true}
          loadingEnabled={true}
        >
          {/* {parseFloat("11.0273751") != 0 && "11.0273751" != undefined && */}
          <MapViewDirections
            origin={{ latitude: 11.004230, longitude: 77.024323 }}
            destination={deliveryBoyLocation}
            precision={'high'}
            apikey={'AIzaSyBpBY0RVXr2dsp8v3rOKGAnKfPI7GZMaxA'}
            strokeWidth={5}
            strokeColor="blue"
            optimizeWaypoints={false}
          />
          {/* } */}

          {/* <Marker
              coordinate={{ latitude: parseFloat("11.0273751"), longitude: parseFloat("143.618683") }}

              description={"Start location"}
            />
            {"11.0273751" != undefined && "11.0273751" != null && <Marker
              coordinate={{ latitude: parseFloat("11.0273751"), longitude: parseFloat("143.618683") }}

              description={"End location"}
            />} */}

          {parseFloat(11.0273751) != 0 && 11.0273751 != undefined && <MapViewDirections
            origin={{ latitude: parseFloat(11.0273751), longitude: parseFloat(143.618683) }}
            destination={{ latitude: parseFloat(11.0273751), longitude: parseFloat(143.618683) }}
            precision={'high'}
            apikey={'AIzaSyBcnDz-14ITIhyPraqvyhGBLk9LjwCK9mM'}
            strokeWidth={5}
            strokeColor="blue"
            optimizeWaypoints={false}
          />}

          <Marker
            coordinate={{ latitude: 11.004230, longitude: 77.024323 }}

            description={"Start location"}
          />
          {deliveryBoyLocation && <Marker coordinate={deliveryBoyLocation} description={"End location"} />}
          {/* {11.0273751 != undefined && 11.0273751 != null && <Marker
            coordinate={{ latitude: 10.999821, longitude: 77.009009 }}

            description={"End location"}
          />} */}
        </MapView>
      </View>




    )
  } catch (e) {
    console.log(e)


  }
}

export default MAPScreen

const styles = StyleSheet.create({})
