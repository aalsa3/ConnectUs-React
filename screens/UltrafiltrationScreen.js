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

import { MonoText } from '../components/StyledText';
import Icon from "react-native-vector-icons/Ionicons";


import * as Firebase from '../components/Firebase';



export default class UltrafiltrationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          showModal: true,
          before: 60, after: 60}
    }
    getVal(val){
        console.log(val)
    }

    static navigationOptions = ({ navigation }) => {
		return {
            header: null,
        };
    }
  
  logout(navigation) {
    Firebase.logoutUser();
  
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Auth');
    })
  }

  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
          <Modal visible = {this.state.showModal}>
        <View style={styles.header}>
		  <Icon name="ios-menu" size={28} color="white"
		  onPress={() => this.setState({showModal:false})} />
          <Text style={styles.titleText}> Ultrafiltration </Text>
        </View>
        <Text>Before</Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100}
         value={this.state.before}
         onValueChange={val => this.setState({ before: val })}
         onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          {this.state.before}
        </Text> 

        <Text>After</Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100}
         value={this.state.after}
         onValueChange={val => this.setState({ after: val })}
         onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          {this.state.after}
        </Text>  
          </Modal>
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
	  fontSize: 24,
	  color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
