/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage} from 'react-native';
import { Actions, Router, Reducer, Scene,Stack,Modal } from 'react-native-router-flux';
import Home from './Home';
import Login from './Login';

const scenes = () => (
  <Router>
  
    <Scene key="root">
      <Scene key="login" initial={true} component={Login} title="Login" hideNavBar/>
      <Scene key="home" component={Home} hideNavBar/>
      </Scene>
  
</Router>
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    console.disableYellowBox = true;
    return (
      <Router scenes={scenes}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
