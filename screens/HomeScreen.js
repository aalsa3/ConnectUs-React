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
            <Text> Ultrafiltration </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Bloodpressure")}
          >
          <Text> Blood Pressure </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Bodyweight")}
          >
          <Text> Body Weight </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Bloodsugar")}
          >
          <Text> Blood Sugar </Text>
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
    paddingVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});


export default withNavigation(HomeScreen);
