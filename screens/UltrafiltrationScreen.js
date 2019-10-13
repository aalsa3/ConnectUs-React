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

export default class UltrafiltrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      before: 90,
      after: 90,
      duration: 4
    };
    this.storeUltrafiltrationValues();
  }

  storeUltrafiltrationValues = async () => {
    const { before, after, duration } = this.state;
    AsyncStorage.setItem(
      "Ultrafiltration",
      JSON.stringify({ before, after, duration })
    );
  };

  render() {
<<<<<<< Updated upstream
             return (
               <View style={styles.tabBarInfoContainer}>
                 <View style={styles.header}>
                   <Text style={styles.titleText}>
                     Note: Record every x hours. Store other key info.
                   </Text>
                 </View>
                 {/* <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={0}
          maximumValue={100}
          value={this.state.before}
          onValueChange={val => this.setState({ before: val })}
          onSlidingComplete={val => this.getVal(val)}
        /> */}
                 <MotionSlider
                  style = {styles.slider}
                   title={"UF Before"}
                   min={30}
                   max={90}
                   value={60}
                   decimalPlaces={0}
                   units={""}
                   backgroundColor={[
                     "rgb(3, 169, 244)",
                     "rgb(255, 152, 0)",
                     "rgb(255, 87, 34)"
                   ]}
                   fontSize = {25}
                   onValueChanged={value => (this.state.before = value)}
                   onPressIn={() => console.log("Pressed in")}
                   onPressOut={() => console.log("Pressed out")}
                   onDrag={() => console.log(this.state.before)}
                 />

                 <MotionSlider
                   title={"UF After"}
                   min={30}
                   max={90}
                   value={60}
                   decimalPlaces={0}
                   units={""}
                   backgroundColor={[
                     "rgb(3, 169, 244)",
                     "rgb(255, 152, 0)",
                     "rgb(255, 87, 34)"
                   ]}
                   fontSize = {25}
                   onValueChanged={value => (this.state.before = value)}
                   onPressIn={() => console.log("Pressed in")}
                   onPressOut={() => console.log("Pressed out")}
                   onDrag={() => console.log(this.state.before)}
                 />
               </View>
             );
           }
=======
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={styles.header}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>
            Note: Tap the checkmark above to record input.
          </Text>
        </View>

        {/* Slider for pre ultrafiltration */}
        <View style={styles.sliders}>
          <MotionSlider
            title={"Weight Before Ultrafiltration"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={50}
            max={120}
            value={90}
            height={60}
            width={400}
            decimalPlaces={0}
            units={"kg"}
            backgroundColor={[
              "rgb(255, 87, 34)",
              "#CDDC39",
              "rgb(255, 87, 34)"
            ]}
            fontSize={20}
            onValueChanged={before =>
              this.setState({ before }, () => {
                this.storeUltrafiltrationValues();
              })
            }
            onPressIn={() => this.storeUltrafiltrationValues()}
            onPressOut={() => this.storeUltrafiltrationValues()}
            onDrag={() => this.storeUltrafiltrationValues()}
          />
        </View>

        {/* Slider for post ultrafiltration  */}
        <View style={styles.sliders}>
          <MotionSlider
            title={"Target Weight After Ultrafiltration"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={50}
            max={120}
            value={90}
            height={60}
            width={400}
            decimalPlaces={0}
            units={"kg"}
            backgroundColor={[
              "rgb(255, 87, 34)",
              "#CDDC39",
              "rgb(255, 87, 34)"
            ]}
            fontSize={20}
            onValueChanged={after =>
              this.setState({ after }, () => {
                this.storeUltrafiltrationValues();
              })
            }
            onPressIn={() => this.storeUltrafiltrationValues()}
            onPressOut={() => this.storeUltrafiltrationValues()}
            onDrag={() => this.storeUltrafiltrationValues()}
          />
        </View>

        {/* Slider for UF Duration*/}
        <View style={styles.sliders}>
          <MotionSlider
            title={"Dialysis Session Duration (hours)"}
            titleColor="black"
            titleStyle={styles.titleStyle}
            min={1}
            max={10}
            value={4}
            height={60}
            width={400}
            decimalPlaces={0}
            units={""}
            backgroundColor={["#4dd0e1", "#1e88e5"]}
            fontSize={20}
            onValueChanged={duration =>
              this.setState({ duration }, () => {
                this.storeUltrafiltrationValues();
              })
            }
            onPressIn={() => this.storeUltrafiltrationValues()}
            onPressOut={() => this.storeUltrafiltrationValues()}
            onDrag={() => this.storeUltrafiltrationValues()}
          />
        </View>

        <View style={styles.extraFlex}></View>
      </View>
    );
  }
>>>>>>> Stashed changes
}

export const addUFInput = async props => {
  try {
    const user = firebase.auth().currentUser;
    if (user != null) {
      const uid = user.uid;
      const db = firebase.firestore();
      const timestamp = Date.now();
      const data = JSON.parse(await AsyncStorage.getItem("Ultrafiltration"));
      const UFRef = db
        .collection("users")
        .doc(uid)
        .collection("Ultrafiltration")
        .doc(timestamp.toString());
      const UFRate = Number(
        ((data.before - data.after) * 1000) / data.duration / data.after
      ).toFixed(2);
      var alertString = "";
      UFRef.set({
        before: data.before,
        after: data.after,
        duration: data.duration,
        timestamp,
        UFRate
      });

      if (UFRate >= 13) {
        alertString =
          "You are in the DANGER zone! Please contact your health clinician immediately!";
        console.log(alertString);
      }
      Alert.alert(
        "Success",
        "Your Ultrafiltration input has been saved! \n\nYour Ultrafiltration Rate is: " +
          UFRate +
          "\n" +
          "\n" +
          alertString,
        [
          {
            text: "OK",
            onPress: () => console.log(alertString)
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
<<<<<<< Updated upstream
=======
  tabBarInfoContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
>>>>>>> Stashed changes
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4dd0e1",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleText: {
    //paddingHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
<<<<<<< Updated upstream
  slider: {
    marginTop: 15,
    marginBottom: 20,
=======
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
    fontSize: 22,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
>>>>>>> Stashed changes
  }
});
