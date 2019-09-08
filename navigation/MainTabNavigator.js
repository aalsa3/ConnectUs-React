import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, InteractionManager, DrawerLayoutAndroid} from "react-native";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  DrawerNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UltrafiltrationScreen from "../screens/UltrafiltrationScreen";
import BloodpressureScreen from "../screens/BloodpressureScreen";
import BodyweightScreen from "../screens/BodyweightScreen";
import BloodsugarScreen from "../screens/BloodsugarScreen";


import * as Firebase from '../components/Firebase';

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
	Home: HomeScreen,
	Ultrafiltration: UltrafiltrationScreen,
	Bloodpressure: BloodpressureScreen,
	Bodyweight: BodyweightScreen,
	Bloodsugar: BloodsugarScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Biomarkers",
  tabBarIcon: ({focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-medkit${focused ? "" : "-outline"}`
          : "md-medkit"
	  }  
    />
  )
};

HomeStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Reminders",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-alarm" : "md-alarm"}
    />
  )
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Health Overview",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-clipboard" : "md-clipboard"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createMaterialTopTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
},
{
	navigationOptions: ({ navigation }) => {
		const { routeName } = navigation.state.routes[navigation.state.index];
		return {
		  headerTitle: 'ConnectUs',
		  
		};
	},

	tabBarOptions: {
		labelStyle: {
			fontSize: 16,
		},
		activeTintColor: 'white',
		inactiveTintColor: 'white',
		showIcon : true,
		style: {
			backgroundColor: '#4dd0e1'
		}
	},

});

tabNavigator.path = "";


const DashboardStackNavigator = createStackNavigator(
	{
	  DashboardTabNavigator: tabNavigator
	},
	{
	  defaultNavigationOptions: ({ navigation }) => {
		return {
		  headerLeft: (
			<Icon
			  style={{ paddingLeft: 10 }}
			  onPress={() => navigation.openDrawer()}
			  name="md-menu"
			  size={30}
			/>
		  ),
		  headerForceInset: {top: 'never', bottom: 'never' },
		  backgroundColor: '#4dd0e1'
		  
		  
		};
	  }
	}
  );

const AppDrawerNavigator = createDrawerNavigator({
	Dashboard: {
	  screen: DashboardStackNavigator
	}
  });

// const AppSwitchNavigator = createSwitchNavigator({
// 	Dashboard: { screen: AppDrawerNavigator }
//   });

const AppIndex = createAppContainer(AppDrawerNavigator);


export default class MainTabs extends React.Component {
	logout(navigation) {
		Firebase.logoutUser();
	  
		InteractionManager.runAfterInteractions(() => {
		  navigation.navigate('Auth');
		})
	  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* <StatusBar backgroundColor="red" barStyle="light-content" />
        <View style={styles.header}>
		  <Icon name="ios-menu" size={28} color="white"
		  onPress={() => this.props.navigation.navigate('DrawerOpen')} />
          <Text style={styles.titleText}> ConnectUs </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.logout(this.props.navigation);
          }}
        >
          <Text style={styles.tabBarInfoText}>Log Out</Text>
        </TouchableOpacity> */}
        <AppIndex />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.logout(this.props.navigation);
          }}
        >
          <Text style={styles.tabBarInfoText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#4dd0e1",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleText: {
	  paddingHorizontal: 20,
	  textAlign: 'left',
	  fontSize: 24,
	  color: 'white',
  }
});
