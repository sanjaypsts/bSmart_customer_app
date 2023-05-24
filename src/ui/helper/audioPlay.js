import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CartBox, globalStyles } from './globalStyle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { normalize } from './size';
import { COLORS } from './color';



import { useState } from 'react';



import AudioRecorderPlayer, { 

 } from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const audioRecorderPlayer = new AudioRecorderPlayer();




const AudioPlay = ({value}) => {
  console.log(value)
    console.log(value)
    const [recordSecs, setrecordsec] = React.useState('');
    const [recordTime, setrecordTime] = React.useState(0);
    const [currentPositionSec, setcurrentPositionSec] = React.useState('')
    const [currentDurationSec, setcurrentDurationSec] = React.useState('')
    const [playTime, setplayTime] = React.useState('')
    const [duration, setduration] = React.useState('')

    const [audiorecord, setaudiorecord] = React.useState(false)

    const [playStart, setplaystart] = React.useState(false)
    const [recordStart, setrecordstart] = React.useState(false)
  





  audioRecorderPlayer.setSubscriptionDuration(0.09);
  const audioPath ='/path/to/audio/file';
  const audioFormat = 'mp3';
  







  const onStartPlay = async () => {

    console.log('onStartPlay');

    const dirs = RNFetchBlob.fs.dirs;
    // const path = Platform.select({
    //   ios: 'hello.m4a',
    //   android: `${dirs.CacheDir}/hello.mp3`,
    // });
    //console.log('lol2')
    const path = Platform.OS === 'android' 
    ? '/storage/emulated/0/Download/audio.mp3'
    : 'file:///var/mobile/Containers/Data/Application/<app-id>/Library/audio.mp3';

    const msg = await audioRecorderPlayer.startPlayer(value);

    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
    
        audioRecorderPlayer.stopPlayer();
        console.log('finished',msg);
        setplaystart(false)
      }
      setcurrentPositionSec(e.currentPosition)
      setcurrentDurationSec(e.duration)
      setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
      setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))


      return;

    });

  };





  const onPausePlay = async () => {

    const msg = await audioRecorderPlayer.pausePlayer();

    console.log(msg);




  };







  onStopPlay = async () => {


    audioRecorderPlayer.stopPlayer();

    audioRecorderPlayer.removePlayBackListener();

  };






  return (

    <View style={{ marginTop: 15 }}>
      <CartBox>
        <View style={{ flexDirection: "row" }}>
          <Text style={[{ width: "50%", color: COLORS.appOppsiteTextColor }]}>
            Delivery notes by customer goes here
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "50%" }}>

  

              <Text style={[globalStyles.cart_heading1, {}]}>{playTime} </Text>

            




       
              <>
              {playStart ?
                  <TouchableOpacity onPress={() => { onStopPlay(); setplaystart(false) }} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="pause" size={normalize(25)} color="#71D67A" />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => { onStartPlay(); setplaystart(true) }} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="play" size={normalize(25)} color="#71D67A" />
                  </TouchableOpacity>

                }

              </>
            



          </View>
        </View>

      </CartBox>
    </View>

  )

}




export default AudioPlay



