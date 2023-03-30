import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import { normalize, wH } from '../helper/size';

const LoadingModal = ({ loading, setloading }) => {

    try {
        return (
            <Modal
                isVisible={loading}
                deviceHeight={wH}
                // statusBarTranslucent={true}
                style={{ justifyContent: 'center', alignItems: "center" }}
            >
                <View style={{

                    backgroundColor: "white", width: 120, height: 120, justifyContent: "space-evenly", alignItems: "center", borderRadius: 20
                    // borderTopLeftRadius: 20,
                    // borderTopEndRadius: 20,
                    // flexDirection: 'row',
                    // justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color={"#2A69FE"} />
                    {/* <Text style={{fontSize:normalize(20)}}>{"fetching Your Data"}</Text> */}
                </View>
            </Modal>
        )
    } catch (e) {

    }
}

export default LoadingModal;