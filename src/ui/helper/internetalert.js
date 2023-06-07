import React, { useEffect } from 'react';
import { Dimensions, Text, View, TouchableOpacity, Animated, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import { normalize, wH, wW } from './size';

const Toastwithoutanimation = ({ title, navigation, status,visible }) => {
  
      return (
         
          <Modal
          isVisible={visible}
         
          //statusBarTranslucent={true}
          
          style={{width:wW,margin:0,ajulignItems:'center' }}
         >
         {/* <StatusBar backgroundColor='rgba(197, 214, 250,0.1)'></StatusBar>   */}
             <View style={{
             
            height:wH,
              borderTopLeftRadius: 20,
              borderTopEndRadius: 20,
              flexDirection:'row',
              alignItems:'center',
              backgroundColor:'rgba(255, 255, 255,0.1)'
             // justifyContent:'flex-end'
          }}>
                 <View style={{
              position: 'absolute', bottom: 40,
              paddingHorizontal:25,
             }}>

          <View style={{
           
              backgroundColor: '#fff',
              width: Dimensions.get('window').width - 50,
             
              borderRadius: 5,
              flexDirection: 'row',
              //height: 40
          }}>
             {status ?  <View style={{
                  backgroundColor: 'green',
                  flex: 0.1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5
              }}/>
              :
              <View style={{
                  backgroundColor: 'red',
                  flex: 0.1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5
              }}/>
          }
              <Text style={{
                  flex: 5,
                  fontSize: normalize(16),
                  color: '#000',
                
                  marginTop: 12,
                  marginBottom:12,
                  marginHorizontal: 5,
                  fontWeight: '400',
                  paddingHorizontal:10
              }}>{title}</Text>
              <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
              }}>

              </View>
          </View>
  
          </View>
                  </View>
      </Modal>


        
      )
  }
  
  export {
      Toastwithoutanimation
  }
  