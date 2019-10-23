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
  Dimensions
} from 'react-native';

import { ListItem, Button, Icon, Divider } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";

//stuff I (aliya) added
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { MonoText } from '../components/StyledText';

import * as Firebase from '../components/Firebase';

export default class HowScreen extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}> How are you feeling? </Text>
        </View>
        <View style={styles.emoji}>
          <TouchableOpacity>
            <Text style={styles.headline}>😃</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headline}>😐</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headline}>😓</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headline}>😖</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.welcome} onPress={() => this.props.navigation.navigate("Main")}>
          <Text style={{ textAlign: 'center', textAlignVertical: "center" }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#4dd0e1",
    paddingHorizontal: 20
  },
  emoji: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
  },
  headline: {
    margin: 2,
    fontSize: 80,
    textAlign: "center",
    width: Dimensions.get('window').width / 2 - 6,
    height: 200,
    backgroundColor: "#4dd0e1",
    textAlignVertical: "center"
  },
  titleText: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
  },
  welcome: {
    textAlign: 'center',
    alignContent: 'center',
  },
});
