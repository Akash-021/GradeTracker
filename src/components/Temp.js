import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempScreen from './TempScreen';

export default function Temp() {
    const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
        <Tab.Screen name="TempScreen" component={TempScreen} />
    </Tab.Navigator>
  )
}