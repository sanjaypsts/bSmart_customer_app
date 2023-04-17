import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screen/dashBoard/dashboard';
import CreditScreen from '../screen/credit/creditScreen';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"Dashboard"}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashBoard" component={Dashboard} />
      <Stack.Screen name="CreditScreen" component={CreditScreen} />
  
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
