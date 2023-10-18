import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ImageButton from './ImageButton';


const SemItem = (props) => {

  function editPressed(){
    console.log("editing sgpa of sem:",props.sem)
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
              onClick={editPressed}/>
          </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default SemItem;