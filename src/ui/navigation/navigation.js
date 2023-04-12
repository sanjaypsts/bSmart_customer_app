import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from '../screen/dashBoard/dashBoard';
import Cart from '../screen/cart/cart';
import SingleCategory from '../screen/category/singleCategory';
import Notification from '../component/notification';
import Address from '../component/drawer/Address';
import Contact from '../component/drawer/contacts';
import PaymentSuccess from '../screen/cart/paymentSuccess';
import OrderDetails from '../screen/orders/orderDetails';
import LastOrder from '../screen/orders/lastOrder';
import MostOrder from '../screen/orders/mostOrder';
import credits from '../screen/credits/credits';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"DashBoard"}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="SingleCategory" component={SingleCategory} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="LastOrder" component={LastOrder} />
      <Stack.Screen name="MostOrder" component={MostOrder} />
      <Stack.Screen name="credits" component={credits} />




      
   
    </Stack.Navigator>
  );
}


export default function AppNavigation() {
  return (
    <NavigationContainer initialRoute={{
    
        display: false,
      }} >
      <MyStack />
    </NavigationContainer>
  );
}
