import React from 'react';
import { FlatList, ScrollView, View, Text, StyleSheet, StatusBar, TouchableOpacity, InteractionManager, DrawerLayoutAndroid } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { List, ListItem, Button, Icon, Divider } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

//date time picker
//old
import DateTimePicker from "react-native-modal-datetime-picker";
//new
//import DateTimePicker from '@react-native-community/datetimepicker';

//stuff I (aliya) added
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Reminder {
  constructor(name, subtitle) {
    this.remindername = name;
    this.remindersubtitle = subtitle;
  }
}

const listofreminders = ["Blood Pressure", "Body Weight", "Blood Sugar", "Ultrafiltration", "Medication", "Observation"]

//list of reminders that will show onto the screen
class FlatListTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };

  }

  render() {

    x = new Reminder(listofreminders[this.props.navigation.getParam('name', '1')], this.props.navigation.getParam('time', '...'))

    //get rid of default reminder
    if (x.remindersubtitle != "...") {
      this.state.data.push(x)
    }

    return (
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.remindername}`}
              subtitle={item.remindersubtitle}
            />
          )}
        />
      </List>
    );
  }
}

//export default FlatListTest;
//const list = []

export class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  //delete a reminder
  // deleteHandler = index => {
  //   list.splice(index, 1);
  // };

  render() {

    // x = new Reminder(listofreminders[this.props.navigation.getParam('name', '1')], this.props.navigation.getParam('time', '...'))

    // //get rid of default reminder
    // if (x.remindersubtitle != "...") {
    //   list.push(x)
    // }

    //order dates
    //list.sort(function (a, b) { return a - b });

    return (

      <ScrollView style={styles.container}>
        {
          // list.map((reminderobject, index) => (
          //   <ListItem
          //     key={index}
          //     leftAvatar={<Icon name="access-alarm" type="material-icons" size={40} color="black" />}
          //     title={reminderobject.remindername}
          //     subtitle={reminderobject.remindersubtitle.toString()}
          //     rightIcon={<Button title="X" onPress={() => this.deleteHandler(index)} />}
          //     bottomDivider
          //   />
          // ))
        }
        {/* <FlatListTest/> */}
        {/*add button*/}
        {/*<Button icon={<Icon name="add" type="material-icons" size={35} color="black" />} onPress={ () => {alert('You tapped the button!')}}/>*/}
        <Button title="Add Reminder" icon={<Icon name="add" type="material-icons" size={35} color="black" />} onPress={() => { this.props.navigation.navigate('AddReminder') }} />
      </ScrollView>

    );
  }
}

//selection
var radio_props = [
  { label: 'Blood Pressure', value: 0 },
  { label: 'Body Weight', value: 1 },
  { label: 'Blood Sugar', value: 2 },
  { label: 'Ultrafiltration', value: 3 },
  { label: 'Medication', value: 4 },
  { label: 'Observation', value: 5 }
];


export class AddReminderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };



  // state = {
  //   date: new Date('2020-06-12T14:42:42'),
  //   mode: 'date',
  //   show: false,
  // }

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      timechosen: " ",
      remindertype: 0
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.state.timechosen = date;
    this.hideDateTimePicker();
  };

  // setDate = (event, date) => {
  //   date = date || this.state.date;

  //   console.log("Date has definitely been chosen: ", date);

  //   this.setState({
  //     show: Platform.OS === 'ios' ? true : false,
  //     date,
  //   });
  // }

  // show = mode => {
  //   this.setState({
  //     show: true,
  //     mode,
  //   });
  // }

  // datepicker = () => {
  //   this.show('date');
  // }

  // timepicker = () => {
  //   this.show('time');
  // }

  render() {

    //const { show, date, mode } = this.state;

    return (
      <ScrollView>
        <View style={styles.header}>
        </View>
        <Divider style={{ height: 20, backgroundColor: 'white' }} />
        <Text> Reminder Type: </Text>
        <View>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => {
              this.state.remindertype = value
              this.setState({ value: value })
            }
            }
          />
          <View>
            <Text>Date and Time: {this.state.timechosen.toString()}</Text>
            <Button onPress={this.showDateTimePicker} title="Select Date and Time" />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode="datetime"
            />
          </View>
        </View>

        <Divider style={{ height: 20, backgroundColor: 'white' }} />
        <Button title="Confirm" onPress={() => { this.props.navigation.navigate('Reminders', { name: this.state.remindertype, time: this.state.timechosen }) }} />
      </ScrollView>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Reminders: LinksScreen,
    AddReminder: AddReminderScreen,
  }
)

AppNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let gesturesEnabled = true;
  let swipeEnabled = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
    gesturesEnabled = false;
    swipeEnabled = false;
  }

  return {
    tabBarVisible,
    gesturesEnabled,
    swipeEnabled
  };
};

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
