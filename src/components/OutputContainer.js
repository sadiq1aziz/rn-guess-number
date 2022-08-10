import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Constants from '../../Constants/Constants';

const OutputContainer = props => {
 return (
    <View style={styles.container}>
        <Text>{props.output}</Text>
    </View>
 
 )};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: Constants.primaryColor,
        borderRadius: 5,
        // marginHorizontal: 50,
        marginVertical: 10
    }
});

export default OutputContainer;