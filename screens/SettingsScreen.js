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
import { ExpoConfigView } from '@expo/samples';
import StarRating from 'react-native-star-rating';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Health Overview',
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.headingText}>Your Predicted Health: </Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={3.5}
            fullStarColor="orange"
            containerStyle={styles.starsContainer}
          />
        </View>

        <View style={styles.historyButtons}>
          <Text style={styles.headingText}>Your Input History: </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("UFHistory")}
          >
            <View style={styles.leftIcon}>
              <Icon name="md-water" size={30} color="blue" />
            </View>

            <Text style={styles.buttonText}>Ultrafiltration</Text>

            <Icon iconStyle={styles.plusIcon} name="md-add" size={30} />
          </TouchableOpacity>

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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer:{
    flex: 1,
  },
  historyButtons: {
    flex: 3,
  },
  headingText: {
    fontSize: 35,
    flex: 1,
    marginLeft: 15,
  },
  starsContainer: {
    flex: 1
  },
  button: {
    flex: 2,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginBottom: 10,
    marginHorizontal: 10,

    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  buttonText: {
    marginLeft: 30,
    flex: 1,
    fontSize: 20,
  },
  leftIcon: {
    width: 36
  }
})
