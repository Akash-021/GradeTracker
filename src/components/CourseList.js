import React from 'react';
import { View, Text, Button } from 'react-native';

const CourseList = ({ navigation }) => {
  return (
    <View>
      <Text>Your Course List</Text>
      <Button
        title="Course Details"
        onPress={() => navigation.navigate('CourseDetail')}
      />
    </View>
  );
};

export default CourseList;
