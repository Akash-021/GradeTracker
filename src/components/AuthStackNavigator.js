import React from 'react';
import { Header, createStackNavigator } from '@react-navigation/stack';
import Login from './Login'; // Import your Login component
import SignUp from './SignUp'; // Import your SignUp component
import ForgotPassword from './ForgotPassword'; // Import your ForgotPassword component
import Root from './DrawerNavigator';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
