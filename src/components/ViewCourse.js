import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import DatePicker from 'react-native-date-picker'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ViewCourse({route}) {
  const currentUser = auth().currentUser;
  const {courses , sem} = route.params;
  const [course, setCourse] = useState(courses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const [assessName, setAssessName] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState();
  const [maxMarks, setMaxMarks] = useState('');
  const [weightage, setWeightage] = useState('');
  const [date, setDate] = useState(new Date());

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  console.log("course in view course:",course)
  console.log("marks in view course:",course.marks)
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  
  const categories = [
    { label: 'Quiz', value: 'quiz' },
    { label: 'Lab Evaluation', value: 'lab_evaluation' },
    { label: 'Assignment', value: 'assignment' },
  ];

  const subcategories = {
    quiz: [
      { label: 'Quiz 1', value: 'quiz1' },
      { label: 'Quiz 2', value: 'quiz2' },
      { label: 'Quiz 3', value: 'quiz3' },
      { label: 'Quiz 4', value: 'quiz4' },
      // Add more quiz options as needed
    ],
    lab_evaluation: [
      { label: 'Lab 1', value: 'lab1' },
      { label: 'Lab 2', value: 'lab2' },
      { label: 'Lab 3', value: 'lab3' },
      { label: 'Lab 4', value: 'lab4' },
      // Add more lab options as needed
    ],
    assignment: [
      { label: 'Assignment 1', value: 'assignment1' },
      { label: 'Assignment 2', value: 'assignment2' },
      { label: 'Assignment 3', value: 'assignment3' },
      { label: 'Assignment 4', value: 'assignment4' },
      // Add more assignment options as needed
    ],
  };
  const handleAddMarks = async () => {
    const markItem ={
      name: assessName,
	    obtained: obtainedMarks,
      max: maxMarks,
      weightage: weightage,
      date:date,
    }

    const Courses = await firestore().collection('Users').doc(currentUser.uid).collection('CourseList').get();
    const docId = Courses.docs[0].id
    const semId = `sem ${sem}`

    let courseSemList = Courses.docs[0].data()[semId];

    // Find the index of the course with the matching name
  const courseIndex = courseSemList.findIndex((item) => item.cname === course.cname);

  // Check if the course is found
  if (courseIndex !== -1) {
    // Create a copy of the course to avoid modifying the state directly
    const updatedCourse = { ...courseSemList[courseIndex] };

    // Check if the marks field exists, if not create it as an empty array
    if (!updatedCourse.marks) {
      updatedCourse.marks = [];
    }

    // Find the index of the mark with the same name
    const markIndex = updatedCourse.marks.findIndex((mark) => mark.name === markItem.name);

    if (markIndex !== -1) {
      // If a mark with the same name exists, update it
      updatedCourse.marks[markIndex] = markItem;
    } else {
      // If a mark with the same name doesn't exist, add the new mark
      updatedCourse.marks.push(markItem);
    }

    // Update the courseSemList with the updated course
    courseSemList[courseIndex] = updatedCourse;

    const updateObj = {};
    updateObj[semId] = courseSemList;

    // Update the Firestore document with the modified courseSemList
    await firestore()
      .collection('Users')
      .doc(currentUser.uid)
      .collection('CourseList')
      .doc(docId)
      .update(updateObj);

      setCourse(updatedCourse);
      handleModal() // Close the modal after updating
  }

  }

  const handleCategoryChange = (item) => {
    setSelectedCategory(item.value);
    setSelectedSubcategory(null); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (item) => {
    setSelectedSubcategory(item.value);
    console.log("name check",item.value)
    setAssessName(item.value)
  };

  return (
    <View style= {styles.bg}>
      
      <View style={styles.wrapper}>
      <Text style={styles.title}>Course Details</Text>
        <View style={styles.content}>
        <Text style={styles.text}>Name {course.cname}</Text>
        <Text style={styles.text}>Credits: {course.credits}</Text>
        <Text style={styles.text}>Obtained grade: {course.student_grade}</Text>
        <Text style={styles.text}>Description: {course.cdesc}</Text>
        </View>

      </View>
      <View style={styles.wrapper1}>
      <Text style={styles.title}>Marks</Text>

      <FlatList
          data={course.marks || []}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Name: {item.name}</Text>
              <Text style={styles.text}>Obtained Marks: {item.obtained}</Text>
              <Text style={styles.text}>Max Marks: {item.max}</Text>
              <Text style={styles.text}>Weightage: {item.weightage}</Text>
            </View>
          )}
        />
      </View>
      <Button style={styles.addcbut}title="Add Marks" onPress={handleModal}></Button>
      {isModalVisible && <Modal animationType = {"fade"}  
          transparent = {true} isVisible={isModalVisible}>
            <View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:1, paddingTop:100,}}>
              <View style = {styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleModal}
              >
                <Text style={styles.closeButtonText}>&#10006;</Text>
              </TouchableOpacity>

              <DropDownPicker
                items={categories}
                open={open}
                placeholder="Select assessment category"
                value={value}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa', width:'100%' }}
                itemStyle= {{
                  fontSize: 15,
                  height: 75,
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  width:100
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                setValue={setValue}
                setOpen={setOpen}

                onSelectItem={handleCategoryChange}
              />

                {/* Subcategory Dropdown */}
                {selectedCategory && (
                  <DropDownPicker
                    items={subcategories[selectedCategory]}
                    open={open2}
                    placeholder="Select a subcategory"
                    value={value2}
                    containerStyle={{ height: 40, marginTop: 10 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: 'black' }}
                    setValue={setValue2}
                    setOpen={setOpen2}
                    onSelectItem={handleSubcategoryChange}
                  />
                )}

              <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  placeholder='Obtained Mark'
                  onChangeText={(text)=> setObtainedMarks(text.replace(/[^0-9]/g, ''))}
                  value={obtainedMarks}
                  maxLength={10}
              />
              <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  placeholder='Max Marks'
                  onChangeText={(text)=> setMaxMarks(text.replace(/[^0-9]/g, ''))}
                  value={maxMarks}
                  maxLength={10}
              />
              <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  placeholder='Weightage'
                  onChangeText={(text)=> setWeightage(text.replace(/[^0-9]/g, ''))}
                  value={weightage}
                  maxLength={10}
              />
              
              <Text style={styles.label}>Select a Date:</Text>
              <DatePicker style={{height:100}}mode="date" date={date} onDateChange={setDate} />
              {/* <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.dateButton}>Open Date Picker</Text>
              </TouchableOpacity>
              <Text style={styles.selectedDate}>
                Selected Date: {date.toDateString()}
              </Text> */}
                
              <TouchableOpacity style={styles.buttonContainer1} onPress={handleAddMarks}><Text style={styles.buttonText}>Apply</Text></TouchableOpacity>
              </View>
              </View>
            </Modal>}

    </View>

    
  )
}

const styles = StyleSheet.create({
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : 'white',   
    height: 450 ,  
    width: '90%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 200,  
    marginLeft: 40,  
  }, 
  bg: {
    backgroundColor: 'white',
    height:'100%',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderColor: '#C0C0C0',
    borderWidth: 0.4,

  },
  wrapper: {
    backgroundColor: '#fff',
    width:'90%',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
  },
  wrapper1: {
    backgroundColor: '#fff',
    width:'90%',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    height:400
    
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
  details: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 15,
    color: '#000',
  },
  content: {
    marginHorizontal:10,
    color:'red',
    fontSize: 20,
  },
  addcbut: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: 5,
    marginTop: 10,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
  
});