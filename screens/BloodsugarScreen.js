import * as WebBrowser from "expo-web-browser";
import React from "react";
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
} from "react-native";

import { MonoText } from "../components/StyledText";
import Icon from "react-native-vector-icons/Ionicons";

import * as Firebase from "../components/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";

import MotionSlider from "react-native-motion-slider";

export default class BloodsugarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glucose: 75
    };
    this.storeGlucoseValues();
  }

  storeGlucoseValues = async() => {
    const {glucose} = this.state;
    AsyncStorage.setItem('Bloodsugar', JSON.stringify({glucose}));
  }

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={styles.header}>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.titleText}>
            Note: Tap the checkmark above to record input. Record after fasting
            for at least 8 hours.
          </Text>
        </View>
        <View style={styles.sliders}>
          <MotionSlider
            style={styles.slider}
            title={"Blood Sugar"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={50}
            max={315}
            value={75}
            decimalPlaces={0}
            height={60}
            width={400}
            units={"mg/dL"}
            backgroundColor={[
              "#ff5722",
              "#ff9800",
              "#ff9800",
              "#4caf50",
              "#4caf50",
              "#4caf50",
              "#cddc39",
              "#cddc39",
              "#ff9800",
              "#ff9800",
              "#ff9800",
              "#ff9800",
              "#ff9800",
              "#c62828"
            ]}
            fontSize={21}
            onValueChanged={glucose =>
              this.setState({ glucose }, () => {
                this.storeGlucoseValues();
                console.log(this.state.glucose);
                
              })
            }
            onPressIn={() => this.storeGlucoseValues()}
            onPressOut={() => this.storeGlucoseValues()}
            onDrag={() => this.storeGlucoseValues()}
          />
        </View>
        <View style={styles.extraFlex}></View>
      </View>
    );
  }
}

export const addBSInput = async(props) => {
	try {
		const user = firebase.auth().currentUser;
		if (user != null) {
			const uid = user.uid;
			const db = firebase.firestore();
			const timestamp = Date.now();
			const data = JSON.parse(await AsyncStorage.getItem('Bloodsugar'));
			const UFRef = db.collection('users').doc(uid).collection('Bloodsugar').doc(timestamp.toString());
			UFRef.set({
        glucose: data.glucose,
				timestamp
			});

			Alert.alert(
				'Success',
				'Your Blood Sugar input has been saved!',
				[
					{
						text: 'OK',
						onPress: () => console.log("Should Navigate"),
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
    backgroundColor: "#fff"
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
    paddingHorizontal: 20,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
});
