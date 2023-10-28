import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = auth().currentUser;

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.uid);
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = firestore()
        .collection('Users')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            setUser(userData);
            setDisplayName(userData.displayName);
            setEmail(userData.email);
            console.log("sdfd",userData.displayName);
          }
        });

      return () => unsubscribe();
    }
  }, [userId]);


  const handleSaveProfile = async () => {
    try {
      await currentUser.updateProfile({
        displayName: displayName,
      });

      if (email !== currentUser.email) {
        await currentUser.updateEmail(email);
      }

      // Update the user's data in Firestore
      if (user) {
        await firestore().collection('Users').doc(userId).update({
          displayName: displayName,
          email: email,
        });
      }

      // Log the updated values from Firestore
      const updatedFirestoreData = await firestore()
        .collection('Users')
        .doc(userId)
        .get();
      console.log('Firestore Data after Update:', updatedFirestoreData.data());

      // Inform the user that their profile has been updated
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update profile. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" }} style={styles.image} />
      {isEditing ? (
        <View>
          <TextInput
            style={styles.text_input}
            placeholder="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <TextInput
            style={styles.text_input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Save" onPress={handleSaveProfile} />
        </View>
      ) : (
        <View style={{marginTop:30}}>
          <Text style={styles.input}><Text style={{fontWeight: "bold"}}>Name:</Text> {displayName}</Text>
          <Text style={styles.input}><Text style={{fontWeight: "bold"}}>Email:</Text> {email}</Text>
          {/* <Pressable style={styles.button} onPress={() => setIsEditing(true)}><Text style={styles.Text}>Edit Profile</Text></Pressable> */}
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>{setIsEditing(true)}}><Text>Edit Profile</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 20,
    marginTop:50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color:"black"
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    padding: 10,
    color:"black",
    backgroundColor:"lightgrey",
    borderRadius:10
  },
  text_input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderWidth:1,
    borderColor:"black",
    paddingLeft:"2px",
    color:"black"
  },
  image: {
    width: 200, // Set the desired width
    height: 200, // Set the desired height
    resizeMode: 'cover', // Adjust the resizeMode as needed
  },
  button:{
    padding:10,
    borderRadius: 10,
    marginHorizontal:5,
    backgroundColor:"lightblue",
  },
  buttonContainer: {
    width: 120,
    height: 50,
    backgroundColor: '#90A4AE', // A nice shade of blue
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34495e', // Slightly darker shadow color
    shadowOffset: { width: 0, height: 4 }, // Bigger shadow
    shadowOpacity: 0.7, // Stronger shadow
    shadowRadius: 3, // Larger shadow radius
    marginTop: 15,
    marginLeft:20,

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default UserProfile;
