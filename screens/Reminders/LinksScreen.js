import React from 'react';
import { AppState, AsyncStorage, Alert, FlatList, ScrollView, View, Text, StyleSheet, StatusBar, TouchableOpacity, InteractionManager, DrawerLayoutAndroid } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { List, ListItem, Button, Icon, Divider } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

//date time picker
import DateTimePicker from "react-native-modal-datetime-picker";

//stuff I (aliya) added
import { createStackNavigator, createAppContainer } from 'react-navigation';

export class Reminder {
  constructor(name, subtitle) {
    this.remindername = name;
    this.remindersubtitle = subtitle;
  }
}

const listofreminders = ["Blood Pressure", "Body Weight", "Blood Sugar", "Ultrafiltration", "Medication", "Observation"]

//key for async storage
const REMINDERKEY = 'reminder_key'

//list of reminders that will show onto the screen
export class LinksScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      value: " ",
      data: [],
      remindertype: 0,
    };

  }

  //get saved reminders
  async componentDidMount() {
    this.retrieveData()
  };

  retrieveData = async () => {
    try {
      savedata = JSON.parse(await AsyncStorage.getItem(REMINDERKEY));
      console.log("Retrieved: " + JSON.stringify(savedata))

      if (savedata !== null) {
        this.setState({ data: savedata })
      }
    } catch (e) {
      alert('Failed to load.')
    }
  }

  save = async data => {
    try {
      await AsyncStorage.setItem(REMINDERKEY, JSON.stringify(data))
      console.log("Saving: " + JSON.stringify(data))
    } catch (e) {
      console.log(e)
      alert('Failed to save.')
    }
  }

  //add a reminder
  handler = (time, reminder, newstate) => {
    item = new Reminder(listofreminders[reminder], time.toString())
    this.setState(prevState => ({
      data: [...prevState.data, item]
    }))
  }

  //delete a reminder
  removeReminder = (i) => {
    //remove reminder from state
    const newdata = this.state.data.filter(reminder => {
      return reminder !== i;
    })

    //update state
    this.setState({
      data: [...newdata]
    })

    //update async storage
    this.save(newdata)
  }

  render() {

    return (

      <ScrollView style={styles.container}>
        <Button title="Add Reminder" icon={<Icon name="add" type="material-icons" size={35} color="black" />} onPress={() => {
          this.props.navigation.navigate('AddReminder', { handler: this.handler })
        }} />
        <Divider style={{ height: 10, backgroundColor: 'white' }} />
        <Button title="Save Reminders" icon={<Icon name="save" type="material-icons" size={35} color="black" />} onPress={() => this.save(this.state.data)} />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.remindername}`}
              subtitle={item.remindersubtitle}
              rightElement={<Button title="X" onPress={() => this.removeReminder(item)} />}
            />
          )}
        />
      </ScrollView>
    );
  }
}

//selection of reminder types
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

  render() {

    const handler = this.props.navigation.getParam('handler', () => { });

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
            <Text>Date and Time:</Text>
            <Text>{this.state.timechosen.toString()}</Text>
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
        <Button title="Confirm" onPress={() => {
          //if no time is selected, tell them to select a time
          if (this.state.timechosen == " ") {
            Alert.alert(
              'Please select a date and time',
              ' ', // <- this part is optional, passing an empty string
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            );
            return;
          }
          handler(this.state.timechosen, this.state.remindertype)
          this.props.navigation.goBack()
        }} />
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
