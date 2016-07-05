/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './components/app.js';

class Foodifai extends React.Component {
  render() {
    return (
      <App />
    );
  }
}


AppRegistry.registerComponent('Foodifai', () => Foodifai);
