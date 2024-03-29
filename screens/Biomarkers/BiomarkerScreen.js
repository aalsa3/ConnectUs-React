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
  InteractionManager
} from "react-native";


import * as Firebase from "../../components/Firebase";
import { withNavigation } from "react-navigation";

import { Button } from "react-native-elements";

import Icon from "react-native-vector-icons/Ionicons";

//
// Biomarker input page
//
class BiomarkerScreen extends React.Component {
  static navigationOptions = {
    title: "Biomarker"
  };

  // Handle logout
  logout(navigation) {
    Firebase.logoutUser();

    InteractionManager.runAfterInteractions(() => {
      navigation.navigate("Login");
    });
  }

  render() {
    return (
      //Main container
      <View style={styles.container}>

        {/* Ultrafiltration button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Ultrafiltration")}
        >
          <View style={styles.leftIcon}>
            <Icon name="md-water" size={30} color="blue" />
          </View>

          <Text style={styles.buttonText}>Ultrafiltration</Text>

          <Icon iconStyle={styles.plusIcon} name="md-add" size={30} />
        </TouchableOpacity>

        {/* Bloodpressure Button  */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Bloodpressure")}
        >
          <View style={styles.leftIcon}>
            <Icon name="md-heart" size={30} color="red" />
          </View>

          <Text style={styles.buttonText}>Blood Pressure</Text>
          <Icon iconStyle={styles.plusIcon} name="md-add" size={30} />
        </TouchableOpacity>
        
        {/* Body Weight Button  */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Bodyweight")}
        >
          <View style={styles.leftIcon}>
            <Icon name="md-clipboard" size={30} color="green" />
          </View>

          <Text style={styles.buttonText}>Body Weight</Text>
          <Icon iconStyle={styles.plusIcon} name="md-add" size={30} />
        </TouchableOpacity>

        {/* Blood Sugar Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Bloodsugar")}
        >
          <View style={styles.leftIcon}>
            <Icon name="md-ice-cream" size={33} color="pink" />
          </View>

          <Text style={styles.buttonText}>Blood Sugar</Text>
          <Icon iconStyle={styles.plusIcon} name="md-add" size={30} />
        </TouchableOpacity>

        {/* Extra view for padding */}
        <View style={styles.extraView}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  extraView: {
    height: "25%"
  },
  container: {
    marginTop: 10,
    flex: 1
  },
  button: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "flex-start",
    alignItems: "center",

    marginBottom: 10,
    marginHorizontal: 10,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2 // Android
  },
  buttonText: {
    marginLeft: 30,
    flex: 1,
    fontSize: 20
  },
  leftIcon: {
    width: 36
  }
});

export default withNavigation(BiomarkerScreen);
