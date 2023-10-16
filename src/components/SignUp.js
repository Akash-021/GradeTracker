import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import { firebase } from './../../firebase'; // Import your Firebase configuration
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import Dashboard from './Dashboard';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import Login from './Login';
import Root from './DrawerNavigator';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('Users').doc(user.uid).set({
              email: email,
              // Add other user information fields as needed
              // Store the Firebase Authentication UID for reference
              displayName: "",
              uid: user.uid,
            });
      // If registration is successful, navigate to the dashboard or desired screen
      navigation.navigate('Root', { screen: 'Dashboard' });
    } catch (error) {
      console.error(error);
      // Handle registration error, e.g., display a message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="SignUp" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Log in here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUp;