import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = ( props ) => 
        <Text style={{...styles.textStyle, ...props.style } }>{props.children}</Text>;

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'open-sans-regular'
    }
});

export default BodyText;

