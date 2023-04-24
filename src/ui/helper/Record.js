import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CartBox, globalStyles } from './globalStyle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalize } from './size';
import { COLORS } from './color';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const Record = () => {



    const [playStart, setplaystart] = React.useState(false)




    try {

        const [recordSecs,setrecordsec]=React.useState('');
        const [recordTime,setrecordTime]=React.useState('');
        const [currentPositionSec,setcurrentPositionSec]=React.useState('')
        const [currentDurationSec,setcurrentDurationSec]=React.useState('')
        const [playTime,setplayTime]=React.useState('')
        const [duration,setduration]=React.useState('')
        const request=async()=>{
          try {
            const grants = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        
            console.log('write external stroage', grants);
        
            if (
              grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              grants['android.permission.RECORD_AUDIO'] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
              console.log('Permissions granted');
            } else {
              console.log('All required permissions not granted');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        const audio=new AudioRecorderPlayer();
        audio.setSubscriptionDuration(0.09);
        const audioPath ='/path/to/audio/file';
       const startRecording=async()=> {
        console.log("data start")
          
        setplaystart(true)
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
        console.log('audioSet', audioSet);
        const uri = await audio.startRecorder(path, audioSet);
        audio.addRecordBackListener((e) => {
          setrecordsec(e.currentPosition)
          setrecordTime(audio.mmssss(
            Math.floor(e.currentPosition),
          ),)
        });
        console.log(`uri: ${uri}`);
        }
        
        const stopRecording=async()=> {
          console.log('lol')
        setplaystart(false)

          const result = await audio.stopRecorder();
          audio.removeRecordBackListener();
          console.log('stpped');
          setrecordsec(0)
          
        }
        const playaudio=async()=>{
          const dirs = RNFetchBlob.fs.dirs;
        const path = Platform.select({
          ios: 'hello.m4a',
          android: `${dirs.CacheDir}/hello.mp3`,
        });
        //console.log('lol2')
          const msg = await audio.startPlayer(path);
          audio.setVolume(1.0);
         // console.log(msg);
          audio.addPlayBackListener((e) => {
            console.log(e,'e')
            if (e.current_position === e.duration) {
              console.log('finished');
              audio.stopPlayer();
            }
            setcurrentPositionSec(e.current_position);
            setcurrentDurationSec(e.duration);
            setplayTime(audio.mmssss(
              Math.floor(e.current_position),
            ))
            setduration(audio.mmssss(Math.floor(e.duration)))
            // this.setState({
            //   currentPositionSec: e.current_position,
            //   currentDurationSec: e.duration,
            //   playTime: audio.mmssss(
            //     Math.floor(e.current_position),
            //   ),
            //   duration: audio.mmssss(Math.floor(e.duration)),
            // });
          });
        }
        //console.log(recordSecs,'lol')
        const onStopPlay=async()=>{
          audio.stopPlayer();
          audio.removePlayBackListener();
        }

        return (
            <View style={{ marginTop: 15 }}>
                <CartBox>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[{ width: "50%", color: COLORS.appOppsiteTextColor }]}>
                            Delivery notes by customer goes here
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "50%" }}>
                            <Text style={[globalStyles.cart_heading1, {}]}>{'0.5'}{recordSecs}</Text>


                            <>
                                {playStart ?



                                    <TouchableOpacity disabled={true} onPress={() => { stopRecording() }} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name="pause" size={normalize(25)} color="#71D67A" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity disabled={true} onPress={() => { startRecording() }} style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name="play" size={normalize(25)} color="#71D67A" />
                                    </TouchableOpacity>

                                }

                            </>



                            <TouchableOpacity style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIcons name="delete" size={normalize(25)} color="#FF5D5D" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </CartBox>
            </View>

        )
    } catch (error) {

    }
}

export default Record

const styles = StyleSheet.create({})