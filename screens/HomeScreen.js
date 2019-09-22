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
} from 'react-native';

import { MonoText } from '../components/StyledText';

import * as Firebase from '../components/Firebase';
import { withNavigation } from 'react-navigation';

import { Button } from 'react-native-elements';

import Icon from "react-native-vector-icons/Ionicons";



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  
  logout(navigation) {
    Firebase.logoutUser();
  
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Login');
    })
  }

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Ultrafiltration")}
          >
            <Icon name="md-water" size={30} color="blue" />
            <Text style={styles.buttonText}> Ultrafiltration </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Bloodpressure")}
          >
            <Icon name="md-heart" size={30} color="red" />
            <Text style={styles.buttonText}> Blood Pressure </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Bodyweight")}
          >
            <Icon name="md-clipboard" size={30} color="green" />
            <Text style={styles.buttonText}>Body Weight </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Bloodsugar")}
          >
            <Icon name="md-ice-cream" size={30} color="pink" />
            <Text style={styles.buttonText}> Blood Sugar </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarInfoContainer: {
    
    position: 'absolute',
    
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#ffff',
    paddingVertical: 5,
  },
  button: {
    paddingLeft: 8,
    width: 400,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    marginVertical: 10,

  },
  buttonText: {
    marginLeft: 20,
    flex: 1,
  }
});


export default withNavigation(HomeScreen);
