import Modal from 'react-native-modal';
import { Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { normalize, wH, wW } from '../../helper/size';
import { CartBox, CustumModal, Dateformat, MiniCartBox, SubmitBotton, globalStyles } from '../../helper/globalStyle';
import { COLORS } from '../../helper/color';
import { IMAGES } from '../../globalImage';

import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost';
import { useSelector } from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util'
import { UPLOAD_IMAGE_PATH } from '../../../../config';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';


export const CreditsModal = (props) => {
    const { visible, modalData, show_price, UpdateVisible } = props
    const [Data, setData] = useState([]);
    const { loginData } = useSelector(state => state.loginReducer);


    useEffect(() => {
        setData([modalData])
    }, [modalData])

    const onChange = () => {
        UpdateVisible(false)
    };


    const Permission = async (value) => {
        try {

            if (Platform.OS === "ios") {
                await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then((result) => {
                    if (result == 'granted') {
                        InvoicePdfDownload(value)
                    }
                    else {
                        request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then((result) => {
                            // console.log('gdfh',result)
                            if (result == 'granted') {
                                InvoicePdfDownload(value)
                                //  console.log("ss")
                            }
                            else if (result == "limited") {
                                InvoicePdfDownload(value)
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
                    InvoicePdfDownload(value)
                } else {

                   
                }
            }
        }
        catch (err) {
            console.warn(err);
        }
    }

    const InvoicePdfDownload = (value) => {
        console.log(value)

        apicallHeaderPost({ 'order_id': value }, 'mdownloadBillPdf', loginData.data.token)
            .then(response => {

                console.log("response",response.data.data)
                // setloading(false)
                if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
                      const path = response.data.data
                    const withoutSpaces = path.replaceAll(' ', '%20');
                    const name = "Invoice No" + value ;
                 const url =(UPLOAD_IMAGE_PATH +  withoutSpaces)
                  
                    Download(url,name)
                } else {

                }

            }).catch(err => {


                if (err) {
                    console.log("err",err.response)

                }
            })

    }


    const Download = (url,pdffilename) => {
     

        const { dirs } = ReactNativeBlobUtil.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
            fileCache: false,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: pdffilename,
            path: `${dirToSave}/${pdffilename}`,

        }
        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
            },
            android: {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: `${dirToSave}/${pdffilename}`,
                    description: 'Pdf'
                }
            },
        });

        ReactNativeBlobUtil.config(configOptions)
            .fetch('GET',url,{})
            .then((res) => {
                console.log('rerr', res)
                if (Platform.OS === "ios") {
                    ReactNativeBlobUtil.ios.openDocument(res.data);
                    ReactNativeBlobUtil.ios.previewDocument(configfb.path);

                }
                //   setisdownloaded(false)
                if (Platform.OS == 'android') {
                    // showSnackbar('File downloaded');
                }

                alert('Downloaded successfully')

                console.log('The file saved to ', res);
            })
            .catch((e) => {
                //  setisdownloaded(true)
                // showSnackbar(e.message);
                console.log('The file saved to ERROR', e.message)
            });


    }





    try {



        return (
            <Modal transparent={true} isVisible={visible} statusBarTranslucent={true} style={{ justifyContent: 'flex-end', margin: 0 }}
                onBackdropPress={() => onChange(false)}
                swipeDirection={'down'}
                onSwipeComplete={() => onChange(false)}
            >

                {Data && Data.length > 0 &&
                    Data.map((item, index) => (
                        <>



                            <CustumModal>
                                {/* <ScrollView> */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={globalStyles.order_heading1}>Order {item.invoice_number}</Text>
                                        <Text style={[globalStyles.order_title,]}>Delivery: {moment(item.invoice_date).format(Dateformat)}</Text>

                                    </View>

                                    {/* <View>
                                        {show_price == 1 &&
                                            <TouchableOpacity disabled={item.payment_status != 1 && true} onPress={() => InvoicePdfDownload(item.invoice_number)}>

                                                <MiniCartBox>
                                                    <Text style={[globalStyles.order_title, { color: 'white' }]}>Invoice</Text>
                                                </MiniCartBox>
                                            </TouchableOpacity>
                                        }

                                    </View> */}

                                    {!item.payment_status == 0 &&
                                        <TouchableOpacity onPress={() => { Permission(item.id) }} style={{ backgroundColor: "#03234C", borderRadius: 5, justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}>
                                            <Text style={{ color: "white" }}>
                                                Download
                                            </Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                                {/* <Text style={globalStyles.order_heading1}>Order {item.invoice_number}</Text>
                                        <Text style={[globalStyles.order_title,]}>Delivery: {moment(item.invoice_date).format(Dateformat)}</Text>

 */}



                                <View style={{ marginVertical: 20 }}>

                                    {item.order_details && item.order_details.length > 0 &&
                                        item.order_details.map((item, index) => (
                                            <CartBox>
                                                <Text style={[globalStyles.order_heading1, { fontFamily: "RedHatDisplay-Regular", marginBottom: 5 }]}>Purchase order</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                                    <View>
                                                        <Text numberOfLines={1} style={[globalStyles.order_heading1, { maxWidth: "80%" }]}>{item.product_name}</Text>
                                                        <Text style={globalStyles.order_title}>10 KG</Text>
                                                        <Text style={globalStyles.order_title}>Quantity: {item.quantity}</Text>
                                                    </View>
                                                    <View>
                                                        {show_price == 1 &&
                                                            <Text style={[globalStyles.order_heading1,]}>S$ {(item.total_amount.toFixed(2))}</Text>
                                                        }

                                                    </View>
                                                </View>

                                            </CartBox>
                                        ))}
                                </View>



                                {show_price == 1 &&


                                    <CartBox>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>{"Subtotal"}</Text>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>S$ {(item.gross_total.toFixed(2))}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Tax</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {(item.total_tax.toFixed(2))}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.truck} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Delivery</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ 0</Text>
                                        </View>
                                        <View style={{ backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10 }}></View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>{"Grand total"}</Text>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "500", fontSize: normalize(16), }}>S$ {(item.total_amount.toFixed(2))}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Paid</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {item.amount_paid}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image resizeMode='contain' source={IMAGES.Receipt_text} style={{ width: 18, height: 18, borderRadius: 10 }} />
                                                <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}> Remaining Credit</Text>
                                            </View>
                                            <Text style={{ color: COLORS.appOppsiteTextColor, fontWeight: "400", fontSize: normalize(16), }}>S$ {(item.pending_amount.toFixed(2))}</Text>
                                        </View>


                                    </CartBox>

                                }
                                {item.payment_status == 0 &&
                                    <>
                                        <View style={{ marginBottom: 120 }}></View>

                                        <View style={{ position: "absolute", flexDirection: "row", bottom: 0, alignItems: 'center', width: wW, backgroundColor: COLORS.appLightColor, height: 100, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "grey" }}>
                                            <Image resizeMode='contain' source={IMAGES.PayWith} style={{ width: 100, height: 80, borderRadius: 10 }} />

                                            <TouchableOpacity style={{ width: 100, borderRadius: 10, backgroundColor: COLORS.appColor, justifyContent: "center", alignItems: "center", height: 50, }} onPress={() => { }}>
                                                <Text style={{ color: "white" }}>Pay Now</Text>
                                                {/* <SubmitBotton title={"Pay Now"} loadingStaus={false} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                }

                                {/* </ScrollView> */}
                            </CustumModal>

                        </>
                    ))}
            </Modal>
        )

    } catch ({ error }) {

    }
}



const styles = StyleSheet.create({})