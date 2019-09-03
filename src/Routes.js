import React, { Component } from "react";

import { Router, Stack, Scene } from "react-native-router-flux";

import Login from "../screens/LoginScreen/";
import Signup from "../screens/SignupScreen/";

const App = (
  <Router>
    <Stack key="root" hideNavBar={true}>
      <Scene key="signup" component={Signup} title="Signup" hideNavBar={true} />
    </Stack>
  </Router>
);
