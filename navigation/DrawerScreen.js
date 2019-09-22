import React from 'react';
import {View, Text, Button, TouchableOpacity, InteractionManager, AsyncStorage, StyleSheet} from 'react-native';
import {withNavigation, NavigationActions, StackActions} from 'react-navigation';
import * as Firebase from '../components/Firebase';

import MotionSlider from 'react-native-motion-slider'

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
      // logout = async () => {
      //                         try {
      //                           console.log('fromDrawer')
      //                           Firebase.logoutUser();
      //                           AsyncStorage.clear();
      //                           this.props.navigation.navigate("Auth");
      //                         } catch (e) {
      //                           console.log(e);
      //                         }
      //                       }
                
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
                    title = 'Logout'
                    onPress ={() => {
                        this.logout(this.props.navigation)
                    }}
                    
                    style = {styles.logoutButton}/>
            </View>
        )
    }
}

export default withNavigation(DrawerScreen);


const styles = StyleSheet.create({
  logoutButton: {
    margin: 100,
    bottom: 0
    },
})
