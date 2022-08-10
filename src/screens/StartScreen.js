import React, { useState, useEffect } from 'react';
import { StyleSheet, 
         Text, 
         View, 
         Button, 
         TouchableWithoutFeedback, 
         Keyboard,
         Alert,
         Dimensions,
         ScrollView,
         KeyboardAvoidingView
        } from 'react-native';

import Card from '../components/Card.js';
import Constants from '../../Constants/Constants.js';
import Input from '../components/Input.js';
import OutputContainer from '../components/OutputContainer.js';
import CustomButton from '../components/CustomButton.js';


const StartScreen = props => {

    let buttonDimensions = Dimensions.get('window').width / 4;

    const [ enteredText, setEnteredText ] = useState('');
    const [ confirmInput, setConfirmInput ] = useState(false);
    const [ submittedInput, setSubmittedInput ] = useState('');
    const [ buttonWidth, setButtonWidth ] = useState(buttonDimensions);

   
    
    useEffect( () => {
        const updateButtonWidth = () => {
            setButtonWidth(buttonDimensions)
        }
        
        Dimensions.addEventListener('change', updateButtonWidth);
        return () => {
            Dimensions.removeEventListener('change', updateButtonWidth);
        }

    }); 


    const inputTextHandler = inputText => {
        setEnteredText(inputText.replace(/[^0-9]/g, ''))
    }

    const confirmHandler = () => {
        const handledInput = parseInt( enteredText );
        console.log( handledInput );
        if (  isNaN( handledInput ) || handledInput <= 0 || handledInput >= 100 ) {
            Alert.alert( 'Invalid Input', "Number to be entered should be between 0 and 100", [ {
                text: "okay",
                onPress: resetHandler,
                style: 'destructive'
            }]);
            console.log('n');
            return ;
        }
        console.log('n0');
        setSubmittedInput(handledInput);
        setConfirmInput(true);
        setEnteredText('');
    }

    const resetHandler = () => {
        setConfirmInput(false);
        setEnteredText('');
    }

    let confirmedInputText

    if ( confirmInput ) {
        confirmedInputText = 
            <Card style={styles.numberContainer}>
                <Text style={styles.selectText}>You have selected</Text>
                    <OutputContainer output={submittedInput}/>
                <CustomButton onPress={() => {props.onStart(submittedInput)}}>
                    START GAME
                </CustomButton>
            </Card>
    }

    return (
      <ScrollView > 
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screenContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Card style={styles.inputContainer}>
                    <Text>Enter a number</Text>
                    <Input autoCapitalize='none'
                        autoComplete='off'
                        blurOnSubmit
                        keyboardType="number-pad"
                        maxLength={2}
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={inputTextHandler}
                        value={enteredText}
                        disableFullscreenUI={true}
                    />
                    <View style={styles.buttons}>
                        <View style={{width: buttonWidth}}>
                            <Button title="Confirm" onPress={confirmHandler} color={Constants.primaryColor} />
                        </View>
                        <View style={{width: buttonWidth}}>
                            <Button title="Reset" onPress={resetHandler} color={Constants.secondaryColor} />
                        </View>
                    </View>
                </Card>
                {confirmedInputText}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
       </ScrollView> 
    )
};

const styles = StyleSheet.create({
    screenContainer: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        alignItems: 'center',
        width: '80%',
        minWidth: 300,
        maxWidth: '95%'
    },

    buttons: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 19,
        fontWeight: '700'
    },
    input: {
        textAlign: 'center'
    },
    numberContainer: {
        marginTop: Dimensions.get('window').width > 300 ? 20 : 5,
        alignItems: 'center'
    },
    selectText: {
        color: 'red',
        fontSize: 15,    
    },
});

export default StartScreen;
