import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { APPCOLORS } from './appColors'
import { normalize } from './appSize'



export const App_text_styles = StyleSheet.create({

  SplashHeading: {
    color: APPCOLORS.appTextColor, fontSize: normalize(18), marginTop: normalize(35), fontFamily: "RedHatDisplay-Medium", textAlign: "center",
    maxWidth: "60%",
  },
  ErrorHeading: {
    color: APPCOLORS.appTextColor, fontSize: normalize(18), marginTop: normalize(35), fontFamily: "RedHatDisplay-Medium", textAlign: "center",
    width: "70%",
  },
  LoginHeading: {
    color: APPCOLORS.appTextColor, fontSize: normalize(32), marginTop: normalize(45), fontFamily: "RedHatDisplay-Bold", textAlign: "center",
    maxWidth: "60%",
  },
  LoginTitle: {
    color: APPCOLORS.appTextColor, fontSize: normalize(14), marginTop: normalize(8), fontFamily: "RedHatDisplay-Regular", textAlign: "center",
    maxWidth: "60%",
  },
  forgetPass:{
    color: APPCOLORS.appTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Medium", textAlign: "center",
 
  },

  ErrorMsg: {
    color: APPCOLORS.ErrorMsg, fontSize: normalize(14), marginTop: normalize(8), fontFamily: "RedHatDisplay-Regular", textAlign: "center",
    maxWidth: "60%",
  },


  // heading
  AppHeading: {
    color: APPCOLORS.appTextColor, fontSize: normalize(20),  fontFamily: "RedHatDisplay-Bold", 
    
  },
  AppHeading2: {
    color: APPCOLORS.appTextColor, fontSize: normalize(16),  fontFamily: "RedHatDisplay-Bold", 
    
  },
  AppHeading3: {
    color: APPCOLORS.appOppsiteTextColor, fontSize: normalize(16),  fontFamily: "RedHatDisplay-Bold", 
    
  },




  AppTitle: {
    color: "#BFBFBF", fontSize: normalize(16),  fontFamily: "RedHatDisplay-Regular", 
    
  },
  AppTitle2: {
    color: "#CCCCCC", fontSize: normalize(12),  fontFamily: "RedHatDisplay-SemiBold", 
    
  },
  AppTitle3: {
    color: "#CCCCCC", fontSize: normalize(14),  fontFamily: "RedHatDisplay-SemiBold", 
    
  },
  AppTitle4: {
    color:APPCOLORS.appOppsiteTextColor, fontSize: normalize(12),  fontFamily: "RedHatDisplay-SemiBold", 
    
  },
  AppTitle5: {
    color: APPCOLORS.appTextColor, fontSize: normalize(16),  fontFamily: "RedHatDisplay-Regular", 
    
  },






})