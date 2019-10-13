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
  Dimensions,
} from 'react-native';

import { MonoText } from '../components/StyledText';

import * as Firebase from '../components/Firebase';
import { withNavigation } from 'react-navigation';

import { Button } from 'react-native-elements';

import Icon from "react-native-vector-icons/Ionicons";
import { ExpoConfigView } from '@expo/samples';
import StarRating from 'react-native-star-rating';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
           this.state = {
             tableHead: ["UF Before", "UF After", "Date"],
             widthArr: [40, 40, 70],
             tableData: [
               ["62", "42", "02/03/2019"],
               ["64", "37", "03/03/2019"],
               ["51", "47", "04/03/2019"],
               ["52", "28", "04/03/2019"]
             ]
           };
    }
  static navigationOptions = {
    title: 'Health Overview',
  }
  

  render() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }]
      }
    const state = this.state;

    

    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.headingText}>Ultrafiltration History: </Text>
          <LineChart
            data={data}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#8BC34A",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
          />
        </View>

        <View style={styles.historyButtons}>
          <Text style={styles.headingText}>Your Input History: </Text>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
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
    flex: 1,
  },
  headingText: {
    fontSize: 35,
    marginLeft: 15,
    marginBottom: 30,
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
