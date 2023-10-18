import React, {useEffect, useState} from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import SemItem from '../additional_components/SemItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const GradeList = ({navigation}) => {
  const [sem_sgpa, setSemSGPA] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  
  
  useEffect(() => {
    const fetchUser = async () => {
      const userdata = await firestore().collection('Users').doc(currentUser.uid).get();
      const ss = userdata.data().sem_sgpa
      console.log('ss',ss)
      setSemSGPA(ss);
    }
    if(currentUser){
      fetchUser();
      console.log("gl user:",currentUser.uid)
      
    }
  },[currentUser])

  useEffect(() => {
    cu = auth().currentUser;
    setCurrentUser(cu)
  },[])

  useEffect(() => {
    console.log('Updated sem_sgpa:', sem_sgpa);
  }, [sem_sgpa]);

  
  
  return (

    <ScrollView  style = {styles.container}>
      <View style = {styles.SemWrapper}>
        <Text style = {styles.sectionTitle}>Semester SGPAs</Text>
        {sem_sgpa.map((sgpa, index) => (
      <View style={styles.sems} key={index}>
        <SemItem text={sgpa.toString()} sem={index} style={styles.semval} />
      </View>
    ))}
      </View>
    </ScrollView >

  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    SemWrapper: {
      paddingTop: 30,
      paddingHorizontal: 20,
      
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    sems: {
      paddingTop: 20,
      paddingHorizontal: 20,
      
    },

    semval:{
      color: 'black',
    },
    addsems: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      alignItems: 'center',
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: 'white',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderColor: '#C0C0C0',
      borderWidth: 0.4,

    },
    addText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,


    },

    
          

  });

export default GradeList;
