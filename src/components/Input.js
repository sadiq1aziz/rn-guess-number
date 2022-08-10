import React from 'react';
import { StyleSheet, TextInput} from 'react-native';


const Input = props => {
 return (
        <TextInput { ...props } style={{ ...styles.input, ...props.style }} />
 )};


const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        height: 20
    }
});

export default Input;