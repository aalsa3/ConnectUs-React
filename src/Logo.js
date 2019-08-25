import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { ExpoLinksView } from "@expo/samples";

export default class Logo extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Image
            style={styles.welcomeImage}
            source={require("../assets/images/logo.png")}
          />
          <Text style={styles.Titletext}>ConnectUs</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  Titletext: {
    color: "#4dd0e1",
    fontSize: 28,
    textAlign: "center",
    fontWeight: '500',
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  welcomeImage: {
    width: 90,
    height: 100,
  }
});