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
	ActivityIndicator,
	Alert
} from "react-native";

import Moment from "moment";
import * as Firebase from "../../components/Firebase";
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

    // set variables to the state
    this.state = {
      myBodyweight: [],
      myTimestamp: [],
      myProperDate: [],
      loaded: false,
      tableHead: ["Body Weight", "Date"],
      widthArr: [40, 40, 70],

      tableData: [
        ["62", "42", "02/03/2019"],
        ["64", "37", "03/03/2019"],
        ["51", "47", "04/03/2019"],
        ["52", "28", "04/03/2019"]
      ]
    };
  }

  // Load data from firbase
  async componentDidMount() {
    var db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("Bodyweight");
    var self = this;

    var bodyWeight = [];
    var timestamp = [];

    await docRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          bodyWeight.push(Number(doc.data().bodyweight));
          timestamp.push(Number(doc.data().timestamp));
        });

        self.setState({ myBodyweight: bodyWeight });
        self.setState({ myTimestamp: timestamp });

        const oldDate = this.state.myTimestamp;
        let properDate = [];
        for (let i = 0; i < oldDate.length; i++) {
          var newDate = Moment(new Date(oldDate[i])).format("YYYY-MM-DD hh:mm:ss");
          properDate.push(newDate);
        }
        this.setState({ myProperDate: properDate });

        let tableData = [[]];

        for (let i = 0; i < oldDate.length; i++) {
          tableData[i] = [
            this.state.myBodyweight[i],
            Moment(new Date(oldDate[i])).format("DD/MM/YY")
          ];
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
        // Loading screen
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {


			var maxWeight = Math.max(...this.state.myBodyweight) + 5
      var layout = {
        title: "Body Weight",
        titlefont: {
          size: 25
        },
        showlegend: false,
        yaxis: { title: "Weight (kg)", range: [-3, maxWeight] },
				xaxis: {
          title: "Input Date",
          type: "date",
          tickformat: "%d/%m/%y<br>%I:%M"
        },
        autosize: true,
        margin: {
          t: 40,
          l: 40,
          b: 50,
          r: 30
        },
        hovermode: "closest",
			};

      // Data labels for the plot
			const dataLabels = []
      for (let i = 0; i < this.state.myBodyweight.length; i++) {
        var text = "Body Weight: " + this.state.myBodyweight[i] +
          "<br>Date: " + this.state.myProperDate[i]

          dataLabels.push(text);
      }

			const data = [
				{
          y: this.state.myBodyweight,
          x: this.state.myProperDate,
          mode: "lines+markers",
          type: "scatter",
          textfont: {
            family: "Raleway, sans-serif"
          },
          text: dataLabels,
          hoverinfo: "text",
          marker: { size: 12 }
        }

			]
			
      const state = this.state;

      return (
        <View style={styles.container}>
          {/* Plotting view */}
          <View style={styles.chartContainer}>
            <View style={styles.plotlyContainer}>
              <Plotly
                data={data}
                layout={layout}
                debug
                enableFullPlotly={true}
                style={{ flex: 1 }}
                config={{ displayModeBar: false }}
              />
            </View>
          </View>

          {/* History Table */}
          <View style={styles.historyButtons}>
            <Text style={styles.headingText}>Input History</Text>
            <ScrollView style={{ flex: 1, marginBottom: 10 }}>
              <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows data={state.tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>
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
    flex: 1
    //justifyContent: "center",
    //alignItems: 'center'
  },
  plotlyContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5
  },
  historyButtons: {
    flex: 1,
    marginHorizontal: 20,
    textAlign: "center"
  },
  headingText: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "sans-serif",
    textAlign: "center"
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
