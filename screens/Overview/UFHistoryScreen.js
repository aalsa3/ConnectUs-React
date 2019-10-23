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

export default class UFHistoryScreen extends React.Component {
  constructor(props) {
    super(props);

    //Set variables to the state
    this.state = {
      myWeightBefore: [],
      myWeightAfter: [],
      myUFRate: [],
      myDuration: [],
      myTimestamp: [],

      myProperDate: [],
      loaded: false,
      tableHead: ["UF Before", "UF After", "UF Rate", "Duration", "Date"],
      widthArr: [40, 40, 70],

      tableData: [
        ["62", "42", "02/03/2019"],
        ["64", "37", "03/03/2019"],
        ["51", "47", "04/03/2019"],
        ["52", "28", "04/03/2019"]
      ]
    };
  }

  // Load the user data from firestore
  async componentDidMount() {
    var db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("Ultrafiltration");
    var self = this;

    var weightBefore = [];
    var weightAfter = [];
    var UFRate = [];
    var duration = [];
    var timestamp = [];
    var myProperDate = [];

    await docRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          weightBefore.push(Number(doc.data().before));
          weightAfter.push(Number(doc.data().after));
          UFRate.push(doc.data().UFRate);
          duration.push(Number(doc.data().duration));
          timestamp.push(Number(doc.data().timestamp));
        });

        self.setState({ myWeightBefore: weightBefore });
        self.setState({ myWeightAfter: weightAfter });
        self.setState({ myUFRate: UFRate });
        self.setState({ myDuration: duration });
        self.setState({ myTimestamp: timestamp });

        const oldDate = this.state.myTimestamp;
        let properDate = [];
        for (let i = 0; i < oldDate.length; i++) {
          var newDate = Moment(new Date(oldDate[i])).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          properDate.push(newDate);
        }
        this.setState({ myProperDate: properDate });

        let tableData = [[]];

        for (let i = 0; i < oldDate.length; i++) {
          tableData[i] = [
            this.state.myWeightBefore[i],
            this.state.myWeightAfter[i],
            this.state.myUFRate[i],
            this.state.myDuration[i],
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
      var firstDate = this.state.myProperDate[0];
      var lastDate = this.state.myProperDate[
        this.state.myProperDate.length - 1
      ];

      var maxRate = Math.max(...this.state.myUFRate) + 5;

      // Layout for plotly 
      var layout = {
        title: "Ultrafiltration Rate",
        uirevision:'true',
        titlefont: {
          size: 25
        },
        showlegend: false,
        yaxis: {
          title: "Rate (mL/kg/hr)",
          range: [-0.5, maxRate]
        },
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
          //good
          {
            type: "rect",
            xref: "paper",
            yref: "y",
            x0: "0",
            x1: "1",
            y0: "0",
            y1: "10",
            fillcolor: "#4caf50",
            opacity: 0.2,
            line: {
              width: 0
            }
          },
          //OK
          {
            type: "rect",
            xref: "paper",
            yref: "y",
            x0: "0",
            x1: "1",
            y0: "10",
            y1: "13",
            fillcolor: "#ff9800",
            opacity: 0.2,
            line: {
              width: 0
            }
          },
          //BAD
          {
            type: "rect",
            xref: "paper",
            yref: "y",
            x0: "0",
            x1: "1",
            y0: "13",
            y1: maxRate.toString(),
            fillcolor: "#ef5350",
            opacity: 0.2,
            line: {
              width: 0
            }
          }
        ]
      };

      // Data label formatting
      const dataLabels = []
      for (let i = 0; i < this.state.myUFRate.length; i++) {
        var text = "UF Rate: " + this.state.myUFRate[i] +
          "<br>Date: " + this.state.myProperDate[i]

          dataLabels.push(text);
      }


      const data = [
        {
          y: this.state.myUFRate,
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
      ];
      const state = this.state;

      return (
        <View style={styles.container}>
          <View style={styles.chartContainer}>
            {/* Plotly Chart Container */}
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
            <Text style={styles.headingText}>Input History: </Text>
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
    flex: 1,
  },

  historyButtons: {
    flex: 1,
    marginHorizontal: 20,
    textAlign: "center"
  },
  plotlyContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5
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
