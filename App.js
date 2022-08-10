import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './src/components/Header.js';
import StartScreen from './src/screens/StartScreen.js';
import GameScreen from './src/screens/GameScreen.js';
import GameOverScreen from './src/screens/GameOverScreen.js';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

export default function App() {


  const fetchFonts =  Font.loadAsync({
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });


  const startFresh = () => {
    setUserNumber('');
    setCountGuesses(0);
  };

  const onStartHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const onGameOverHandler = count => {
    setCountGuesses(count);
  };

  const [userNumber, setUserNumber] = useState('');
  const [countGuesses, setCountGuesses] = useState(0);
  const [loadedStatus, setLoadedStatus] = useState(false);

  if ( !loadedStatus ) {
    <AppLoading startAsync={fetchFonts}
                onFinish={() => { setLoadedStatus(true)}}
                onError={ (err) => console.log(err)}
    />
  }

 let selectedScreen = <StartScreen title="Start the game" onStart={onStartHandler} />;
 //let selectedScreen = <GameOverScreen count={countGuesses} userChoice={userNumber} onRestart={startFresh}  />
  if (userNumber && countGuesses === 0) {
    selectedScreen = <GameScreen userChoice={userNumber} onGameOver={onGameOverHandler} />
  } else if (countGuesses > 0) {
    selectedScreen = <GameOverScreen count={countGuesses} userChoice={userNumber} onRestart={startFresh} />
  } 

  return (
    <View style={styles.screen}>
      <Header
        title="Guess the number"
      />
      {selectedScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
