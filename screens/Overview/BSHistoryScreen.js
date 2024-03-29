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

    // Store variables to the state
    this.state = {
      myGlucose: [],
      myTimestamp: [],
      myProperDate: [],
      loaded: false,
      tableHead: ["Blood Sugar", "Date"],
      widthArr: [40, 40, 70],

      tableData: [
        ["62", "42", "02/03/2019"],
        ["64", "37", "03/03/2019"],
        ["51", "47", "04/03/2019"],
        ["52", "28", "04/03/2019"]
      ]
    };
  }

  // load data from firebase and append to arrays for later use
  async componentDidMount() {
    var db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("Bloodsugar");
    var self = this;

    var glucose = [];
    var timestamp = [];

    await docRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          glucose.push(Number(doc.data().glucose));
          timestamp.push(Number(doc.data().timestamp));
        });

        self.setState({ myGlucose: glucose });
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
            this.state.myGlucose[i],
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
    // Loading bar
    if (this.state.loaded == false) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      var layout = {
        title: "Blood Sugar Levels",
        titlefont: {
          size: 25
        },
        showlegend: false,
        yaxis: { title: "Blood Sugar (mg/dL)", range: [-3, 345]},
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
				
				shapes: [

          // low bad
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "paper",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "0",
            y0: "0",
            x1: "1",
            y1: "65",
            fillcolor: "#ff5722",
            opacity: 0.2,
            line: {
              width: 0
            }
					},
					// good
					{
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "paper",
            // y-reference is assigned to the y-values
            yref: "y",
						x0: "0",
						x1: "1",
            y0: "65",
            y1: "100",
            fillcolor: "#4caf50",
            opacity: 0.2,
            line: {
              width: 0
            }
					},
					// elevated
					{
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "paper",
            // y-reference is assigned to the y-values
            yref: "y",
						x0: "0",
						x1: "1",
            y0: "100",
            y1: "118",
            fillcolor: "#ffc107",
            opacity: 0.2,
            line: {
              width: 0
            }
					},
					// elevated
					{
					type: "rect",
					// x-reference is assigned to the x-values
					xref: "paper",
					// y-reference is assigned to the y-values
					yref: "y",
					x0: "0",
					x1: "1",
					y0: "118",
					y1: "170",
					fillcolor: "#ff9800",
					opacity: 0.2,
					line: {
						width: 0
					}
				},
				// more elevated
				{
					type: "rect",
					// x-reference is assigned to the x-values
					xref: "paper",
					// y-reference is assigned to the y-values
					yref: "y",
					x0: "0",
					x1: "1",
					y0: "170",
					y1: "187",
					fillcolor: "#ef6c00",
					opacity: 0.2,
					line: {
						width: 0
					}
				},
				// seriuously elevated
				{
					type: "rect",
					// x-reference is assigned to the x-values
					xref: "paper",
					// y-reference is assigned to the y-values
					yref: "y",
					x0: "0",
					x1: "1",
					y0: "187",
					y1: 345,
					fillcolor: "#c62828",
					opacity: 0.2,
					line: {
						width: 0
					}
				}
			]};

      // Append strings to the data labels when user clicks a datapoint
			const dataLabels = []
      for (let i = 0; i < this.state.myGlucose.length; i++) {
        var text = "Blood Sugar: " + this.state.myGlucose[i] + "mg/dL"
          "<br>Date: " + this.state.myProperDate[i]

          dataLabels.push(text);
      }

			const data = [
				{
          y: this.state.myGlucose,
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
          <View style={styles.chartContainer}>
            {/* Chart */}
            <View pointerEvents="none" style={styles.plotlyContainer}>
              <Plotly
                data={data}
                layout={layout}
                debug
                enableFullPlotly={true}
                style={{ flex: 1 }}
                config={{ displayModeBar: false, scrollZoom: true }}
              />
            </View>
          </View>

          {/* History table */}
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
