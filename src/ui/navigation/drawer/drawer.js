import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,

} from 'react-native';
import GlobalModal, { ModalController, ModalData } from "react-native-global-modal-2"

import {  useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import { MenuBotton } from '../../helper/appcustumsIcons';
import { AppLogo, PowerdBy } from '../../helper/appSvg';
import { normalize, wH, wW } from '../../helper/appSize';
import { APPCOLORS } from '../../helper/appColors';
import LinearGradient from 'react-native-linear-gradient';
import { App_text_styles } from '../../helper/appText';
import { OneLineDivider } from '../../helper/globalStyle';
import { useState } from 'react';
import { DrawerListButton } from './drawerHelper';
import { IMAGES } from '../../helper/appImages';




const Drawer = ({ }) => {
  const navigation = useNavigation();

    let {  userDetails } = useSelector(state => state.loginReducer);
    const [drawerData, setdrawerData] = useState([

        {
            id: 1,
            Icon: IMAGES.Money,
            title: "Credits",
            value: "$10.99",
            navigate: "CreditScreen"
        },
        {
            id: 2,
            Icon: IMAGES.buildings,
            title: "Addresses",
            value: "",
            navigate: ""
        }


    ]);




    return (
        <View style={styles.container}>
            <TouchableOpacity

                onPress={() => {
                    const data = {
                        customLayout: (

                            <LinearGradient colors={['#03234C', '#06AAA8']} style={[{ width: wW / 1.4, height: wH, right: wW / 20, borderBottomRightRadius: 20, borderTopEndRadius: 20, padding: wW / 20 }]} >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <AppLogo width={normalize(40)} height={normalize(40)} />

                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={App_text_styles.AppHeading2}>{userDetails.DATA.alias_name}</Text>
                                        <Text style={App_text_styles.AppTitle2}>{userDetails.DATA.login_email}</Text>
                                    </View>
                                </View>
                                <OneLineDivider />

                                {drawerData && drawerData.length > 0 &&
                                    drawerData.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => { navigation.push(item.navigate);ModalController.hide()}}>

                                            <DrawerListButton imageSource={item.Icon} title={item.title} />
                                        </TouchableOpacity>
                                    ))}
                         
                            </LinearGradient>



                        ),
                    };
                    ModalController.show(data);
                }}
            >
                <MenuBotton />

            </TouchableOpacity>
            <GlobalModal
                animationIn="bounceInLeft"
                animationOut="fadeOutLeftBig"
                onSwipeComplete={() => ModalController.hide}
                onBackdropPress={ModalController.hide}
            />
        </View>
    )
}

export default Drawer

const styles = StyleSheet.create({

})