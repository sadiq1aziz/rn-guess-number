import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = ( props ) => 
        <Text style={styles.textStyle}>{props.children}</Text>;

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: 'blue',
        fontFamily: 'open-sans-bold'
    }
});

export default TitleText;

