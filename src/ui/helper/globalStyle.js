import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { APPCOLORS } from "./appColors"
import { normalize, wH, wW } from "./appSize";

export const Dateformat = 'DD MMM Y • h:mm a';


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
                {loadingStaus ? <ActivityIndicator color={APPCOLORS.appTextColor} /> :
                    <Text style={{ color: APPCOLORS.appTextColor }}>{title}</Text>}


            </LinearGradient>
        </View>

    )
}



export const CartBox = ({ children }) => {
    return (
        <View style={{
            backgroundColor: APPCOLORS.appLightColor, padding: 15, borderRadius: 10, borderColor: "#CCCCCC", borderWidth: 0.5,

        }}
        >
            {children}

        </View>

    )
}

export const MiniCartBox = ({ children }) => {
    return (
        <View style={{
            backgroundColor: "#656A71", padding: 10, borderRadius: 8, borderColor: "#CCCCCC", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"

        }}
        >
            {children}

        </View>

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



export const OneLineDivider = ({ imageSource, title }) => {
    return (
        <View style={{ height: 1, backgroundColor: "#8E8E8E", width: "100%", marginVertical: 15 }}></View>

    )
}



export const CustumModal = ({ children }) => {

    return (

        <View style={{ maxHeight: wH - 100 }}>
            <ScrollView bounces={false} >

                <View style={{
                    backgroundColor: APPCOLORS.appTextColor
                    , width: wW, /* borderRadius: wW / 10, */
                    borderTopLeftRadius: wW / 12,
                    borderTopRightRadius: wW / 12,
                    paddingVertical: wW / 20
                }}>
                    <View style={{ justifyContent: "center", width: wW, alignItems: 'center' }}>
                        <View style={{ width: normalize(72), backgroundColor: "#202020", height: 5, marginVertical: 8, borderRadius: 10 }}></View>
                    </View>
                    <View style={{ paddingHorizontal: wW / 20}}>
                    {children}

                    </View>
                </View>

            </ScrollView>
        </View>




    )
}


