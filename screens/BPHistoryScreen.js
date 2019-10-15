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

      var layout = {
        title: "Blood Pressure Spectrum",
        titlefont: {
          size: 25
        },
        showlegend: false,
        yaxis: { title: "Systolic (top number)", range: [70, 190] },
        xaxis: { title: "Diastolic (bottom number)", range: [40, 100] },
        autosize: true,
        margin: {
          t: 40,
          l: 40,
          b: 30,
          r: 30
        },
        hovermode: "closest",

        shapes: [
          // low
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "40",
            y0: "70",
            x1: "60",
            y1: "90",
            fillcolor: "#9c27b0",
            opacity: 0.2,
            line: {
              width: 0
            }
          },

          // ideal
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "60",
            y0: "0",
            x1: "80",
            y1: "120",
            fillcolor: "#4caf50",
            opacity: 0.2,
            line: {
              width: 0
            }
          },
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "40",
            y0: "90",
            x1: "60",
            y1: "120",
            fillcolor: "#4caf50",
            opacity: 0.2,
            line: {
              width: 0
            }
          },

          // pre-high
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "80",
            y0: "0",
            x1: "90",
            y1: "140",
            fillcolor: "#ff9800",
            opacity: 0.2,
            line: {
              width: 0
            }
          },
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "40",
            y0: "120",
            x1: "80",
            y1: "140",
            fillcolor: "#ff9800",
            opacity: 0.2,
            line: {
              width: 0
            }
          },

          // HIGH
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "90",
            y0: "0",
            x1: "100",
            y1: "190",
            fillcolor: "#ef5350",
            opacity: 0.2,
            line: {
              width: 0
            }
          },
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the y-values
            yref: "y",
            x0: "40",
            y0: "140",
            x1: "90",
            y1: "190",
            fillcolor: "#ef5350",
            opacity: 0.2,
            line: {
              width: 0
            }
          }
        ]
      };

      const state = this.state;

      var plottingData = [];

      for (let i = 0; i < this.state.myDiastolic.length; i++) {
        var data = {
          x: [this.state.myDiastolic[i]],
          y: [this.state.mySystolic[i]],
          mode: "markers",
          type: "scatter",
          text: [
            "Systolic: " +
              this.state.myDiastolic[i] +
              "<br>Diastolic: " +
              this.state.mySystolic[i] +
              "<br>Date: " +
              this.state.tableData[i][2]
          ],

          textfont: {
            family: "Raleway, sans-serif"
          },
          hoverinfo: "text",
          marker: { size: 12 }
        };

        plottingData.push(data);
      }

      return (
        <View style={styles.container}>
          <View style={styles.chartContainer}>
            <View style={styles.plotlyContainer}>
              <Plotly
                data={plottingData}
                layout={layout}
                debug
                enableFullPlotly={true}
                style={{ flex: 1 }}
                config={{ displayModeBar: false }}
              />
            </View>
          </View>

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
