import React from 'react';
import { StyleSheet, View} from 'react-native';


const Card = props => {
 return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
 )};


const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2}, 
        shadowRadius: 5,
        shadowOpacity: 0.26,
        borderRadius: 5,
        marginVertical: 15,
    }
});

export default Card;