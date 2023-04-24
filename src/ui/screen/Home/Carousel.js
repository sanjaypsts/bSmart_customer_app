import React from 'react';
import { Text, Dimensions, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { normalize, wW } from '../../helper/size';
import Imagewithloader from '../../component/imageloading';
import { UPLOAD_IMAGE_PATH } from '../../../../config';
import { useState } from 'react';
import { globalStyles } from '../../helper/globalStyle';

const colors = [{ colors: '#E3F2F5', data: "Offer Listing" }, { colors: 'thistle' }, /* 'thistle', 'skyblue', 'teal' */];
const currentdate = new Date()

const App = ({ data, index }) => (

  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      index={index}
      showPagination
      paginationActiveColor={"blue"}
      paginationStyleItem={{ width: 8, height: 8 }}
      data={data}
      renderItem={({ item }) => (


        <ImageBackground resizeMode="contain"  style={[styles.child, { backgroundColor: '#E3F2F5', flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }]}  /* blurRadius={20}  */source={{ uri: `${UPLOAD_IMAGE_PATH + item.imagesource}` }} imageStyle={{borderRadius: 10}} >

          {/* <View>
            <Text style={[globalStyles.heading, {}]}>{item.heading}</Text>
            <Text style={[globalStyles.title, { color: "black" }]}>{item.title}</Text>
          </View>

          <Image resizeMode="contain" source={{ uri: `${UPLOAD_IMAGE_PATH + item.imagesource}` }} style={{ width: "50%", height: "100%", }} />
 */}

        </ImageBackground>
        // <View style={[styles.child, { backgroundColor: '#E3F2F5', flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }]}>

        //   <View>
        //     <Text style={[globalStyles.heading, {}]}>{item.heading}</Text>
        //     <Text style={[globalStyles.title, {color:"black"}]}>{item.title}</Text>
        //   </View>

        //   <Image resizeMode="contain" source={{ uri: `${UPLOAD_IMAGE_PATH + item.imagesource}` }} style={{ width: "50%", height: "100%", }} />
        // </View>


      )}
    />
  </View>
);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, height: 150 },
  child: { width: (wW - normalize(50)), alignItems: "flex-start", padding: 10, borderRadius: 10, marginHorizontal: 5 },
  text: { fontSize: normalize(18), textAlign: 'center', color: "black" },
});

export default App;