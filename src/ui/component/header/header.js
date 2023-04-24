import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { normalize, wW } from '../../helper/size';

import Drawer from '../drawer/drawer';
import { NotificationBotton } from '../../custumsIcons';
import { AppLogo } from '../../globalSvg';
import { useNavigation } from '@react-navigation/native';
import DynamicAppLogo from '../../AppLogo';

const DrawerHeader = ({}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const sliderOpen = () => {
      
        setModalVisible(true)

    }
    try {
        return (
            <>


                <View style={{ height: 70, alignItems: "center", flexDirection: 'row', justifyContent: "space-between" }}>


                    <Drawer
                        animationIn="fadeIn"
                        animationOut="fadeOut"

                    />
            <DynamicAppLogo style={{ width: normalize(40), height: normalize(40)}} imageStyle={{ borderRadius: 10 }} />

                    {/* <AppLogo width={normalize(40)} height={normalize(50)} /> */}
                    {/* <Ionicons name="notifications-outline" size={wW / 18} /> */}
                    <TouchableOpacity onPress={() => { navigation.push('Notification')}}>
                        <NotificationBotton />
                    </TouchableOpacity>

                </View>


            </>
        )
    } catch {

    }

}

export default DrawerHeader

const styles = StyleSheet.create({})