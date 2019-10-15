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
  Slider
} from 'react-native';

import { ListItem, Button, Icon, Divider } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";

//stuff I (aliya) added
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { MonoText } from '../components/StyledText';

import * as Firebase from '../components/Firebase';

export default class HowScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          before: 60, after: 60}
    }

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={styles.header}>
          <Text style={styles.titleText}> How are you feeling? </Text>
        </View>
        <Button title=':)'/>
        <Button title=':|'/>
        <Button title=':('/>
        <Text style={styles.welcome}>
          {this.state.before}
        </Text> 
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
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#4dd0e1",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleText: {
	  paddingHorizontal: 20,
	  textAlign: 'left',
	  fontSize: 15,
	  color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
