import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InteractionManager,
  Modal,
  Slider
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Icon from "react-native-vector-icons/Ionicons";


import * as Firebase from '../components/Firebase';

import MotionSlider from 'react-native-motion-slider'


export default class BodyweightScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          before: 60, after: 60}
    }
    getVal(val){
        console.log(val)
    }
  
  logout(navigation) {
    Firebase.logoutUser();
  
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Auth');
    })
  }

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={styles.header}>
          <Text style={styles.titleText}> Note: Record every x hours. Store other key info. </Text>
        </View>
        <MotionSlider
          style={styles.slider}
          title={"Bodyweight"}
          min={25}
          max={150}
          value={60}
          decimalPlaces={0}
          units={"kg"}
          backgroundColor={[
            "rgb(3, 169, 244)",
            "rgb(255, 152, 0)",
            "rgb(255, 87, 34)"
          ]}
          fontSize={25}
          onValueChanged={value => (this.state.before = value)}
          onPressIn={() => console.log("Pressed in")}
          onPressOut={() => console.log("Pressed out")}
          onDrag={() => console.log(this.state.before)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#4dd0e1",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleText: {
	  paddingHorizontal: 20,
	  textAlign: 'left',
	  fontSize: 15,
	  color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
