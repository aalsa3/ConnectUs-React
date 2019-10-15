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
  ActivityIndicator
} from 'react-native';

import {withNavigation} from 'react-navigation'

import { MonoText } from '../components/StyledText';

import * as Firebase from '../components/Firebase';

import { Button } from 'react-native-elements';

import Icon from "react-native-vector-icons/Ionicons";
import { ExpoConfigView } from '@expo/samples';
import StarRating from 'react-native-star-rating';

import * as firebase from "firebase";
import "firebase/firestore";

export class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      systolic: [],
      diastolic: [],
      UFRate: [],
      glucose: [],

      healthRating: 0,
      UFRating: 0,
      BPRating: 0,
      BSRating: 0,
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getData();
      console.log("mounted")
    })

  };

  componentWillUnmount() {
    this.setState({loaded:false})
    this.focusListener.remove();
  }
  

  getData = async () => {
    try {
      var systolic = []
      var diastolic = []
      var UFRate = []
      var glucose = []
      var db = firebase.firestore();
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const docRef = db.collection("users").doc(uid)
  
      await docRef.collection("Bloodpressure").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          systolic.push(Number(doc.data().systolic));
          diastolic.push(Number(doc.data().diastolic));
        });
        this.setState({ systolic })
        this.setState({ diastolic })
      });
  
      await docRef.collection("Ultrafiltration").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          UFRate.push(Number(doc.data().UFRate));
        });
        this.setState({ UFRate })
      });
  
      await docRef.collection("Bloodsugar").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          glucose.push(Number(doc.data().glucose));
        });
        this.setState({ glucose })
        this.setState({loaded: true})
      });
    } 
    catch(error) {
      console.log(("Error retrieving data " + error))
    }
  }

  static navigationOptions = {
    title: 'Health Overview',
  }
  

  render() {
    if (this.state.loaded == false) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else {

      var {systolic, diastolic, UFRate, glucose, healthRating, UFRating, BPRating, BSRating} = this.state;

      if (systolic.length) {
        let sumSystolic = systolic.reduce((previous, current) => current += previous);
        let avgSystolic = sumSystolic /  systolic.length;

        let sumDiastolic = diastolic.reduce((previous, current) => current += previous);
        let avgDiastolic = sumDiastolic / diastolic.length;

        if ( (avgSystolic < 120) && (avgDiastolic < 80) ) {
          BPRating = 5;
        }
        else if ( (120 <= avgSystolic && avgSystolic <= 129) && (avgDiastolic < 80) ) {
          BPRating = 4;
        }
        else if ( (130 <= avgSystolic  && avgSystolic <= 139) || (80 <= avgDiastolic && avgDiastolic <= 89)) {
          BPRating = 3;
        }
        else if ( (140 <= avgSystolic && avgSystolic <= 180) || (90 <= avgDiastolic && avgDiastolic <= 120)) {
          BPRating = 2;
        }
        else if ( (180 < avgSystolic) || (120 < avgDiastolic)) {
          BPRating = 1;
        }
      }

      if (UFRate.length) {
        let sumUFRate = UFRate.reduce((previous, current) => current += previous);
        let avgUFRate = sumUFRate /  UFRate.length;
        if ( 0 <= avgUFRate && avgUFRate <= 10) {
          console.log("first")
          UFRating = 5;
        }
        else if (10 < avgUFRate && avgUFRate < 13) {
          UFRating = 4;
        }
        else if (13 <= avgUFRate && avgUFRate < 20) {
          UFRating = 3;
        }
        else if (20 <= avgUFRate && avgUFRate < 30) {
          UFRating = 2;
        }
        else if (30 <= avgUFRate && avgUFRate < 40) {
          UFRating = 1;
        }
        else {
          UFRating = 0;
        }
      }

      if (glucose.length) {
        let sumGlucose = glucose.reduce((previous, current) => current += previous);
        let avgGlucose = sumGlucose /  glucose.length;

        if ( 0 <= avgGlucose && avgGlucose <= 65) {
          BSRating = 1;
        }
        else if (65 < avgGlucose && avgGlucose < 100) {
          BSRating = 5;
        }
        else if (100 <= avgGlucose && avgGlucose < 118) {
          BSRating = 4;
        }
        else if (118 <= avgGlucose && avgGlucose < 170) {
          BSRating = 3;
        }
        else if (170 <= avgGlucose && avgGlucose < 187) {
          BSRating = 2;
        }
        else if (187 <= avgGlucose && avgGlucose < 275) {
          BSRating = 1;
        }
        else {
          BSRating = 0;
        }

        console.log("glucose is: ",avgGlucose)
      }


      return (
        <View style={styles.container}>
          <View style={styles.chartContainer}>
            <Text style={styles.headingText}>Wellbeing Rating</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={3.5}
              fullStarColor="orange"
              containerStyle={styles.starsContainer}
            />
          </View>

          <View style={styles.historyButtons}>
            <Text style={styles.headingText}>Input History</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("UFHistory")}
            >
              <View style = {{flex:1, flexDirection: 'row'}}>
              <View style={styles.leftIcon}>
                <Icon name="md-water" size={30} color="blue" />
              </View>

              <Text style={styles.buttonText}>Ultrafiltration</Text>
              </View>
              <StarRating
              disabled={true}
              maxStars={5}
              rating={UFRating}
              fullStarColor="orange"
              containerStyle={{flex: 1}}
            />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("BPHistory")}
            >
              <View style = {{flex: 1, flexDirection: 'row'}}>
                <View style={styles.leftIcon}>
                  <Icon name="md-heart" size={30} color="red" />
                </View>

                <Text style={styles.buttonText}>Blood Pressure</Text>
              </View>
              
              <StarRating
              disabled={true}
              maxStars={5}
              rating={BPRating}
              fullStarColor="orange"
              containerStyle={{flex: 1}}
            />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("BWHistory")}
            >
              <View style={styles.leftIcon}>
                <Icon name="md-clipboard" size={30} color="green" />
              </View>

              <Text style={styles.buttonText}>Body Weight</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("BSHistory")}
            >
              <View style = {{flex: 1, flexDirection: 'row'}}>
              <View style={styles.leftIcon}>
                <Icon name="md-ice-cream" size={33} color="pink" />
              </View>

              <Text style={styles.buttonText}>Blood Sugar</Text>
              </View>

              <StarRating
              disabled={true}
              maxStars={5}
              rating={BSRating}
              fullStarColor="orange"
              containerStyle={{flex: 1}}
            />

            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }
}

export default withNavigation(SettingsScreen);

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
    textAlign: 'center'
  },
  starsContainer: {
    flex: 1,
    marginHorizontal: 10,

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
    flex: 8,
    fontSize: 20,
    textAlign: 'center'

  },
  leftIcon: {
    flex: 2,
    width: 36,
    alignItems: 'center',
  }
})
