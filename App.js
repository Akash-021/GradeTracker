import React, { useEffect } from 'react';
import { useState } from 'react';
import 'react-native-gesture-handler';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';
import CourseList from './src/components/CourseList';
import CourseDetail from './src/components/CourseDetail';
import SignUp from './src/components/SignUp';
import ForgotPassword from './src/components/ForgotPassword';
import Root from './src/components/DrawerNavigator';
import AuthStackNavigator from './src/components/AuthStackNavigator';

import { initializeApp } from '@firebase/app';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();



const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    // Set up the Firebase authentication state observer
        const unsubscribe = auth().onAuthStateChanged((user) => {
          setUser(user);
        });

        // Clean up the observer when the component unmounts
        return () => unsubscribe();
    }, []);
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Root' : 'AuthStackNavigator'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={Root} />
            <Stack.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
