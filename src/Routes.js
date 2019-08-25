import React, { Component } from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from "../screens/LoginScreen/";
import Signup from "../screens/SignupScreen/";

export default class Routes extends Component<{}> {
    render() {
        return(
            <Router >
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component = { Login } title="Login" initial = {true} hideNavBar={true} />
                    <Scene key="signup" component = { Signup } title="Signup" hideNavBar={true}/>
                </Stack>
            </Router>

        )
    }
}