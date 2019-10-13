import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import { SafeAreaView } from 'react-navigation';

import AppIndex from './navigation/MixedNavigators';

var firebaseConfig = {
  apiKey: "AIzaSyCq1FB0UpoovEmmKEO22MSdhzfVd616szM",
  authDomain: "connectus-8b8d6.firebaseapp.com",
  databaseURL: "https://connectus-8b8d6.firebaseio.com",
  projectId: "connectus-8b8d6",
  storageBucket: "",
  messagingSenderId: "185034998464",
  appId: "1:185034998464:web:65b1831c269e93ec"
};

console.ignoredYellowBox = ['Setting a timer'];

firebase.initializeApp(firebaseConfig)

export default function App(props) {

  YellowBox.ignoreWarnings(['Setting a timer']);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    console.ignoredYellowBox = ['Setting a timer'];
    YellowBox.ignoreWarnings(['Setting a timer']);
    return (
      
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
        
      />
    );
  } else {
    return (
      
      <View style={styles.container}>
        
        <AppNavigator />
        
      </View>
      
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
});
