import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Use navigation hook to access navigation

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      // If login is successful, navigate to the dashboard or desired screen
      navigation.navigate('Root', { screen: 'Dashboard' });
    } catch (error) {
      console.error(error);
      // Handle login error, e.g., display a message to the user
    }
  };

  const handleForgotPasswordNavigation = () => {
    // Navigate to the "ForgotPassword" screen
    navigation.navigate('AuthStackNavigator', { screen: 'ForgotPassword' });
  };

  const handleSignUpNavigation = () => {
    // Navigate to the "SignUp" screen
    navigation.navigate('AuthStackNavigator', { screen: 'SignUp' });
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logo.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordNavigation}>
        <Text style={styles.link_forgot}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop:140}}>
        <Text style={styles.link_signup} onPress={handleSignUpNavigation}>Don't have an account? Sign up here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
    width: 230, // Set the desired width
    height: 200, // Set the desired height
    resizeMode: 'cover', // Adjust the resizeMode as needed
    marginTop:0,
    marginBottom:40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#5795E3',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  link_forgot: {
    marginTop: 20,
    color: '#5795E3',
    fontSize: 16,
    marginBottom:20,
  },
  link_signup: {
      marginTop: 20,
      color: '#5795E3',
      fontSize: 16,
    },
});

export default Login;
