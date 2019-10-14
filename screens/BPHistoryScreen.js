import * as WebBrowser from "expo-web-browser";
import React from "react";
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
  ActivityIndicator
} from "react-native";

import Moment from "moment";
import { MonoText } from "../components/StyledText";

import * as Firebase from "../components/Firebase";
import { withNavigation } from "react-navigation";

import { Button } from "react-native-elements";

import Icon from "react-native-vector-icons/Ionicons";
import { ExpoConfigView } from "@expo/samples";
import StarRating from "react-native-star-rating";

import * as firebase from "firebase";
import "firebase/firestore";

import Plotly from "react-native-plotly";
import lodash from "lodash";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

export default class BPHistoryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mySystolic: [],
      myDiastolic: [],
			myTimestamp: [],
			
			myProperDate: [],

      loaded: false,

      tableHead: ["Systolic", "Diastolic", "Date"],
      widthArr: [40, 40, 70],

      tableData: [
        ["62", "42", "02/03/2019"],
        ["64", "37", "03/03/2019"],
        ["51", "47", "04/03/2019"],
        ["52", "28", "04/03/2019"]
      ]
    };
  }

  async componentDidMount() {
    var db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("Bloodpressure");
    var self = this;

    var systolic = [];
    var diastolic = [];
    var timestamp = [];

    await docRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          //console.log(JSON.stringify(doc.id, " => ", doc.data()));
          systolic.push(Number(doc.data().systolic));
          diastolic.push(Number(doc.data().diastolic));
          timestamp.push(Number(doc.data().timestamp));
        });

        self.setState({ mySystolic: systolic });
        self.setState({ myDiastolic: diastolic });
        self.setState({ myTimestamp: timestamp });

        const oldDate = this.state.myTimestamp;
        let properDate = [];
        for (let i = 0; i < oldDate.length; i++) {
          var newDate = Moment(new Date(oldDate[i])).format("DD/MM");
          properDate.push(newDate);
        }
        this.setState({ myProperDate: properDate });

        let tableData = [[]];

        for (let i = 0; i < oldDate.length; i++) {
          tableData[i] = [
            this.state.mySystolic[i],
            this.state.myDiastolic[i],
            Moment(new Date(oldDate[i])).format("DD/MM/YY")
          ];
          console.log(tableData);
        }

        this.setState({ tableData });

        this.setState({ loaded: true });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  static navigationOptions = {
    title: "Health Overview"
  };

  render() {
    if (this.state.loaded == false) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      console.log("AAAHHHHH");
      console.log(this.state.myProperDate);
			console.log("BRO WHY: ", this.state.mySystolic.map(Number));
			
			const yAxisData = [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190]
			const xAxisData = [40, 50, 60, 70, 80, 90, 100]

			const data = { 
				x: this.state.myProperDate,
				y: this.state.mySystolic,
				type: 'scatter',
			};

			const data2 = {
				x: this.state.myProperDate,
				y: this.state.myDiastolic,
				type: 'scatter',
			}

			var layout = {
				title: 'Hmm',
				showlegend: false,
				yaxis: {range: [0, 190]}
			};

			const state = this.state;
			
			var data3 = [data, data2];
      return (
        <View style={styles.container}>
          <View style={styles.chartContainer}>
            <Text style={styles.headingText}>Ultrafiltration Rate: </Text>
						<Plotly
							data = { data3 }
							layout = {layout}
							debug
							enableFullPlotly = {true}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chartContainer: {
    flex: 1,
    marginBottom: 10
  },
  historyButtons: {
    flex: 1
  },
  headingText: {
    fontSize: 35,
    marginLeft: 15,
    marginVertical: 20
  },
  starsContainer: {
    flex: 1
  },
  button: {
    flex: 2,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "flex-start",
    alignItems: "center",

    marginBottom: 10,
    marginHorizontal: 10,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2 // Android
  },
  buttonText: {
    marginLeft: 30,
    flex: 1,
    fontSize: 20
  },
  leftIcon: {
    width: 36
  }
});
