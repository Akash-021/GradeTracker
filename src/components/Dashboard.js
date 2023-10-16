import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
  const currentGrade = 9.8
  const gotoCoursesPage = ()=>{
    navigation.navigate('CourseDetail')
  }

  return (
    <View>
      <Text style={styles.heading}>Welcome to the Dashboard</Text>

      <Text style={styles.gradeDisplay}>Your current Grade: {currentGrade} </Text>
      <View style={styles.card} onTouchStart={gotoCoursesPage}>
        <Text style={{fontSize:20,color:"black"}}>Courses</Text>
        <Text>{"\n"}</Text>
          <View style={styles.user}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: "https://cdn.theatlantic.com/thumbor/5T-358hrx4dcsOlQKo024rmLHf4=/0x0:2000x1125/1600x900/media/img/mt/2023/07/books_picku_up_put_down_final/original.jpg" }}
              />
          </View>
      </View>

      


    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    alignItems: 'center',
    color:"black",
    fontSize: 30,
    margin: 5
  },

  card:{
    height:256,
    width:"90%",
    backgroundColor:"lightgrey",
    marginHorizontal:15,
    padding:10,
    color:"black",
    borderRadius:10
  },

  image: {
    width: "100%", // Set the desired width
    height: 170, // Set the desired height
    resizeMode: 'cover', // Adjust the resizeMode as needed
  },


  gradeDisplay:{
    fontSize:20,
    color:"black",
    padding:3,
    paddingTop:8,
    paddingLeft:10,
    borderWidth:4,
    borderColor:"rgba(0,0,0,0.15)",
    marginHorizontal:15,
    borderCurve: 10,
    borderRadius: 10,
    width:"90%",
    marginBottom:5
  }
});

export default Dashboard;
