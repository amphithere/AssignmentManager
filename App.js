
import Login from './login.js';

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View, 
  ScrollView, 
} from 'react-native';


import { 
  Text,
  Button,
  Header,
  ButtonGroup,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'react-native-firebase';

import { Buttons } from './Buttons.js';


export default class App extends React.Component {

  constructor(){
    super();
    this.ref = firebase.firestore().collection('todos');
  }

  render() {
    return (
      <View>
      <Header
      style={{ padding: 10 }}
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Login />
      </View>
      );
  }
}