import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import ForgetPassword from './forgetPassword';
import Signup from './signup';
import Success from './success';
import OtpScreen from './otpScreen';
import ChangePassword from './changePassword';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"Login"}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login}  options={() => ({ gestureEnabled: false, animation: "slide_from_right" })} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={() => ({ gestureEnabled: false, animation: "slide_from_right" })}  />
      <Stack.Screen name="Signup" component={Signup} options={() => ({ gestureEnabled: false, animation: "slide_from_right" })}  />
      <Stack.Screen name="Success" component={Success} options={() => ({ gestureEnabled: false, animation: "slide_from_right" })}  />
      <Stack.Screen name="OtpScreen" component={OtpScreen} options={() => ({ gestureEnabled: false, animation: "slide_from_right" })}  />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={() => ({ gestureEnabled: false, animation: "slide_from_right" })}  />


    </Stack.Navigator>
  );
}

export default function MainLogin() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
