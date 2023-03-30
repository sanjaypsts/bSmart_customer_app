import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalize, wW } from '../helper/size';
















export const SmallCard = ({ imageSource, title }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 1, paddingVertical: 3,
            shadowColor: "#000",
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>
            <Image source={imageSource} style={{ width: 30, height: 30 }} />
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}


export const MediumCard = ({ imageSource, title }) => {
    return (
        <TouchableOpacity style={{
            alignItems: "center", backgroundColor: "white", height: 120, width: 120, justifyContent: "center", margin: 8,
            shadowColor: "#000",
            borderRadius: 40,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>
            <Image source={imageSource} style={{ width: 60, height: 60 }} />
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}



export const HorizontalCard = ({ imageSource, title }) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: "white", height: 100, marginHorizontal: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: 'space-between',
            shadowColor: "#000",
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
        }}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Image source={imageSource} style={{ width: 60, height: 60 }} />
                <View>
                    <Text>{title}</Text>
                    <Text>{title}</Text>
                </View>
            </View>


            <TouchableOpacity style={{ backgroundColor: "#0182A3", padding: 8, borderRadius: 100 }}>
                <Icon name="cart-variant" size={26} color="white" />

            </TouchableOpacity>


        </TouchableOpacity>
    )
}



export const GradiateHorizontalCard = ({ imageSource, title }) => {
    return (
        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
                backgroundColor: "white", marginHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: 'space-between',
                shadowColor: "#000",
                borderRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
            }}
        >

            <View style={{ height: 100, backgroundColor: "white", flex: 1, margin: 1.5, borderRadius: 10, }}>
                <Text>bcjhb</Text>
            </View>
        </LinearGradient>

    )
}



export const GradiateBotton = ({ imageSource, title }) => {
    return (


        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{
                height: 40, width: 100,
                backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 5,
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

            <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>

                <Text >-</Text>
            </TouchableOpacity>
            <Text style={{ color: "white" }}>10</Text>
            <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 50, alignItems: "center", justifyContent: "center", }}>
                <Text >+</Text>

            </TouchableOpacity>

        </LinearGradient>



    )
}


