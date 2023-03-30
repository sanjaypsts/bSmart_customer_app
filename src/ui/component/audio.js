import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AudioRecord from 'react-native-audio-record';
 const  Audio = ()  => {
  const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};
 
// AudioRecord.init(options);
 
// AudioRecord.start();
 
// AudioRecord.stop();
// // or to get the wav file path
// audioFile =  AudioRecord.stop();
 
// AudioRecord.on('data', data => {
//   // base64-encoded audio data chunks
// });

const startRecord = () => {

  
}
  return (
    <TouchableOpacity onPress={() =>startRecord()}>
      <Text >Audio</Text>
    </TouchableOpacity>
  )
}

export default Audio

const styles = StyleSheet.create({})