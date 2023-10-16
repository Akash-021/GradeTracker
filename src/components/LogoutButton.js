import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'; // Import your Firebase configuration
import { useNavigation } from '@react-navigation/native';
import Login from './Login';

const LogoutButton = () => {
  const navigation = useNavigation();
  useEffect(() => {
    try {
      auth().signOut();
      // Sign the user out
      console.log("signed out");
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      // Handle logout error, if any
    }
  });
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LogoutButton;
