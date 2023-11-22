import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import ImageButton from './ImageButton';


const SemItem = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputSgpa, setInputSgpa] = useState('');
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  function editPressed(){
    console.log("editing sgpa of sem:",props.sem)
    console.log("curr sgpa :",props.sgpa)
    const sg = props.sgpa
    sg[props.sem] = Number(inputSgpa)
    console.log("temp sgps:",sg)
    props.updateSgpa(sg)
    handleModal()

  }


  return (
    <View style= {styles.bg}>
      <View style = {styles.semContainer}>
          
          <View style={styles.squareContainer}>
            <Text style={styles.semId}>SEM {props.sem + 1}</Text>
          </View>

          <View style={styles.sgpaContainer}>
            <Text style={styles.semtext}> {props.text}</Text>
            <Text style={styles.sgpaTextView}>SGPA</Text>
          </View>

          <View style={styles.buttonContainer}>
            <ImageButton 
              src={"https://cdn-icons-png.flaticon.com/512/84/84380.png"} 
              onClick={handleModal}/>
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
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Enter SGPA'
                    onChangeText={(text)=> setInputSgpa(text.replace(/[^0-9]/g, ''))}
                    value={inputSgpa}
                    maxLength={10}
                />
                <TouchableOpacity style={styles.buttonContainer1} onPress={editPressed}><Text style={styles.buttonText}>Apply</Text></TouchableOpacity>
              </View>
              </View>
            </Modal>}
          </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : 'white',   
    height: 200 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 200,  
    marginLeft: 40,  
     
     },  
  bg: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderColor: '#C0C0C0',
    borderWidth: 0.4,

  },

  semContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'row',
    justifyContent:"flex-end",
    marginLeft:'auto',
  },

  squareContainer: {
    width: 64,
    height: 64,
    color: 'white',
    backgroundColor: '#8b7afa',
    borderRadius: 5,
    textAlign:'center',

    justifyContent: 'center',
    alignItems: 'center',
    flex:0
  },
  semId:{
    fontSize:15,
    color:"white",
    fontWeight:"bold"
  },
  sgpaContainer:{
    width: 100,
    display:"flex",
    flexDirection:"row",
  },
  semtext: {
    color: 'black',
    fontSize: 30,
    fontWeight:"900",
    paddingLeft:5,
  },
  sgpaTextView:{
    fontSize:15,
    flexDirection:"column",
    justifyContent:"flex-end",
    verticalAlign:"bottom",
  },
  buttonContainer: {
    width:100,
    textAlign: "left"
  },

  edbutton:{
    marginLeft:50
  },

  rightContainer:{
    flexDirection:"row",
    alignItems:"space-between",
    alignItems: 'center',
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius:10,
    padding: 10,
  },
  buttonContainer1: {
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

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // or any color you prefer
  },
});

export default SemItem;