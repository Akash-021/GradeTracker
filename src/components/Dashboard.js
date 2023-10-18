import React, {useEffect, useState} from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Dashboard = ({ navigation }) => {
  const [sem_sgpa, setSemSGPA] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [cgpa,setCgpa] = useState(0);
  
  
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
    const cgpaCalc = () => {
      let i=0;
      let count=0;
      let sum=0;
      if(sem_sgpa[0] == 0){setCgpa(0);return}
      while(sem_sgpa[i]!=0)
      {
        count=count+1;
        sum=sum+sem_sgpa[i];
        i=i+1;
      }
      const cg = sum/count;
      setCgpa(cg);
    }
    console.log('Up sem_sgpa:', sem_sgpa);
    if (sem_sgpa.length!=0)
    {
      cgpaCalc();
    }
  }, [sem_sgpa]);

  function logMeOut(){
    try {
      auth().signOut();
      // Sign the user out
      console.log("signed out");
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      // Handle logout error, if any
    }
  }

  console.log("cgpa:",cgpa);

  const gotoCoursesPage = ()=>{
    navigation.navigate('CourseList')
  }

  return (
    <View>
      <Text style={styles.heading}>Welcome to the Dashboard</Text>
      <Text style={styles.gradeDisplay}>Your current CGPA: {cgpa} </Text>

      <View style={styles.card} onTouchStart={gotoCoursesPage}>
        <Text style={{fontSize:20,color:"black", paddingTop: 10, paddingBottom: 15, textAlign: 'center'}}>Courses</Text>
        
          <View style={styles.user}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: "https://cdn.theatlantic.com/thumbor/5T-358hrx4dcsOlQKo024rmLHf4=/0x0:2000x1125/1600x900/media/img/mt/2023/07/books_picku_up_put_down_final/original.jpg" }}
              />
          </View>
          </View>

      <View style={styles.card}>
        <Text style={{fontSize:20,color:"black", paddingTop: 10, paddingBottom: 15, textAlign: 'center'}}>Calendar</Text>
        
      </View>


      <View style={styles.logoutContainer}>
        <Button title='Logout' onPress={logMeOut}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },

  heading: {
    marginBottom: 16,
    alignItems: 'center',
    textAlign: 'center',
    color:"black",
    fontSize: 30,
    margin: 5,
    fontWeight: 'bold',
    marginHorizontal: 10,
    
  },

  card:{
    height:256,
    width:"90%",
    backgroundColor:"white",
    marginHorizontal:15,
    padding:10,
    color:"black",
    borderRadius:10,
    borderWidth:1,
    borderColor:"rgba(0,0,0,0.15)",
    marginBottom:16,
  },

  image: {
    width: "90%", // Set the desired width
    height: 170, // Set the desired height
    resizeMode: 'cover', // Adjust the resizeMode as needed
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: "5%",
    borderRadius: 10,

  },


  gradeDisplay:{
    fontSize:20,
    color:"black",
    padding:3,
    paddingTop:8,
    paddingLeft:10,
    borderWidth:1,
    borderColor:"rgba(0,0,0,0.15)",
    marginHorizontal:15,
    borderCurve:"continuous",
    borderRadius: 10,
    width:"90%",
    marginBottom:5,
    backgroundColor: 'white',
    marginBottom:16,
    textAlign: 'center',
  },

  calContainer:{
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutContainer:{
    padding:15,
  }  
});

export default Dashboard;
