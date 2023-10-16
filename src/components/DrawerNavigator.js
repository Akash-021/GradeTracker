import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'; // Import your Dashboard component
import CourseDetail from './CourseDetail'; // Import your GradeTracker component
import CourseList from './CourseList'; // Import your StudyPlanner component
import LogoutButton from './LogoutButton';
import UserProfile from './UserProfile';
import AuthStackNavigator from './AuthStackNavigator';

const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="CourseDetail" component={CourseDetail} />
      <Drawer.Screen name="CourseList" component={CourseList} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />
      <Drawer.Screen name="LogoutButton" component={LogoutButton} />
    </Drawer.Navigator>
  );
};

export default Root;
