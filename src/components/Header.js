import React from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from './BodyText';

const Header = ( props ) => (
    <View style={styles.headerContainer}>
        <BodyText>{props.title}</BodyText>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 80,
        backgroundColor: '#ff1493'
    },
    title: { 
        color: "black",
    }   
});

export default Header;

