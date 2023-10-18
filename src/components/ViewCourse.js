import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function ViewCourse({route}) {
  const {course} = route.params;
  console.log("course in view course:",course)
  return (
    <View>
      
      <View style={styles.wrapper}>
      <Text style={styles.title}>Course Details</Text>
        <View style={styles.content}>
        <Text>Name {course.cname}</Text>
        <Text>Credits: {course.credits}</Text>
        <Text>Description: {course.cdesc}</Text>
        </View>

      </View>
      <View style={styles.wrapper}>
      <Text style={styles.title}>Course Details</Text>

        <View style={styles.content}>
          <Text>Credits: {course.credits}</Text>
          <Text>Marks: {course.marks}</Text>
        </View>
      </View>
      <Button style={styles.addcbut}title="Add Marks"></Button>

    </View>

    
  )
}

const styles = StyleSheet.create({

  wrapper: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
  },
  details: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    marginHorizontal:10,
  },
  addcbut: {
    marginTop: 20,
  },

  
});