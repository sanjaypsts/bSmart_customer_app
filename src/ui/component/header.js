import {  StyleSheet,  TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'




import { useNavigation } from '@react-navigation/native';
import { normalize } from '../helper/appSize';
import { AppLogo } from '../helper/appSvg';
import { NotificationBotton } from '../helper/appcustumsIcons';
import Drawer from '../navigation/drawer/drawer';

const DrawerHeader = ({}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    try {
        return (
            <>


                <View style={{ height: 70, alignItems: "center", flexDirection: 'row', justifyContent: "space-between" }}>


                    <Drawer
                        animationIn="fadeIn"
                        animationOut="fadeOut"

                    />
                    <AppLogo width={normalize(40)} height={normalize(50)} />
                 
                    <TouchableOpacity >
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