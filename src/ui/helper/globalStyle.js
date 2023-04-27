import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./color";
import { normalize, wH, wW } from "./size";

import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view';

export const Dateformat = 'DD MMM Y • h:mm a';

export const globalStyles = StyleSheet.create({


    // splashScreen
    SplashHeading: {
        color: COLORS.appTextColor, fontSize: normalize(18), marginTop: normalize(35), fontFamily: "RedHatDisplay-Medium", textAlign: "center",
        width: "70%",



    },
    modalStyle: {
        backgroundColor:COLORS.appLightColor
           , width: wW, /* borderRadius: wW / 10, */
        borderTopLeftRadius: wW / 12,
        borderTopRightRadius: wW / 12,
        paddingVertical: wW / 20
    },


    //   
    // login ,sign up and forgetPassword

    loginHeading: {
        color: COLORS.appTextColor, fontSize: normalize(25), marginTop: normalize(35), fontFamily: "RedHatDisplay-Bold"
    },
    loginTitle: {
        fontSize: normalize(15), marginTop: normalize(5), paddingHorizontal: wW / 20, textAlign: "center", color: "#CCCCCC", fontFamily: "RedHatDisplay-Regular"
    },
    logininputText: {
        color: COLORS.appTextColor, fontSize: normalize(16), marginLeft: 5, fontFamily: "RedHatDisplay-Regular", flex: 1, marginRight: 30
    },
    inputText: {
        color: COLORS.appOppsiteTextColor, fontSize: normalize(16), borderBottomColor: "grey", borderBottomWidth: 2, fontFamily: "RedHatDisplay-Regular", width: "100%", height: 50
    },






    // Apptitle
    appTitle: {
        color: COLORS.appTextColor, fontSize: normalize(20), fontFamily: "RedHatDisplay-Medium"
    },
    appSubtitle: {
        color: COLORS.appTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Regular",

    },



    // app contant title
    heading: {
        color: COLORS.appOppsiteTextColor, fontSize: normalize(18), fontFamily: "RedHatDisplay-Bold",

    },
    title: {
        color: COLORS.appColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Medium",

    },

    // edit contant title
    edit_heading: {
        color:  COLORS.appOppsiteTextColor,  fontSize: normalize(15), fontFamily: "RedHatDisplay-Medium",

    },
    edit_title: {
        color:  COLORS.appOppsiteTextColor,  fontSize: normalize(15), fontFamily: "RedHatDisplay-Regular"

    },


    // notification
    notifyHeading: {
        color: COLORS.appTextColor, fontSize: normalize(18), fontFamily: "RedHatDisplay-Medium"

    },
    notifytitle: {
        color: "#CCCCCC", fontSize: normalize(15), fontFamily: "RedHatDisplay-Regular",

    },



    // Category

    categoryProductText: {
        color:COLORS.appOppsiteTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Bold",

    },





    // cart details 

    cart_heading1: {
        color: COLORS.appOppsiteTextColor, fontSize: normalize(16), fontFamily: "RedHatDisplay-Bold",

    },
    cart_title: {
        color:  COLORS.appOppsiteTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-SemiBold",

    },
    cart_title2: {
        color: COLORS.appOppsiteTextColor, fontSize: normalize(15), fontFamily: "RedHatDisplay-Medium"

    },





    // order details

    order_heading1: {
        color:  COLORS.appOppsiteTextColor, fontSize: normalize(16), fontFamily: "RedHatDisplay-Bold",

    },
    order_title: {
        color: "Blue", fontSize: normalize(12), fontFamily: "RedHatDisplay-SemiBold",

    },
    order_title2: {
        color:  COLORS.appOppsiteTextColor, fontSize: normalize(12), fontFamily: "RedHatDisplay-Medium"

    },






});




export const GradientGenerate = ({ colors, ...rest }) => {
    return (
        <MaskedView maskElement={<Text {...rest} />}>
            <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 0 }}>
                <Text {...rest} style={[rest.style, { opacity: 0, fontFamily: 'Inter-Medium' }]} />
            </LinearGradient>
        </MaskedView>
    );
};
    

export const GradiateText = ({ title }) => {
    return (

        <GradientGenerate colors={['#03234C', '#03234C', '#03234C']} style={[]}>{title}</GradientGenerate>


    )
}



export const Divider = ({ imageSource, title }) => {
    return (
        <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-evenly", alignItems: "center", }}>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "25%" }}></View>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                <Image source={imageSource} style={{ height: 20, borderRadius: 10 }} />
                <Text style={{ color: "white", }}>{title}</Text>

            </View>
            <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "25%" }}></View>

        </View>

    )
}



export const CartBox = ({ children }) => {
    return (
        <View style={{
            backgroundColor: COLORS.appLightColor, padding: 15, borderRadius: 12, borderColor: "#CCCCCC", borderWidth: 1,

        }}
        >
            {children}

        </View>

    )
}

export const MiniCartBox = ({ children,bg_color }) => {
    return (
        <View style={{
            backgroundColor:bg_color ? bg_color : "#656A71", padding: 10, borderRadius: 8, borderColor: "#CCCCCC", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"

        }}
        >
            {children}

        </View>

    )
}






export const SubmitBotton = ({ title, loadingStaus }) => {

    return (
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>

            <LinearGradient
                colors={['#03234C', '#03234C',]}
                start={{ x: 0.0, y: 2.0 }} end={{ x: 1.0, y: 1.0 }}
                style={{
                    height: 50, width: 300,
                    backgroundColor: "white", alignItems: "center", justifyContent: "center", padding: 5,
                    shadowColor: "#000",
                    borderRadius: 50,
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 15,
                }}
            >
                {loadingStaus ? <ActivityIndicator color={COLORS.appTextColor} /> :
                    <Text style={{ color: COLORS.appTextColor }}>{title}</Text>}


            </LinearGradient>
        </View>

    )
}





export const CheckedBox = ({ }) => {
    return (
        <View style={{
            backgroundColor: "#1B2F48", padding: 10, borderRadius: 20, borderColor: "black", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"

        }}
        >
            <View style={{
                backgroundColor: "#1B2F48",
            }}>

            </View>


        </View>

    )
}


export const UnCheckedBox = ({ }) => {
    return (
        <View style={{
            backgroundColor: "#E0EBF0", padding: 10, borderRadius: 20, borderColor: "#CCCCCC", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"

        }}
        >


        </View>

    )
}



export const CustumModal = ({ children }) => {

    return (

        <View style={{ maxHeight: wH - 100 }}>
              <View style={[globalStyles.modalStyle,]}>
                       <View style={{ justifyContent: "center", width: wW, alignItems: 'center' }}>
                        <View style={{ width: normalize(72), backgroundColor:  "#202020", height: 5, marginVertical: 8, borderRadius: 10 }}></View>
                    </View>
            <ScrollView bounces={false} style={{paddingHorizontal:wW/20}} >

              
         
                    {children}
           

            </ScrollView>
            </View>
        </View>




    )
}





export const BottomGradiate = ({ children,Sendcolor }) => {
 
    return (

        <View style={{  backgroundColor:Sendcolor ? "Blue" : "red",borderRadius:100 }}>
            {children}
        </View>
    )
}