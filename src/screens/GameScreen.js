import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import OutputContainer from '../components/OutputContainer';
import CustomButton from '../components/CustomButton';
import BodyText from '../components/BodyText'
import Constants from '../../Constants/Constants';

const guessNumberFunction = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNumberGenerated = Math.floor((Math.random() * (max - min))) + min;
    if (randomNumberGenerated === exclude || isNaN(randomNumberGenerated)) {
        return guessNumberFunction(min, max, exclude);
    } else {
        return randomNumberGenerated;
    }
}

const GameScreen = props => {
    const { userChoice, onGameOver } = props;
    const numberGenFunction = guessNumberFunction(1, 100, userChoice)
    const [ guessNumber, setGuessNumber] = useState(numberGenFunction);
    const [ guessList, setGuessList] = useState([numberGenFunction.toString()]);
    const [ availableScreenHeight, setAvailableScreenHeight ] = useState( Dimensions.get('window').height );
    const [ availableScreenWidth, setAvailableScreenWidth] = useState( Dimensions.get('window').width );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect( () => {

    const updateLayout = () => {
        setAvailableScreenHeight( Dimensions.get('window').height );
        setAvailableScreenWidth( Dimensions.get('window').width );
    }    
    
    Dimensions.addEventListener( 'change', updateLayout );
    return ( () => {
        Dimensions.removeEventListener( 'change', updateLayout);
    });
    });


    useEffect(() => {
        if (guessNumber === userChoice) {
            onGameOver(guessList.length);
        }
    }, [guessNumber, userChoice, onGameOver]);

    const buttonHandler = (indicator) => {
        console.log(guessNumber);
        if ((indicator === 'lower' && props.userChoice > guessNumber) ||
            (indicator === 'higher' && props.userChoice < guessNumber)) {
            Alert.alert('This aint right', 'You have selected the wrong indicator !', [{
                text: "Okay",
                style: "cancel",
            }]);
            return;
        }
        if (indicator === 'lower') {
            currentHigh.current = guessNumber;
        } else {
            currentLow.current = guessNumber + 1;
        }
        const regenerateNumber = guessNumberFunction(currentLow.current, currentHigh.current, guessNumber);
        setGuessNumber(regenerateNumber);
        setGuessList(latestGuess => [regenerateNumber.toString(), ...latestGuess]);
    }

    const renderItemList = (guessLength, dataItem) => (
        <View style={styles.item}>
            <BodyText style={styles.text}>{guessLength - dataItem.index}</BodyText>
            <BodyText style={styles.text}>#{dataItem.item}</BodyText>
        </View>
    );
    let customButtonSize = availableScreenWidth > 300 ? 23 : 10

    const alternativeView = <View style={styles.screen}>
        <Text> The guessed number is: </Text>
        <View style={styles.controls}>
            <CustomButton onPress={() => buttonHandler('lower')}>
                <Ionicons name="md-remove" size={customButtonSize} color='white' />
            </CustomButton>
            <OutputContainer output={guessNumber} />
            <CustomButton onPress={() => buttonHandler('higher')}>
                <Ionicons name="md-add" size={customButtonSize} color='white' />
            </CustomButton>
        </View>
        <View style={styles.scroll}>
            <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={dataItem => dataItem}
                data={guessList}
                renderItem={renderItemList.bind(this, guessList.length)}
            />
        </View>
    </View>

    if (availableScreenHeight < 500) {
        return (
            <>
            { alternativeView }
            </>
        )
    } else {
        return (
            <View style={styles.screen}>
                <Text> The guessed number is: </Text>
                < OutputContainer output={guessNumber} />
                <Card style={styles.buttonContainer}>
                    <CustomButton onPress={() => buttonHandler('lower')}>
                        <Ionicons name="md-remove" size={customButtonSize} color='white' />
                    </CustomButton>
                    <CustomButton onPress={() => buttonHandler('higher')}>
                        <Ionicons name="md-add" size={customButtonSize} color='white' />
                    </CustomButton>
                </Card>
                <View style={styles.scroll}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={dataItem => dataItem}
                        data={guessList}
                        renderItem={renderItemList.bind(this, guessList.length)}
                    />
                </View>
            </View>
        )
    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width > 300 ? 200 : 100,
        justifyContent: 'space-between'
    },
    scroll: {
        flex: 1,
        width: '70%'
    },
    text: {
        color: Constants.primaryColor,
        fontSize: 16
    },
    item: {
        flexDirection: 'row',
        marginTop: 30,
        padding: 10,
        justifyContent: 'space-around',
        borderRadius: 40,
        borderColor: Constants.primaryColor,
        borderWidth: 1,
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        width: '80%'
    }
});

export default GameScreen;