import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableHighlight, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AddNewCourse from './AddNewCourse';
import ViewCourse from './ViewCourse';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createMaterialTopTabNavigator();


const TabScreenComponent = ({sem, sgpa, courses}) => {
  console.log("TAB",sem, sgpa, courses)
  const navig = useNavigation();

  function navigateToCourseCreation(){
    navig.navigate("AddNewCourse",{sem : sem})
  }

  function navigateToCourseItem(item){
    console.log("navig", item)
    navig.navigate("ViewCourse",{courses : item, sem: sem})
  }

  const Item = ({obj}) => (
    <TouchableOpacity onPress={()=>{navigateToCourseItem(obj)}} style={styles.item}>
      <Text style={styles.title}>{obj.cname}</Text>
    </TouchableOpacity>
  );

  if(sem == 0){
    return (
      <View>

      </View>
    )
  }
  return (
    <SafeAreaView style={styles.wrapper}>

        <Text style={styles.maintitle}>SGPA: {sgpa}</Text>
        <Text style={styles.maintitle2}>Semester number: {sem}</Text>

        <FlatList
          data={courses}
          renderItem={({item}) => <Item obj={item} />}
          keyExtractor={item => item.cname}
        />
        
        <TouchableOpacity onPress={navigateToCourseCreation} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add/Edit Course</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};



const CourseList = () => {
  const [coursesList, setCoursesList] = useState([]);
  const [totalSem, setTotalSem] = useState(0);
  const [sgpa, setSGPA] = useState([]);
  const [selectedSem, setSelectedSem] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const Tab = createMaterialTopTabNavigator();

  
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [currentUser]) // Re-fetch when the currentUser changes
  );

  const fetchData = () => {
    const fetchUser = async () => {
        const userdata = await firestore().collection('Users').doc(currentUser.uid).get();
        setTotalSem(userdata.data().totalSem);
        setSGPA(userdata.data().sem_sgpa);
  }
    const fetchCoursesList = async () => {
      const Courses = await firestore().collection('Users').doc(currentUser.uid).collection('CourseList').get();
      const CL = Courses.docs[0].data();
      setCoursesList(CL);
    } 

    if(currentUser){
      fetchUser();
      fetchCoursesList();
      console.log(">",totalSem)
      console.log(">>",coursesList)
    }

  }

  useEffect(() => {
    cu = auth().currentUser;
    setCurrentUser(cu)

  },[])

  const semNames = []
  for(let i = 0; i < totalSem; i++){
    semNames.push("Sem " + (i + 1))
  }

  // function changeTab(sem){
  //   const val = Number(sem.split("Sem")[1])
  //   setSelectedSem(val)
  // }

  return (
    <Tab.Navigator tabBarOptions={{ tabStyle: { width: 90,},}} screenOptions={{ tabBarScrollEnabled: true,tabBarIndicatorStyle:{
      backgroundColor:"#8b7afa",
      height:5,
      } }}
    sceneContainerStyle={{ backgroundColor: "white" }}>
    {semNames.length == 0 && 
      <Tab.Screen tabBarLabelStyle={{ width: 1000 }}
      name="Loading..."
      key="Sem0">
      {() => (
        <TabScreenComponent
          sem={0}
          sgpa={sgpa[0]}
          courses={coursesList['sem 0']}
        />
      )}
      </Tab.Screen>
    }

    {semNames &&
      semNames.map((item, idx) => (
        <Tab.Screen tabBarLabelStyle={{ width: 1000 }}
          name={item}
          key={item}
        >
          {() => (
            <TabScreenComponent
              sem={idx + 1}
              sgpa={sgpa[idx]}
              courses={coursesList[`sem ${idx + 1}`]}
            />
          )}
        </Tab.Screen>
      ))
    }
  </Tab.Navigator>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginLeft: 0,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    // Add any additional text styles here
    color: 'black', // Customize the text color
    // Add more styles as needed
  },
  tabbar: {
    display:"flex",
    flexDirection: "row",
    justifyContent:"space-around",
    gap: 0,
    height: 50
  },
  tabItem:{
    height:"100%",
    display:"flex",
    alignItems:"center",
    textAlign: "center",
    backgroundColor:"grey",
    padding: 5,
  },
  wrapper: {
    backgroundColor: '#ECEFF1',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 5,
    height:'95%',
    paddingBottom: 40,
    
  },
  addcbut: {
    marginTop: 20,
  },
  maintitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.8,
  },
  maintitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.8,
    marginBottom:10
  },
  buttonContainer: {
    width: 200,
    height: 50,
    backgroundColor: '#90A4AE', // A nice shade of blue
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34495e', // Slightly darker shadow color
    shadowOffset: { width: 0, height: 4 }, // Bigger shadow
    shadowOpacity: 0.7, // Stronger shadow
    shadowRadius: 3, // Larger shadow radius
    marginTop: 20,
    marginLeft: 65
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  
});


export default CourseList;

