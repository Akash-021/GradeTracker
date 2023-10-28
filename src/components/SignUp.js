import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
//import { firebase } from './../../firebase'; // Import your Firebase configuration
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import Dashboard from './Dashboard';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import Login from './Login';
import Root from './DrawerNavigator';

function createSemesterObject(n) {
  if (n <= 0) {
    return {};
  }

  const semesterObject = {};
  for (let i = 1; i <= n; i++) {
    const semester = `sem ${i}`;
    semesterObject[semester] = [];
  }

  return semesterObject;
}


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sem, setSemester] = useState('');


  const handleSignUp = async () => {
    if(!email || !password || !sem) {return}
    console.log("signing up..")
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('Users').doc(user.uid).set({
              email: email,
              displayName: "",
              uid: user.uid,
              totalSem: Number(sem),
              sem_sgpa: new Array(Number(sem)).fill(0),
              cgpa: Number(0),
            });
      await firestore().collection('Users').doc(user.uid).collection('CourseList').doc().set(createSemesterObject(Number(sem)));
      // If registration is successful, navigate to the dashboard or desired screen
      navigation.navigate('Root', { screen: 'Dashboard' });
    } catch (error) {
      console.error(error);
      // Handle registration error, e.g., display a message to the user
    }
  };

  function onChanged (text) {
    setSemester(text.replace(/[^0-9]/g, ''));
  }

  function quickSignUp(){
    setEmail("abc@gmail.com");
    setPassword("123456");
    setSemester("8");
    // handleSignUp();
  }

  return (
    <View style={styles.container}>

      <Image source={require('./../assets/logo.png')} style={styles.image} />

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
      <TextInput 
        style={styles.input}
        placeholder="Total Semesters"
        keyboardType='numeric'
        onChangeText={(text)=> onChanged(text)}
        value={sem}
        maxLength={10}
      />
      <Button title="SignUp" onPress={handleSignUp} />
      {/* <Button title="QuickSignUp" onPress={quickSignUp} /> */}
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Log in here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  image: {
    width: 230, // Set the desired width
    height: 200, // Set the desired height
    resizeMode: 'cover', // Adjust the resizeMode as needed
    marginTop:0,
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