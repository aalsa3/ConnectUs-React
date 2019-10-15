import React from 'react';
import {View, Text, Button, TouchableOpacity, InteractionManager, AsyncStorage, StyleSheet} from 'react-native';
import {withNavigation, NavigationActions, StackActions, DashboardNavigator} from 'react-navigation';
import * as Firebase from '../components/Firebase';

import HowScreen from '../screens/HowScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import MotionSlider from 'react-native-motion-slider'

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
                
    logout() {
      Firebase.logoutUser();
      InteractionManager.runAfterInteractions(() => {
        this.props.navigation.dispatch(
          {
              type: 'Navigation/NAVIGATE',
              routeName: 'Auth',
              action: {
                type: 'Navigation/NAVIGATE',
                routeName: 'Login',
              } 
          } );
      })
    }

    howareyou() {
      this.props.navigation.dispatch(
        {
          type: 'Navigation/NAVIGATE',
          routeName: 'Main',
          action: {
            type: 'Navigation/NAVIGATE',
            routeName: 'Home',
          }
        }
      );
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.topDrawer}>
              <Text>Side Bar Info</Text>
            </View>

                <Button
                    title='How are you?' 
                    onPress={() => {
                    this.howareyou();
                    }}/>

            <View style={styles.bottomButton}>
              <Button
                title="Logout"
                onPress={() => {
                  this.logout();
                  
                }}
                style={styles.logoutButton}
              />
            </View>
          </View>
        );
    }
}

export default withNavigation(DrawerScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    width: 200,
    marginBottom: 30,
    marginHorizontal: 10,
    
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
  }
});
