import React from 'react';
import { createDrawerNavigator, drawerIcon } from '@react-navigation/drawer';
import Dashboard from './Dashboard'; // Import your Dashboard component
import CourseDetail from './CourseDetail'; // Import your GradeTracker component
import CourseList from './CourseList'; // Import your StudyPlanner component
import UserProfile from './UserProfile';
import AuthStackNavigator from './AuthStackNavigator';
import GradeList from './GradeList';
import { Image } from 'react-native';

const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerActiveBackgroundColor: '#F5F5F5',
      drawerInactiveBackgroundColor: '#FFFFFF',
      drawerActiveTintColor: '#000000',
      drawerInactiveTintColor: '#666666',
      drawerItemStyle: {
        borderRadius: 10,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
    }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        drawerIcon: () => <Image style={{width:40,height:40,objectFit:"fill"}} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPJ4v0NUHpj-tCbJ-ZTlwjm7o975G95GFp-R5XB-ZPw&s'} />,
      }}/>
      <Drawer.Screen name="GradeList" component={GradeList} options={{
        drawerIcon: () => <Image style={{width:40,height:40}} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_YYerxQI_Rz6L4YPDNQ8tKFpey4MufIoTeAhYPFJsATfHl4yHb8QR-DD9JTc5Fup29A'} />,
      }}/>
      <Drawer.Screen name="CourseList" component={CourseList} options={{
        drawerIcon: () => <Image style={{width:40,height:30,objectFit:"fill"}} src={'https://toppng.com/uploads/thumbnail/open-book-icon-png-download-book-black-and-white-11563256975m5vziz3hlb.png'} />,
      }}/>
      <Drawer.Screen name="UserProfile" component={UserProfile} options={{
        drawerIcon: () => <Image style={{width:40,height:40}} src={'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjkzNy1hZXctMTY1LnBuZw.png?s=b4SEVfKYcskH9PiGnSKmpM9SloVv-yAI_PKnNBsL-3o'} />,
      }}/>
    </Drawer.Navigator>
  );
};

export default Root;
