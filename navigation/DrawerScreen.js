import React from 'react';
import {View, Text, Button, TouchableOpacity, InteractionManager, AsyncStorage, StyleSheet} from 'react-native';
import {withNavigation, NavigationActions, StackActions, DashboardNavigator} from 'react-navigation';
import * as Firebase from '../components/Firebase';

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
                
    logout() {
      Firebase.logoutUser();
      InteractionManager.runAfterInteractions(() => {
        console.log("log me out")
        this.props.navigation.dispatch(
          {
              type: 'Navigation/NAVIGATE',
              routeName: 'Auth',
              action: {
                type: 'Navigation/NAVIGATE',
                routeName: 'Login',
              }
          });
      })
    }
      
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.topDrawer}>
              <Text>Side Bar Info</Text>
            </View>

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
