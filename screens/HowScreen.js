import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InteractionManager,
  Modal,
  Slider,
  Dimensions,
  AsyncStorage
} from 'react-native';

import { ListItem, Button, Icon, Divider } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";

//stuff I (aliya) added
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from "../components/Firebase";
import "firebase/firestore";


import * as Firebase from '../components/Firebase';

const STORAGE_KEY = 'feels'

export default class HowScreen extends React.Component {

  state = {
    data: []
  }

  handler = (status, time) => {
    var item = { type: status, when: time }
    this.setState(prevState => ({
      data: [...prevState.data, item]
    }))
  }

  getTimeandDate = () => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
  }

  async componentDidMount() {
    this.retrieveData()
  }

  //async methods 
  save = async data => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      //this.setState({ data })
      console.log("Saving: " + data.toString())
    } catch (e) {
      alert('Failed to save.')
    }
  }

  retrieveData = async () => {
    try {
      savedata = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      console.log("Retrieved: " + JSON.stringify(savedata))

      if (savedata !== null) {
        this.setState({ data: savedata })
      }
    } catch (e) {
      alert('Failed to load.')
    }
  }

  combined = (data) => {
    this.save(data)
    this.props.navigation.navigate("Main")
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key)
      this.setState({ data: [] })
    }
    catch (e) {
      alert('Failed to clear.')
    }
  }

  render() {

    const data = this.state.data

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.titleText}> How are you feeling? </Text>
          </View>
          <View style={styles.emoji}>
            <TouchableOpacity onPress={() => {
              this.handler("😃", this.getTimeandDate())
            }}>
              <Text style={styles.headline}>😃</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.handler("😐", this.getTimeandDate())
            }}>
              <Text style={styles.headline}>😐</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.handler("😓", this.getTimeandDate())
            }}>
              <Text style={styles.headline}>😓</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.handler("😖", this.getTimeandDate())
            }}>
              <Text style={styles.headline}>😖</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButton}>
            <Button title="Go to Home" onPress={() => this.combined(data)} />
            <Button title="Clear History" onPress={() => this.removeItemValue(STORAGE_KEY)} />
          </View>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>History</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.type}`}
              rightSubtitle={item.when}
            />
          )}
        />
      </ScrollView>
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
    fontSize: 40,
    textAlign: "center",
    width: Dimensions.get('window').width / 2 - 6,
    height: 100,
    backgroundColor: "#4dd0e1",
    textAlignVertical: "center"
  },
  titleText: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    height: '20%',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end'
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
    padding: 10,
    paddingHorizontal: 10
  }
});
