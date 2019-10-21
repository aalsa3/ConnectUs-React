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
  Slider,
  AsyncStorage,
  Alert
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Icon from "react-native-vector-icons/Ionicons";


import * as Firebase from '../components/Firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';

import MotionSlider from 'react-native-motion-slider'


export default class BloodpressureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          systolic: 60, diastolic: 60
        };
        this.storeBloodPressureValues();
    }

    storeBloodPressureValues = async() => {
      const {systolic, diastolic} = this.state;
      AsyncStorage.setItem('Bloodpressure', JSON.stringify({systolic,diastolic}));
    }
  

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={styles.header}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>
            Note: Tap the checkmark above to record input.
          </Text>
        </View>

        <View style = {styles.slidersContainer}>
        <View style={styles.sliders}>
          <MotionSlider
            style={styles.slider}
            title={"Systolic"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={70}
            max={190}
            value={100}
            height = {60}
            decimalPlaces={0}
            units={""}
            backgroundColor={["#9c27b0", "#9c27b0", "#9575cd", "#4caf50", "#4caf50", "#4caf50", "#4caf50",
              "#cddc39", "#ff9800", "#ff9800", "#ff5722", "#ef5350", "#ef5350", "#ef5350", "#ef5350", "#ef5350"]}
            fontSize={21}
            onValueChanged={systolic =>
              this.setState({ systolic }, () => {
                this.storeBloodPressureValues();
              })
            }
            onPressIn={() => this.storeBloodPressureValues()}
            onPressOut={() => this.storeBloodPressureValues()}
            onDrag={() => this.storeBloodPressureValues()}
          />
        </View>

        <View style={styles.sliders}>
          <MotionSlider
            title={"Diastolic"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={40}
            max={105}
            value={70}
            height = {60}
            decimalPlaces={0}
            units={""}
            backgroundColor={["#9c27b0", "#00796b", "#4caf50", "#fdd835", "#ff9800", "#ef5350"]}
            fontSize={21}
            onValueChanged={diastolic =>
              this.setState({ diastolic }, () => {
                this.storeBloodPressureValues();
              })
            }
            onPressIn={() => this.storeBloodPressureValues()}
            onPressOut={() => this.storeBloodPressureValues()}
            onDrag={() => this.storeBloodPressureValues()}
          />
        </View>
        <View style = {styles.sliders}></View>
        </View>
        <View style={styles.extraFlex}></View>
      </View>
    );
  }
}

export const addBPInput = async(props) => {
	try {
		const user = firebase.auth().currentUser;
		if (user != null) {
			const uid = user.uid;
			const db = firebase.firestore();
			const timestamp = Date.now();
			const data = JSON.parse(await AsyncStorage.getItem('Bloodpressure'));
			const UFRef = db.collection('users').doc(uid).collection('Bloodpressure').doc(timestamp.toString());
			UFRef.set({
				systolic: data.systolic,
				diastolic: data.diastolic,
				timestamp
      });
      
      let alertString = "";
      if ( 180 < data.systolic || 120 < data.diastolic ) {
        alertString =
        "You are in HYPERTENSIVE CRISIS! Please contact your health clinician immediately!";
      }
			Alert.alert(
				'Done',
				'Your Blood Pressure input has been saved!\n\n' + alertString,
				[
					{
						text: 'OK',
					}
				],
				{cancelable: false},
			);
		}
	}
	catch(error) {
		console.log(error);
	}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slidersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabBarInfoContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4dd0e1",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
	  color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sliders: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  extraFlex: {
    height: "20%"
  },
  titleStyle: {
    fontSize: 30,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});
