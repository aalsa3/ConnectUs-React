import React from 'react';
import {View, Text, Button, TouchableOpacity, InteractionManager, AsyncStorage, StyleSheet} from 'react-native';
import {withNavigation, NavigationActions, StackActions} from 'react-navigation';
import * as Firebase from '../components/Firebase';

import HowScreen from '../screens/HowScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import MotionSlider from 'react-native-motion-slider'

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }

    logout(navigation) {
      console.log('logout called', navigation)
      Firebase.logoutUser();

      InteractionManager.runAfterInteractions(() => {
        navigation.navigate('Auth');
      })
    }
      
    render() {
        return (
            <View>
                <Text>Side Bar Info</Text>

                <Button
                    title='How are you?' 
                    onPress={() => {
                    this.props.navigation.navigate('Howareyou');
                    }}/>

                <Button
                    title = 'Logout'
                    onPress ={() => {
                        this.logout(this.props.navigation)
                    }}
                    
                    style = {styles.logoutButton}/>
            </View>
        )
    }
}

class HowAreYou extends React.Component {
  static navigationOptions = {
    title: 'Howareyou'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.paragraph}
          onPress={() => {
            this.props.navigation.navigate('Howareyou');
          }}>
          Go back home
        </Text>
      </View>
    );
  }
}

// const navigator = createDrawerNavigator(
//   {
//     HowAreYou: HowScreen
//   });

  //export default createAppContainer(navigator);
  export default withNavigation(DrawerScreen);


const styles = StyleSheet.create({
  logoutButton: {
    margin: 100,
    bottom: 0
    },
})
