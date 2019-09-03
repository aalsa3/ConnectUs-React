import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import {createAppContainer} from 'react-navigation';

import AppNavigator from '../navigation/AppNavigator';

export default class Index extends Component {
    render() {
        return(
            <View style = {{ flex : 1}}>
                <Text>TESTING TESTING</Text>
                <AppNavigator />
            </View>
        )
    }
}