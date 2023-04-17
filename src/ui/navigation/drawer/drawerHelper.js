import LinearGradient from "react-native-linear-gradient"
import { normalize } from "../../helper/appSize"
import { Image, Text, View } from "react-native"
import { APPCOLORS } from "../../helper/appColors"


export const DrawerListButton = ({ imageSource, title }) => {
    return (
        <View
            style={{
                flexDirection: "row", alignItems: "center", justifyContent: "center",
                shadowColor: "#329BFF", height: 60, backgroundColor: APPCOLORS.appSecondaryColor,
                marginTop: 10, padding: 0.8, borderRadius: 10,
            }}
        >
            <View style={{ flex: 1, height: "100%", backgroundColor: APPCOLORS.appLightColor, borderRadius: 10, flexDirection: "row", alignItems: "center", padding: 10 }}>
                <View style={{ backgroundColor: APPCOLORS.appColor, borderRadius: 50, width: normalize(35), height: normalize(35), justifyContent: "center", alignItems: "center", marginRight: 15, }}>

                    <Image style={[{ width: normalize(20), height: normalize(20), }]} source={imageSource} />
                </View>

                <Text style={{ color: APPCOLORS.appOppsiteTextColor, fontSize: normalize(13) }}>{title}</Text>
            </View>

        </View>

    )
}
