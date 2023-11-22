import React from 'react';
import { createDrawerNavigator, drawerIcon } from '@react-navigation/drawer';
import Dashboard from './Dashboard'; // Import your Dashboard component
import CourseList from './CourseList'; // Import your StudyPlanner component
import UserProfile from './UserProfile';
import AuthStackNavigator from './AuthStackNavigator';
import GradeList from './GradeList';
import { Button, Image, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const Root = ({ navigation }) => {
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
  return (
    <Drawer.Navigator initialRouteName="Dashboard" 
    screenOptions={{
      headerTintColor:"white",
      drawerStyle: {
        backgroundColor: '#8b7afa',
        width: 240,
      },
      drawerItemStyle:{
      },
      drawerActiveBackgroundColor: '#F5F5F5',
      drawerInactiveBackgroundColor: '#FFFFFF',
      drawerActiveTintColor: '#000000',
      drawerInactiveTintColor: '#666666',
      drawerItemStyle: {
        borderRadius: 10,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
      headerStyle: {
        backgroundColor: '#8b7afa',
      },
      headerTitleStyle:{
        color:"white"
      }
    }}>
      <Drawer.Screen options={{ headerRight: () => (
          <TouchableOpacity onPress={logMeOut}>
              <Text style={{color:'white',padding:10,fontWeight:'bold'}}>LOGOUT</Text>
          </TouchableOpacity>
        ), headerTitle:"Grade Tracker", drawerLabel: () => null,drawerItemStyle:{backgroundColor:"#8b7afa",height:50}}} name="test" 
                              component={Dashboard}/>
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        drawerLabel:"Grade Tracker",
        headerTitle:"Grade Tracker",
        headerRight: () => (
          <TouchableOpacity onPress={logMeOut}>
              <Text style={{color:'white',padding:10,fontWeight:'bold'}}>LOGOUT</Text>
          </TouchableOpacity>
        ), drawerIcon: () => <Image style={{width:40,height:40,objectFit:"fill"}} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPJ4v0NUHpj-tCbJ-ZTlwjm7o975G95GFp-R5XB-ZPw&s'} />,
      }}/>
      <Drawer.Screen name="GradeList" component={GradeList} options={{
        drawerLabel:"Grade List",
        headerTitle:"Grade List",
        drawerIcon: () => <Image style={{width:40,height:40}} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_YYerxQI_Rz6L4YPDNQ8tKFpey4MufIoTeAhYPFJsATfHl4yHb8QR-DD9JTc5Fup29A'} />,
      }} />
      <Drawer.Screen name="CourseList" component={CourseList} options={{
        headerTitle:"Course List",
        drawerLabel:"Course List",
        drawerIcon: () => <Image style={{width:40,height:30,objectFit:"fill"}} src={'https://toppng.com/uploads/thumbnail/open-book-icon-png-download-book-black-and-white-11563256975m5vziz3hlb.png'} />,
      }}/>
      <Drawer.Screen name="UserProfile" component={UserProfile} options={{headerTitle:"User Profile",
      drawerLabel:"User Profile",
      headerRight: () => (
          <TouchableOpacity onPress={logMeOut}>
              <Text style={{color:'white',padding:10,fontWeight:'bold'}}>LOGOUT</Text>
          </TouchableOpacity>
        ),
        drawerIcon: () => <Image style={{width:40,height:40}} src={'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjkzNy1hZXctMTY1LnBuZw.png?s=b4SEVfKYcskH9PiGnSKmpM9SloVv-yAI_PKnNBsL-3o'} />,
      }}/>
    </Drawer.Navigator>
  );
};

export default Root;
