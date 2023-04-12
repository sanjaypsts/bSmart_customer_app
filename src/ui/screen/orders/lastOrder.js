import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackGround from '../../component/backgroundImage'
import BackBottonHeader from '../../component/header/dashboardHeader'
import { HorizontalSingleCategoryCard } from '../category/categoryHelper'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import apicallHeaderPost from '../../../stateManage/apicallHeaderPost'
import { useEffect } from 'react'
import LoadingModal from '../../component/loading'
import { SubmitBotton } from '../../helper/globalStyle'
import { wW } from '../../helper/size'
import Toast from 'react-native-simple-toast';

const LastOrder = ({ navigation }) => {
  const { loginData } = useSelector(state => state.loginReducer);
  const [SingleCategoryData, setSingleCategoryData] = useState([]);
  const [loading, setloading] = useState(false);


  const [Subtotal, setSubtotal] = useState(0);
  const [Grandtotal, setGrandtotal] = useState(0);
  const [totalTax, settotalTax] = useState(0);
  const [mobileNumber,setmobileNumber] = useState(0);



  useEffect(() => {
    getData()

  }, [])




  const getData = () => {
    setSingleCategoryData([])
    setloading(true)
    console.log("csdijcnhsd")

    apicallHeaderPost({ customer_id: 1 }, 'mlastOrderBasedCustomerId', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
          setSubtotal(response.data.data.sub_total)
          setGrandtotal(response.data.data.order_total)
          settotalTax(response.data.data.tax)
          setmobileNumber(response.data.data.mobile_number)

          setSingleCategoryData(response.data.data.order_details)
        } else {
        }
      }).catch(err => {
        setloading(false)
        if (err) {

        }
      })
  }





  const Place_order = () => {


    setloading(true)
    let formData = new FormData();
    let ModifyReciveData = SingleCategoryData.map((item) => {
      return {
        product_id: item.product_id,
        batch_id: "",
        quantity: item.quantity,
        unit_id: item.unit_id,
        unit_price: item.standard_price,
        total_amount: item.total_amount,
        gross_amount: item.gross_amount,
        tax_id: item.tax_id,
        tax_amount: item.tax_amount
      }
    });

    formData.append('order_details', JSON.stringify(ModifyReciveData));
    formData.append('sub_total', Subtotal);
    formData.append('tax', totalTax);
    formData.append('order_total', Grandtotal);
    formData.append('order_notes', "test");
    formData.append('ordered_via', "Mobile");
    formData.append('delivery_notes_voice', "");
    formData.append('payment_mode_id', 1);

    formData.append('mobile_number',mobileNumber);
    formData.append('payment_date', "2001-01-01");





    apicallHeaderPost(formData, 'mcreateOrderDetails', loginData.data.token)
      .then(response => {
        setloading(false)
        if (response.status == 200 && response.status == 201 && response.data.status == true || response.data.status == 'true') {
          navigation.push('PaymentSuccess')
        } else {

        }

      }).catch(err => {
        setloading(false)



        if (err) {

          const data = [err.response.data.data]



          for (var i = 0; i < 1; i++) {
            for (var key in data[i]) {
              console.log(data[i][key]);
              Toast.showWithGravity(data[i][key], Toast.LONG, Toast.BOTTOM);
            }
          }
        }
      })

  }







  try {
    return (

      <BackGround>
        <LoadingModal loading={loading} setloading={setloading} />

        <BackBottonHeader updateSingleCategory={() => { navigation.goBack(null) }} />

        <ScrollView  >
          {SingleCategoryData && SingleCategoryData.length > 0 &&
            SingleCategoryData.map((i, index) => (
              <View key={index} >
                <HorizontalSingleCategoryCard imageSource={i.image_url} title={i.product_name} price={i.per_unit_price} weight={i.unit_name} quantity={i.quantity} product_id={i.product_id} updateMasterState={(text) => { console.log("single") }} />
              </View>
            ))}
        </ScrollView>

        <View style={{ position: "absolute", bottom: 0, alignItems: 'center', width: wW, backgroundColor: "#35373D", height: 100, justifyContent: "center", borderTopWidth: 1, borderTopColor: "grey" }}>

          <TouchableOpacity onPress={() => {Place_order() }}>
            <SubmitBotton title={"Repeat Order"} loadingStaus={false} />
          </TouchableOpacity>
        </View>

      </BackGround>

    )
  }
  catch {

  }
}

export default LastOrder

const styles = StyleSheet.create({})