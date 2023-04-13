import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import GlobalModal, { ModalController, ModalData } from "react-native-global-modal-2"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { MenuBotton } from '../../custumsIcons';
import { IMAGES } from '../../globalImage';
import { AppLogo, PowerdBy } from '../../globalSvg';
import { globalStyles } from '../../helper/globalStyle';
import { normalize, wH, wW } from '../../helper/size';
import { DrawerListButton } from './drawerHelper';
import { useNavigation } from '@react-navigation/native';
import { Relogin } from '../../../stateManage/auth/actions';
import RNRestart from 'react-native-restart';
import { COLORS } from '../../helper/color';

// import { LogoutScreen } from '../../screen/auth/logout';




const Drawer = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  let { loginData } = useSelector(state => state.loginReducer);




  const LogoutScreen =  async ( ) => {
   
   await dispatch(Relogin({ status:false,data:{
      tocken:null
    }}))

    RNRestart.Restart()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity

        onPress={() => {
          const data = {
            customLayout: (
              <View
                style={{
                  height: wH, width: wW / 1.4,
                  backgroundColor: COLORS.appColor, right: wW / 20, borderBottomRightRadius: 20, borderTopEndRadius: 20,
                  padding: wW / 20
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AppLogo width={normalize(50)} height={normalize(50)} />

                  <View style={{ marginLeft: 10 }}>
                    <Text style={[globalStyles.loginHeading, { marginTop: 0 }]}>Customer</Text>
                    <Text style={{ fontSize: normalize(15), color: "#CCCCCC", fontFamily: "RedHatDisplay-Regular" }}>customermail@xyz.com</Text>
                  </View>
                </View>
                <View style={{ height: 2, backgroundColor: "#727272", marginVertical: 20 }}></View>


                <TouchableOpacity  onPress={() => { navigation.push('credits');ModalController.hide()}}>
                  <DrawerListButton imageSource={IMAGES.Money} title={'Credits'} />
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => { navigation.push('Address');ModalController.hide()}}>
                  <DrawerListButton imageSource={IMAGES.buildings} title={'Addresses'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.push('Contact');ModalController.hide()}}>
                  <DrawerListButton imageSource={IMAGES.useroctagon} title={'Contacts'} />
                </TouchableOpacity>

                
                <TouchableOpacity>
                  <DrawerListButton imageSource={IMAGES.translate} title={'Secondary Language'} />
                </TouchableOpacity>



                <View style={{ position: "absolute", bottom: 0, padding: wW / 20, flexDirection: "row", justifyContent: "space-between", width: wW / 1.4, }}>


                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => {LogoutScreen()}} style={{ backgroundColor: "#46494A", width: 50, height: 50, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
                      <MaterialIcons name="logout" size={normalize(25)} color="white" />

                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => {LogoutScreen()}} style={{}}>
                   
                    <Text style={[globalStyles.loginHeading, { marginTop: 0, fontSize: normalize(18) }]}>  Logout</Text>

                    </TouchableOpacity>
                  </View>



                  <PowerdBy width={normalize(80)} height={normalize(80)} />




                </View>

              </View>
            ),
          };
          ModalController.show(data);
        }}
      >
        <MenuBotton />
        {/* <Icon name="menu" size={wW / 18} /> */}
      </TouchableOpacity>
      <GlobalModal
        animationIn="bounceInLeft"
        animationOut="fadeOutLeftBig"
        // swipeDirection={'left'}
        onSwipeComplete={() => ModalController.hide}
        onBackdropPress={ModalController.hide}
      />
    </View>
  )
}

export default Drawer

const styles = StyleSheet.create({

})