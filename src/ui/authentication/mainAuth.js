import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"Login"}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login}  options={() => ({ gestureEnabled: false, animation: "slide_from_right" })} />
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
