import React from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, TouchableOpacity, InteractionManager, DrawerLayoutAndroid } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { ListItem, Button, Icon, Divider } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";

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
const list = []

export class LinksScreen extends React.Component {

  //delete a reminder
  deleteHandler = index => {
    list.splice(index,1);
  };

  render() {

    x = new Reminder(listofreminders[this.props.navigation.getParam('name', '1')], this.props.navigation.getParam('time', '...'))

    //get rid of default reminder
    if(x.remindersubtitle != "..."){
      list.push(x)
    }
    
    //order dates
    list.sort(function(a, b){return a-b});

    return (

      <ScrollView style={styles.container}>
        {
          list.map((reminderobject, index) => (
            <ListItem
              key={index}
              leftAvatar={<Icon name="access-alarm" type="material-icons" size={40} color="black" />}
              title={reminderobject.remindername}
              subtitle={reminderobject.remindersubtitle.toString()}
              rightIcon={<Button title="X" onPress={() => this.deleteHandler(index)}/>}
              bottomDivider
            />
          ))
        }
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

var test = "11";
var timechosen = " ";

export class AddReminderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    timechosen = date;
    console.log("A date has been picked: ", timechosen);
    
    this.hideDateTimePicker();
  };

  render() {
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
              test = value
              this.setState({ value: value })
            }
            }
          />
          <Text>Date and Time: {timechosen.toString()}</Text>
          <Button title="Select Date and Time:" onPress={this.showDateTimePicker} />
          <DateTimePicker
            mode='datetime'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
        <Divider style={{ height: 20, backgroundColor: 'white' }} />
        <Button title="Confirm" onPress={() => { this.props.navigation.navigate('Reminders', { name: test, time: timechosen}) }} />
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
