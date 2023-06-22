
import { ActivityIndicator, Dimensions, Image, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import Modal from 'react-native-modal';
import moment from 'moment';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import { useSelector } from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util'
import { UPLOAD_IMAGE_PATH } from '../../../../config';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import BackGround from '../../component/backgroundImage';
import { useEffect } from 'react';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import { wH, wW } from '../../helper/size';
import EvilIcons from "react-native-vector-icons/EvilIcons";

export const PdfSHowMOdal = (props) => {
    const { visible, idInvoice, UpdateVisible } = props

    const { loginData } = useSelector(state => state.loginReducer);

    const [pdfShow, setpdfShow] = useState(null);


    const onChange = () => {
        // setpdfShow(null)
        UpdateVisible(false)
    };

    useEffect(() => {
        // GendratePdf()
        setpdfShow("")
        Permission(idInvoice)




    }, [idInvoice])

    const Permission = async (value) => {

        try {

            if (Platform.OS === "ios") {
                await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then((result) => {
                    if (result == 'granted') {

                        GendratePdf(value)
                    }
                    else {
                        request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then((result) => {

                            if (result == 'granted') {
                                GendratePdf(value)
                                //  console.log("ss")
                            }
                            else if (result == "limited") {
                                GendratePdf(value)
                            }
                            else {
                                alert("Access denied ")
                            }
                        });
                    }
                })


            }
            else {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    GendratePdf(value)
                } else {


                }
            }
        }
        catch (err) {
            console.warn(err);
        }
    }


    const GendratePdf = (value) => {
       
        apicallHeaderPost({ 'order_id': value }, 'mdownloadBillPdf', loginData.data.token)

            .then(response => {
                console.log("value", value)
                console.log("response", response.data.data)
                // setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                    const path = response.data.data
                    const withoutSpaces = path.replaceAll(' ', '%20');
                    const name = "Invoice No" + value;
                    const url = (UPLOAD_IMAGE_PATH + withoutSpaces)

                    setpdfShow(url)
                    // Download(url,name)
                } else {

                }

            }).catch(err => {


                if (err) {
                    console.log("err", err.response)

                }
            })
    }

    try {

        const source = { uri: pdfShow, cache: true };
        // const pdfUrl = 'https://wms.demopsts.com/billpdfs/232.pdf';
        return (
            //         <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ margin: 0 }}
            //             onBackdropPress={() => onChange(false)}
            //             swipeDirection={'down'}
            //             onSwipeComplete={() => onChange(false)}
            //         >


            //             <BackGround>

            //   <Pdf
            //            trustAllCerts={false}
            //     source={{ uri: pdfUrl }}
            //     style={{ flex: 1, width: Dimensions.get('window').width }}
            //   />

            //             </BackGround>
            //         </Modal>
            <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ margin: 0, backgroundColor: 'black', justifyContent: "center", alignItems: "center" }}
                onBackdropPress={() => onChange(false)}
                swipeDirection={'down'}
                onSwipeComplete={() => onChange(false)}
            >

                <View style={{ position: "absolute", top: 50, right: 20 }}>
                    <TouchableOpacity onPress={() => onChange(false)}>
                        {/* <Text style={{color:"white"}}>{pdfShow}{idInvoice}</Text> */}
                        <EvilIcons name="close" size={wH / 20} color="#C0C7D7" />
                    </TouchableOpacity>

                </View>

                {pdfShow !== '' ? (

                <Pdf
                    trustAllCerts={false}
                    // source={{ uri: pdfShow}}
                    // cache={false}
                    source={source}
                    // cache={false}
                    onLoadComplete={(numberOfPages, filePath) => {
                        //     console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        //  console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        //    console.log(error);
                    }}
                    onPressLink={(uri) => {
                        //   console.log(`Link pressed: ${uri}`);
                    }}
                    singlePage={true}
                    style={styles.pdf} />


               )
               :
               <ActivityIndicator>
                
               </ActivityIndicator>
            
            }

            </Modal>
        )

    } catch (error) {
        console.log("error.message")
    }
}



const styles = StyleSheet.create({

    pdf: {

        width: wW / 1.2,
        height: wH / 1.6,
    }

})