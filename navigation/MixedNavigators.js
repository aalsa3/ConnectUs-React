import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, InteractionManager, DrawerLayoutAndroid, Button} from "react-native";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  DrawerNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  getActiveChildNavigationOptions
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import { HeaderButtons, HeaderButton}  from 'react-navigation-header-buttons';


import TabBarIcon from "../components/TabBarIcon";
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons';
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UltrafiltrationScreen from "../screens/UltrafiltrationScreen";
import BloodpressureScreen from "../screens/BloodpressureScreen";
import BodyweightScreen from "../screens/BodyweightScreen";
import BloodsugarScreen from "../screens/BloodsugarScreen";

import DrawerScreen from './DrawerScreen';

const Biomarkers = createStackNavigator({
    Biomarkers: {
        screen: HomeScreen,
    },
    Ultrafiltration: UltrafiltrationScreen,
    Bloodpressure: BloodpressureScreen,
    Bodyweight: BodyweightScreen,
    Bloodsugar: BloodsugarScreen
}, {
    headerMode: 'none'
})

Biomarkers.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  let gesturesEnabled = true;
  let  swipeEnabled = true;

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

const Reminders = createStackNavigator({
    Reminders: {
        screen: LinksScreen,
    }
}, {
    headerMode: 'none'
})

const HealthOverview = createStackNavigator({
    HealthOverview: {
        screen: SettingsScreen,
    }
}, {
    headerMode: 'none'
})

const TabNav = createMaterialTopTabNavigator({
    TabBiomarkers: {
        screen: Biomarkers,
        navigationOptions: () => ({
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
        })
    },
    TabReminders: {
        screen: Reminders,
        navigationOptions: () => ({
            tabBarLabel: "Reminders",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? "ios-alarm" : "md-alarm"}
              />
            )
        })
    },
    TabHealthOverview: {
        screen: HealthOverview,
        navigationOptions: () => ({
            tabBarLabel: "Health Overview",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? "ios-clipboard" : "md-clipboard"}
              />
            )
        })
    }
}, {
    tabBarOptions: {
        showIcon: true,
        labelStyle: {
			fontSize: 16,
		},
		activeTintColor: 'white',
		inactiveTintColor: 'white',
		style: {
			backgroundColor: '#4dd0e1'
		}
    }
});

