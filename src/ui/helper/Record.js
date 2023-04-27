import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CartBox, globalStyles } from './globalStyle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalize } from './size';
import { COLORS } from './color';



import { useState } from 'react';



import AudioRecorderPlayer, { 
  AVEncoderAudioQualityIOSType,
  AVEncodingOption, 
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType, 
 } from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const audioRecorderPlayer = new AudioRecorderPlayer();




const Record = () => {
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

  const onStartRecord = async () => {

    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: 'hello.m4a',
      android: `${dirs.CacheDir}/hello.mp3`,
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    console.log('audioSet', uri);

    // const result = await audioRecorderPlayer.startRecorder();

    audioRecorderPlayer.addRecordBackListener((e) => {





      const recordTime = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))

      setrecordsec(e.currentPosition)
      setrecordTime(recordTime)


      return;

    });



  };




  const onStopRecord = async () => {

    const result = await audioRecorderPlayer.stopRecorder();

    audioRecorderPlayer.removeRecordBackListener();


    setrecordsec(0)




    console.log(result, "stop");

  };







  const onStartPlay = async () => {

    console.log('onStartPlay');

    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: 'hello.m4a',
      android: `${dirs.CacheDir}/hello.mp3`,
    });
    //console.log('lol2')
  

    const msg = await audioRecorderPlayer.startPlayer(path);

    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        setplaystart(false)
        audioRecorderPlayer.stopPlayer();
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

            {!audiorecord?
              <Text style={[globalStyles.cart_heading1, {}]}>{recordTime}</Text>
              :
              <Text style={[globalStyles.cart_heading1, {}]}>{playTime} </Text>

            }




            {!audiorecord ?


              <>


                {!recordStart ?
                  <TouchableOpacity onPress={() => { onStartRecord(); setrecordstart(true) }} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="mic" size={normalize(25)} color="#64748B" />
                  </TouchableOpacity>
                  :

                  <TouchableOpacity onPress={() => { onStopRecord(); setrecordstart(false); setaudiorecord(true) }} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="stop" size={normalize(25)} color="red" />
                  </TouchableOpacity>
                }
              </>

              :

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


                <TouchableOpacity onPress={() =>  setaudiorecord(false)} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <MaterialCommunityIcons name="delete" size={normalize(25)} color="#FF5D5D" />
                </TouchableOpacity>

              </>
            }



          </View>
        </View>

      </CartBox>
    </View>

  )

}




export default Record



