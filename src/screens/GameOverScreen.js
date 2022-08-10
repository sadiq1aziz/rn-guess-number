import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Constants from '../../Constants/Constants';
import CustomButton from '../components/CustomButton.js'

const GameOverScreen = props => {
    return (
        <ScrollView>
         <View style={styles.screen}>
            <TitleText>The Game is over!</TitleText>
            <View style={styles.imageContainer}>
            <Image 
                    //source={require('../../assets/images/success.png')} 
                       source={{uri: 'https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g='}}
                       style={styles.image}
                       resizeMode='cover'
                       />   
            </View>
            <BodyText style={styles.resultContainer}>Your device took <Text style={styles.resultValue}>{props.count}</Text> number of attempts to guess the number : <Text style={styles.resultValue}>{props.userChoice}</Text>
            </BodyText>
            <CustomButton onPress={props.onRestart}>START NEW GAME</CustomButton>
        </View>
        </ScrollView>
 )};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 100,
        padding: 10
    },
    image: {
      height: '100%',
      width: '100%'
    },
    imageContainer: {
        borderRadius: 200,
        borderWidth: 1,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden'
    },
    resultContainer: {
        fontSize: 17,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    resultValue: {
        color: Constants.primaryColor,
        marginHorizontal: 20
    }
});

export default GameOverScreen;