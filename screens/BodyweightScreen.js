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
	AsyncStorage
} from "react-native";

import { MonoText } from "../components/StyledText";
import Icon from "react-native-vector-icons/Ionicons";

import * as Firebase from "../components/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";

import MotionSlider from "react-native-motion-slider";

export default class BodyweightScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyweight: 60
		};
		this.storeBWValues();
	}
	
	storeBWValues = async () => {
		const { bodyweight} = this.state;
		AsyncStorage.setItem(
      "Bodyweight",
      JSON.stringify({ bodyweight })
    );
	}

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={styles.header}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>
            Note: Tap the checkmark above to record input.
          </Text>
        </View>
        <View style={styles.sliders}>
          <MotionSlider
            style={styles.slider}
            title={"Bodyweight"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={50}
            max={120}
            height={60}
            width={400}
            value={60}
            decimalPlaces={0}
            units={"kg"}
            backgroundColor={[
              "rgb(255, 87, 34)",
              "#CDDC39",
              "rgb(255, 87, 34)"
            ]}
            fontSize={20}
            onValueChanged={bodyweight =>
              this.setState({ bodyweight}, () => {
                this.storeBWValues();
              })
            }
            onPressIn={() => this.storeBWValues()}
            onPressOut={() => this.storeBWValues()}
            onDrag={() => this.storeBWValues()}
          />
        </View>
        <View style={styles.extraFlex}></View>
      </View>
    );
  }
}

export const addBWInput = async props => {
  try {
    const user = firebase.auth().currentUser;
    if (user != null) {
      const uid = user.uid;
      const db = firebase.firestore();
      const timestamp = Date.now();
      const data = JSON.parse(await AsyncStorage.getItem("Bodyweight"));
      const UFRef = db
        .collection("users")
        .doc(uid)
        .collection("Bodyweight")
        .doc(timestamp.toString());
      UFRef.set({
				bodyweight: data.bodyweight,
        timestamp
      });

      Alert.alert(
        "Success",
        "Your Body Weight input has been saved!",
        [
          {
            text: "OK",
            onPress: () => console.log("Should Navigate")
          }
        ],
        { cancelable: false }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  tabBarInfoContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  sliders: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  extraFlex: {
    flex: 2
  },
  titleStyle: {
    fontSize: 35,
    color: "black"
  }
});
