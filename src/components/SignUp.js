import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
//import { firebase } from './../../firebase'; // Import your Firebase configuration
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import Dashboard from './Dashboard';
import CourseList from './CourseList';
import Login from './Login';
import Root from './DrawerNavigator';

function createSemesterObject(n) {
  const all_semesters_courses = [
    {"sem": 1, "courseName": "19ENG111", "credits": 3},
    {"sem": 1, "courseName": "19MAT101", "credits": 1},
    {"sem": 1, "courseName": "19MAT111", "credits": 2},
    {"sem": 1, "courseName": "19MAT102", "credits": 2},
    {"sem": 1, "courseName": "19CSE100", "credits": 4},
    {"sem": 1, "courseName": "19MEE100", "credits": 3},
    {"sem": 1, "courseName": "19CSE101", "credits": 4},
    {"sem": 1, "courseName": "19CSE180", "credits": 1},
    {"sem": 1, "courseName": "19CUL101", "credits": 2},
    
    {"sem": 2, "courseName": "19MAT115", "credits": 4},
    {"sem": 2, "courseName": "19MAT112", "credits": 3},
    {"sem": 2, "courseName": "19PHY101", "credits": 3},
    {"sem": 2, "courseName": "19CSE102", "credits": 4},
    {"sem": 2, "courseName": "19EEE111", "credits": 3},
    {"sem": 2, "courseName": "19EEE182", "credits": 1},
    {"sem": 2, "courseName": "19CSE103", "credits": 2},
    {"sem": 2, "courseName": "19CSE111", "credits": 2},
    {"sem": 2, "courseName": "19MEE181", "credits": 1},
    {"sem": 2, "courseName": "19CUL111", "credits": 2},

    {"sem": 3, "courseName": "19MAT201", "credits": 1},
    {"sem": 3, "courseName": "19MAT202", "credits": 2},
    {"sem": 3, "courseName": "19ECE204", "credits": 4},
    {"sem": 3, "courseName": "19CSE201", "credits": 3},
    {"sem": 3, "courseName": "19CSE205", "credits": 3},
    {"sem": 3, "courseName": "19CSE202", "credits": 4},
    {"sem": 3, "courseName": "19CSE204", "credits": 3},
    {"sem": 3, "courseName": "19ECE282", "credits": 1},
    {"sem": 3, "courseName": "19AVP201", "credits": 1},
    
    {"sem": 4, "courseName": "19MAT205", "credits": 4},
    {"sem": 4, "courseName": "19CSE212", "credits": 4},
    {"sem": 4, "courseName": "19CSE214", "credits": 3},
    {"sem": 4, "courseName": "19CSE211", "credits": 4},
    {"sem": 4, "courseName": "19CSE213", "credits": 4},
    {"sem": 4, "courseName": "19AVP211", "credits": 1},
    {"sem": 4, "courseName": "Free Elective I", "credits": 2},
    {"sem": 4, "courseName": "19SSK211", "credits": 2},
    {"sem": 4, "courseName": "19MNG300", "credits": 0},
    
    {"sem": 5, "courseName": "19CSE305", "credits": 4},
    {"sem": 5, "courseName": "19CSE302", "credits": 4},
    {"sem": 5, "courseName": "19CSE301", "credits": 4},
    {"sem": 5, "courseName": "19CSE304", "credits": 3},
    {"sem": 5, "courseName": "19CSE303", "credits": 4},
    {"sem": 5, "courseName": "Professional Elective I", "credits": 3},
    {"sem": 5, "courseName": "19SSK301", "credits": 2},
    {"sem": 5, "courseName": "19ENV300", "credits": 0},

    {"sem": 6, "courseName": "19CSE314", "credits": 3},
    {"sem": 6, "courseName": "19CSE313", "credits": 3},
    {"sem": 6, "courseName": "19CSE312", "credits": 4},
    {"sem": 6, "courseName": "19CSE311", "credits": 3},
    {"sem": 6, "courseName": "Professional Elective II", "credits": 3},
    {"sem": 6, "courseName": "Professional Elective III", "credits": 3},
    {"sem": 6, "courseName": "19SSK311", "credits": 2},
    
    {"sem": 7, "courseName": "19CSE401", "credits": 3},
    {"sem": 7, "courseName": "Professional Elective IV", "credits": 3},
    {"sem": 7, "courseName": "Professional Elective V", "credits": 3},
    {"sem": 7, "courseName": "Professional Elective VI", "credits": 3},
    {"sem": 7, "courseName": "Free Elective II", "credits": 3},
    {"sem": 7, "courseName": "19CSE495/19CSE491", "credits": 2},
    {"sem": 7, "courseName": "19LAW300", "credits": 0},
    
    {"sem": 8, "courseName": "19CSE499", "credits": 10}
  ]



  if (n <= 0) {
    return {};
  }

  const semesterObject = {};

  for (let i = 1; i <= n; i++) {
    const semesterKey = `sem ${i}`;
    semesterObject[semesterKey] = [];

    const semesterCourses = all_semesters_courses.filter(course => course.sem === i);

    semesterCourses.forEach(course => {
      semesterObject[semesterKey].push({
        cname: course.courseName,
        cdesc: '',
        credits: course.credits,
        student_grade: '',
        marks: []
      });
    });
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