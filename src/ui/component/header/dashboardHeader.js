import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { normalize, wW } from '../../helper/size';
import { BackBotton, LanguageBotton, NotificationBotton } from '../../custumsIcons';
import { AppLogo } from '../../globalSvg';
import DynamicAppLogo from '../../AppLogo';


const BackBottonHeader = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { langBtnDisable,logoHide } = props;

    const onChangeChild = (updatedValue) => {
        const { updateSingleCategory, } = props;
        updateSingleCategory(updatedValue);
    };

    try {
        return (
            <>


                <View style={{ height: 70, alignItems: "center", flexDirection: 'row', justifyContent: "space-evenly",width:"100%",paddingHorizontal:wW/20 }}>
                    <View   >
                        <TouchableOpacity onPress={() => { onChangeChild("backBotton") }}>
                            <BackBotton />
                        </TouchableOpacity>
                    </View>


                    <View style={{width:"100%" ,alignItems:"center",}}>
                    {!logoHide && 
            <DynamicAppLogo style={{ width: normalize(40), height: normalize(40) }} imageStyle={{ borderRadius: 10 }} />

                        // <AppLogo width={normalize(40)} height={normalize(50)} />
                    }
                    </View>



                    {/* <Ionicons name="notifications-outline" size={wW / 18} /> */}

                    <View  >
                        {langBtnDisable == true ? 
                            <TouchableOpacity disabled={true} onPress={() => { onChangeChild("language") }}>
                                <LanguageBotton />
                            </TouchableOpacity>
                            :<View style={{width:50}}>
                                 </View>
                        }
                    </View>

                </View>


            </>
        )
    } catch {

    }

}

export default BackBottonHeader

const styles = StyleSheet.create({})