import React from 'react';
import {View, Text, Button, TouchableOpacity, InteractionManager, AsyncStorage, StyleSheet} from 'react-native';
import {withNavigation, NavigationActions, StackActions} from 'react-navigation';
import * as Firebase from '../components/Firebase';

class DrawerScreen extends React.Component {

      logout = async () => {
                              try {
                                Firebase.logoutUser();
                                AsyncStorage.clear();
                                this.props.navigation.navigate("Auth");
                              } catch (e) {
                                console.log(e);
                              }
                            }
      
    render() {
        return (
            <View>
                <Text>Side Bar Info</Text>

                <Button
                    title = 'Logout'
                    onPress ={() => {
                        this.logout()
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
