import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InteractionManager,
} from 'react-native';

import { MonoText } from '../components/StyledText';

import * as Firebase from '../components/Firebase';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  DevelopmentModeNotice() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this.handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
  
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled: your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode: your app will run at full speed.
        </Text>
      );
    }
  }
  
  logout(navigation) {
    Firebase.logoutUser();
  
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Auth');
    })
  }
  
  handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/workflow/development-mode/'
    );
  }
  
  handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
  }


  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <View Style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text> Ultrafiltration </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text> Blood Pressure </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text> Body Weight </Text>
          </TouchableOpacity>
        </View>

        <View Style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text> Blood Sugar </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style = {styles.button}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarInfoContainer: {
    
    position: 'absolute',
    
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#ffff',
    paddingVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});
