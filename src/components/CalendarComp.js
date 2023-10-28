import { View, Text } from 'react-native'
import React from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function CalendarComp() {
  return (
    <View>
      <Calendar theme={{
          // Define the calendar theme
          backgroundColor: 'white',
          calendarBackground: 'white',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: 'blue',
          selectedDayTextColor: 'white',
          todayTextColor: 'blue',
          dayTextColor: 'black',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'blue',
          monthTextColor: 'blue',
        }} style={{
          height:320,
          width:330,
          borderWidth: 1,
          borderColor: 'lightgray',
          borderRadius: 10,
          margin: 10,
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 3,
        }}
        // Customize the calendar here
      />
    </View>
  )
}