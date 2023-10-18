import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useEffect , useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddNewCourse({route}) {
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState('');
  const [description, setDescription] = useState('');
  const { sem } = route.params;
  const navig = useNavigation();
  const currentUser = auth().currentUser;
  function onChanged (text) {
    setCredits(text.replace(/[^0-9]/g, ''));
  }

  const handleAddCourse = async () => {
    const cItem = {
      cname: courseName,
      credits: credits,
      cdesc: description,
      marks: []
    }

    const Courses = await firestore().collection('Users').doc(currentUser.uid).collection('CourseList').get();
    const docId = Courses.docs[0].id
    const semId = `sem ${sem}`

    let courseSemList = Courses.docs[0].data()[semId]
    console.log("from db:", courseSemList)

    // removing old item if it exists
    courseSemList = courseSemList.filter(item=>item.cname != courseName)
    console.log("removing dup:", courseSemList)

    // adding neew item
    courseSemList.push(cItem)
    console.log("adding new item:",courseSemList)

    const updateObj = {}
    updateObj[semId] = courseSemList
    await firestore().collection('Users').doc(currentUser.uid).collection('CourseList').doc(docId).update(updateObj);
    navig.goBack()
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Add New Course</Text>
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Credits'
        onChangeText={(text)=> onChanged(text)}
        value={credits}
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Description"
        value={description}
        onChangeText={setDescription}
      />
      {/* <Button title="Add Course" onPress={handleAddCourse} /> */}
      <TouchableOpacity onPress={handleAddCourse} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  buttonContainer: {
    width: 200,
    height: 50,
    backgroundColor: '#3498db', // A nice shade of blue
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34495e', // Slightly darker shadow color
    shadowOffset: { width: 0, height: 4 }, // Bigger shadow
    shadowOpacity: 0.7, // Stronger shadow
    shadowRadius: 3, // Larger shadow radius
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
