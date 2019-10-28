import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  InteractionManager,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import {
  withNavigation,
  NavigationActions,
  StackActions,
  DashboardNavigator
} from "react-navigation";
import * as Firebase from "../components/Firebase";

import HowScreen from "../screens/HowScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import MotionSlider from "react-native-motion-slider";
import * as firebase from "firebase";
import "firebase/firestore";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  // When the app is loaded, connect to firebase and
  // get the user's data
  async componentDidMount() {
    var db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db.collection("users").doc(uid);

    await docRef.get().then(doc => {
      this.setState({ name: doc.data().displayName });
      this.setState({ email: doc.data().email });
    });
  }

  // Function to logout
  logout() {
    Firebase.logoutUser();
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.dispatch({
        type: "Navigation/NAVIGATE",
        routeName: "Auth",
        action: {
          type: "Navigation/NAVIGATE",
          routeName: "Login"
        }
      });
    });
  }

  // Redirect  to the how are you screen
  howareyou() {
    this.props.navigation.dispatch({
      type: "Navigation/NAVIGATE",
      routeName: "How",
      action: {
        type: "Navigation/NAVIGATE",
        routeName: "HowScreen"
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <View style={styles.profile}>
            <View style={styles.imgView}>
              {/* User image */}
              <Image
                style={styles.img}
                source={require("../assets/images/profile.png")}
              />
            </View>
            {/* user name and email */}
            <View style={styles.profileText}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.name}>{this.state.email}</Text>
            </View>
          </View>
        </View>
        <Button
          title="How are you?"
          onPress={() => {
            this.howareyou();
          }}
        />

          {/* Logout button */}
        <View style={styles.bottomButton}>
          <Button
            title="Logout"
            onPress={() => {
              this.logout();
            }}
            style={styles.logoutButton}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(DrawerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center"
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,

    borderBottomWidth: 1,
    borderBottomColor: "#777777"
  },
  profileText: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },
  name: {
    fontSize: 15,
    paddingBottom: 5,
    color: "white",
    textAlign: "center"
  },
  imgView: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    width: 200,
    marginBottom: 30,
    marginHorizontal: 10,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2 // Android
  },

  topLinks: {
    position: "absolute",
    top: 0,
    height: 136,
    width: 280,
    backgroundColor: "#4dd0e1"
  }
});
