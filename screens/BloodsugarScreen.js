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



export default class BloodsugarScreen extends React.Component {
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
        <View style={styles.header}>
          <Text style={styles.titleText}> Note: Record every x hours. Store other key info. </Text>
        </View>
        <Text>Blood Sugar</Text>
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
