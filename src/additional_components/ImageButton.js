import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    view: {
      position: 'absolute',
      backgroundColor: 'transparent'
    },
    image: {
        height:30,
        width:30,
    },
    touchable: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 18,
      textAlign: 'center'
    }
  })

export default function ImageButton(props) {
    return (
        <TouchableOpacity style={styles.touchable} onPress={props.onClick}>
        {props.src && <Image
                src={props.src}
                style={styles.image} />}
        </TouchableOpacity>
    )
}
