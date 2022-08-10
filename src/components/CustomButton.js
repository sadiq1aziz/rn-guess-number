import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CustomButton = ( props ) => (
<TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>    
    <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.children}</Text>
    </View>
</TouchableOpacity>

);

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: 'pink',
        borderRadius: 10,
   },
    buttonText: { 
        fontFamily: 'open-sans-bold',
        color: 'white'
    }   
});

export default CustomButton;

