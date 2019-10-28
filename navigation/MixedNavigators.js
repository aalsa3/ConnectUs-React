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
import BiomarkerScreen from "../screens/Biomarkers/BiomarkerScreen";
import LinksScreen from "../screens/Reminders/LinksScreen";
import OverviewScreen from "../screens/Overview/OverviewScreen";
import UltrafiltrationScreen from "../screens/Biomarkers/UltrafiltrationScreen";
import BloodpressureScreen from "../screens/Biomarkers/BloodpressureScreen";
import BodyweightScreen from "../screens/Biomarkers/BodyweightScreen";
import BloodsugarScreen from "../screens/Biomarkers/BloodsugarScreen";
import UFHistoryScreen from "../screens/Overview/UFHistoryScreen";
import BPHistoryScreen from "../screens/Overview/BPHistoryScreen";
import BWHistoryScreen from "../screens/Overview/BWHistoryScreen";
import BSHistoryScreen from "../screens/Overview/BSHistoryScreen";
import DrawerScreen from './DrawerScreen';

import * as UFInput from "../screens/Biomarkers/UltrafiltrationScreen";
import * as BPInput from "../screens/Biomarkers/BloodpressureScreen";
import * as BWInput from "../screens/Biomarkers/BodyweightScreen";
import * as BSInput from "../screens/Biomarkers/BloodsugarScreen"


// Stack navigator for the biomarkers section
const Biomarkers = createStackNavigator({
    Biomarkers: {
        screen: BiomarkerScreen,
    },
    Ultrafiltration: UltrafiltrationScreen,
    Bloodpressure: BloodpressureScreen,
    Bodyweight: BodyweightScreen,
    Bloodsugar: BloodsugarScreen,
}, {
    headerMode: 'none'
})

// Navigation options so it is rendered properly
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
        screen: OverviewScreen,
    },
    UFHistory: UFHistoryScreen,
    BPHistory: BPHistoryScreen,
    BWHistory: BWHistoryScreen,
    BSHistory: BSHistoryScreen
}, {
    headerMode: 'none'
})

HealthOverview.navigationOptions = ({navigation}) => {
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


// Define the tab navigator which is seen at the top
// This is created for the stack navigator below
const TabNav = createMaterialTopTabNavigator(
  {
    TabBiomarkers: {
      screen: Biomarkers,
      navigationOptions: () => ({
        tabBarLabel: (
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{ color: "white", marginVertical: 10 }}
          >
            Biomarkers
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
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
        tabBarLabel: (
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{ color: "white", marginVertical: 10 }}
          >
            Reminders
          </Text>
        ),
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
        tabBarLabel: (
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{ color: "white", marginVertical: 10 }}
          >
            Health Overview
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-clipboard" : "md-clipboard"}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 16
      },
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "#4dd0e1"
      }
    }
  }
);

// Create a stack navigator which holds all our screens
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
                          style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
                          onPress={() => navigation.openDrawer()}
                          name="md-menu"
                          size={30}
                        />
                      ),
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
                        style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                      />
                    ),
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
                        style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                      />
                    ),
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
                          style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
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
                            onPress = {() => { UFInput.addUFInput().then(data =>
                              {
                                if (data) {
                                  navigation.dispatch({
                                    type: 'Navigation/NAVIGATE',
                                    routeName: 'Main',
                                    action: {
                                      type: 'Navigation/NAVIGATE',
                                      routeName: 'Biomarkers',
                                    }
                                  });
                                }
                              }
                              );
                            }
                          }
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
                          style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
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
                            onPress = {() => {BPInput.addBPInput();
                              navigation.dispatch({
                                type: 'Navigation/NAVIGATE',
                                routeName: 'Main',
                                action: {
                                  type: 'Navigation/NAVIGATE',
                                  routeName: 'Biomarkers',
                                }
                              });
                            }}
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
                          style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
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
                            onPress = {() => {BWInput.addBWInput();
                              navigation.dispatch({
                                type: 'Navigation/NAVIGATE',
                                routeName: 'Main',
                                action: {
                                  type: 'Navigation/NAVIGATE',
                                  routeName: 'Biomarkers',
                                }
                              });
                            }}
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
                          style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
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
                            onPress = {() => {BSInput.addBSInput();
                              navigation.dispatch({
                                type: 'Navigation/NAVIGATE',
                                routeName: 'Main',
                                action: {
                                  type: 'Navigation/NAVIGATE',
                                  routeName: 'Biomarkers',
                                }
                              });
                            }}
                          />
                        </MaterialHeaderButtons>
                      )
                    };
                    case ("UFHistory"):
                      return {
                        title: "Ultrafiltration History",
                        
                        headerForceInset: { top: "never", bottom: "never" },
                        headerTintColor: "white",
                        headerStyle: {
                          backgroundColor: "#4dd0e1",
                          elevation: 0, // remove shadow on Android
                          shadowOpacity: 0 // remove shadow on iOS
                        },
                        headerLeft: (
                          <Icon
                            style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
                            onPress={() => navigation.openDrawer()}
                            name="md-menu"
                            size={30}
                          />
                        ),
                      };
                      case ("BPHistory"):
                        return {
                          title: "Blood Pressure History",
                          
                          headerForceInset: { top: "never", bottom: "never" },
                          headerTintColor: "white",
                          headerStyle: {
                            backgroundColor: "#4dd0e1",
                            elevation: 0, // remove shadow on Android
                            shadowOpacity: 0 // remove shadow on iOS
                          },
                          headerLeft: (
                            <Icon
                              style={{ paddingLeft: 15, color: "white", paddingRight: 15}}
                              onPress={() => navigation.openDrawer()}
                              name="md-menu"
                              size={30}
                            />
                          ),
                        };
                        case ("BWHistory"):
                          return {
                            title: "Body Weight History",
                            
                            headerForceInset: { top: "never", bottom: "never" },
                            headerTintColor: "white",
                            headerStyle: {
                              backgroundColor: "#4dd0e1",
                              elevation: 0, // remove shadow on Android
                              shadowOpacity: 0 // remove shadow on iOS
                            },
                            headerLeft: (
                              <Icon
                                style={{ paddingLeft: 15, color: "white", paddingRight: 15}}
                                onPress={() => navigation.openDrawer()}
                                name="md-menu"
                                size={30}
                              />
                            ),
                          };
                          case ("BSHistory"):
                            return {
                              title: "Blood Sugar History",
                              
                              headerForceInset: { top: "never", bottom: "never" },
                              headerTintColor: "white",
                              headerStyle: {
                                backgroundColor: "#4dd0e1",
                                elevation: 0, // remove shadow on Android
                                shadowOpacity: 0 // remove shadow on iOS
                              },
                              headerLeft: (
                                <Icon
                                  style={{ paddingLeft: 15, color: "white", paddingRight: 15 }}
                                  onPress={() => navigation.openDrawer()}
                                  name="md-menu"
                                  size={30}
                                />
                              ),
                            };
                default:
                    return { title: (navigation.state.routes[navigation.state.index]["routes"])[(navigation.state.routes[navigation.state.index]["index"])].routeName }
            }
        }
    }
})

// Create a drawer navigator for the slide in drawer screen
export default createDrawerNavigator( {
    Tabs: {
        screen: StackTab,
    }
}, {
  contentComponent: props => <DrawerScreen {...props}/>
});
