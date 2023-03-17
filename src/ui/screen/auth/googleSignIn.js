import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';



const GoogleSignIn = () => {
    return (
        <View>
            <Text>Googl eSignIn</Text>
            <Button title={'Sign in with Google'} onPress={() => {
                GoogleSignin.configure({
                    androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
                    iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
                });
                GoogleSignin.hasPlayServices().then((hasPlayService) => {
                    if (hasPlayService) {
                        GoogleSignin.signIn().then((userInfo) => {
                            console.log(JSON.stringify(userInfo))
                        }).catch((e) => {
                            console.log("ERROR IS: " + JSON.stringify(e));
                        })
                    }
                }).catch((e) => {
                    console.log("ERROR IS: " + JSON.stringify(e));
                })
            }} />
        </View>
    )
}

export default GoogleSignIn

const styles = StyleSheet.create({})