const StackTab = createStackNavigator({
    Tabs: {
        screen: TabNav,
        navigationOptions: ({navigation}) => {
            switch ((navigation.state.routes[navigation.state.index]["routes"])[(navigation.state.routes[navigation.state.index]["index"])].routeName) {
                case ("Biomarkers"):
                    return {
                      title: "ConnectUs",
                      headerForceInset: { top: "never", bottom: "never" },
                      headerTintColor: "white",
                      headerStyle: {
                        backgroundColor: "#4dd0e1",
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0 // remove shadow on iOS
                      },
                      headerLeft: (
                        <Icon
                          style={{ paddingLeft: 15, color: "white" }}
                          onPress={() => navigation.openDrawer()}
                          name="md-menu"
                          size={30}
                        />
                      ),
                      headerRight: (
                        <MaterialHeaderButtons>
                          <Item
                            title = "search"
                            iconName = "search"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                          <Item
                            title = "more-vert"
                            iconName = "more-vert"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                        </MaterialHeaderButtons>
                      )
                    };
                case ("Reminders"):
                  return {
                    title: "ConnectUs",
                    headerForceInset: { top: "never", bottom: "never" },
                    headerTintColor: "white",
                    headerStyle: {
                      backgroundColor: "#4dd0e1",
                      elevation: 0, // remove shadow on Android
                      shadowOpacity: 0 // remove shadow on iOS
                    },
                    headerLeft: (
                      <Icon
                        style={{ paddingLeft: 15, color: "white" }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                      />
                    ),
                    headerRight: (
                      <MaterialHeaderButtons>
                        <Item
                          title = "search"
                          iconName = "search"
                          style={{ paddingRight: 15, color: "white" }}
                          size={30}
                        />
                        <Item
                          title = "more-vert"
                          iconName = "more-vert"
                          style={{ paddingRight: 15, color: "white" }}
                          size={30}
                        />
                      </MaterialHeaderButtons>
                    )
                  };
                case ("HealthOverview"):
                  return {
                    title: "ConnectUs",
                    headerForceInset: { top: "never", bottom: "never" },
                    headerTintColor: "white",
                    headerStyle: {
                      backgroundColor: "#4dd0e1",
                      elevation: 0, // remove shadow on Android
                      shadowOpacity: 0 // remove shadow on iOS
                    },
                    headerLeft: (
                      <Icon
                        style={{ paddingLeft: 15, color: "white" }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                      />
                    ),
                    headerRight: (
                      <MaterialHeaderButtons>
                        <Item
                          title = "search"
                          iconName = "search"
                          style={{ paddingRight: 15, color: "white" }}
                          size={30}
                        />
                        <Item
                          title = "more-vert"
                          iconName = "more-vert"
                          style={{ paddingRight: 15, color: "white" }}
                          size={30}
                        />
                      </MaterialHeaderButtons>
                    )
                  };
                  case ("Ultrafiltration"):
                    return {
                      title: "Ultrafiltration",
                      
                      headerForceInset: { top: "never", bottom: "never" },
                      headerTintColor: "white",
                      headerStyle: {
                        backgroundColor: "#4dd0e1",
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0 // remove shadow on iOS
                      },
                      headerLeft: (
                        <Icon
                          style={{ paddingLeft: 15, color: "white" }}
                          onPress={() => navigation.openDrawer()}
                          name="md-menu"
                          size={30}
                        />
                      ),
                      headerRight: (
                        <MaterialHeaderButtons>
                          <Item
                            title = "done"
                            iconName = "done"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                          <Item
                            title = "more-vert"
                            iconName = "more-vert"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                        </MaterialHeaderButtons>
                      )
                    };    
                  case ("Bloodpressure"):
                    return {
                      title: "Blood Pressure",
                      headerForceInset: { top: "never", bottom: "never" },
                      headerTintColor: "white",
                      headerStyle: {
                        backgroundColor: "#4dd0e1",
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0 // remove shadow on iOS
                      },
                      headerLeft: (
                        <Icon
                          style={{ paddingLeft: 15, color: "white" }}
                          onPress={() => navigation.openDrawer()}
                          name="md-menu"
                          size={30}
                        />
                      ),
                      headerRight: (
                        <MaterialHeaderButtons>
                          <Item
                            title = "done"
                            iconName = "done"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                          <Item
                            title = "more-vert"
                            iconName = "more-vert"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                        </MaterialHeaderButtons>
                      )
                    };
                  case ("Bodyweight"):
                    return {
                      title: "Body Weight",
                      headerForceInset: { top: "never", bottom: "never" },
                      headerTintColor: "white",
                      headerStyle: {
                        backgroundColor: "#4dd0e1",
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0 // remove shadow on iOS
                      },
                      headerLeft: (
                        <Icon
                          style={{ paddingLeft: 15, color: "white" }}
                          onPress={() => navigation.openDrawer()}
                          name="md-menu"
                          size={30}
                        />
                      ),
                      headerRight: (
                        <MaterialHeaderButtons>
                          <Item
                            title = "done"
                            iconName = "done"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                          <Item
                            title = "more-vert"
                            iconName = "more-vert"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                        </MaterialHeaderButtons>
                      )
                    };
                  case ("Bloodsugar"):
                    return {
                      title: "Blood Sugar",
                      headerForceInset: { top: "never", bottom: "never" },
                      headerTintColor: "white",
                      headerStyle: {
                        backgroundColor: "#4dd0e1",
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0 // remove shadow on iOS
                      },
                      headerLeft: (
                        <Icon
                          style={{ paddingLeft: 15, color: "white" }}
                          onPress={() => navigation.openDrawer()}
                          name="md-menu"
                          size={30}
                        />
                      ),
                      headerRight: (
                        <MaterialHeaderButtons>
                          <Item
                            title = "done"
                            iconName = "done"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                          <Item
                            title = "more-vert"
                            iconName = "more-vert"
                            style={{ paddingRight: 15, color: "white" }}
                            size={30}
                          />
                        </MaterialHeaderButtons>
                      )
                    };   
                default:
                    return { title: (navigation.state.routes[navigation.state.index]["routes"])[(navigation.state.routes[navigation.state.index]["index"])].routeName }
            }
        }
    }
})

const Drawer = createDrawerNavigator( {
    Tabs: {
        screen: StackTab,
    }
}, {
  contentComponent: props => <DrawerScreen {...props}/>
});

const AppContainer = createAppContainer(Drawer);

export default class AppIndex extends React.Component {
    render() {
        return(
            <AppContainer />
        )
    }
}