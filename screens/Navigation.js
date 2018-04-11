import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View, 
	ScrollView, 
	FlatList,
} from 'react-native';


import { 
	Text,
	Button,
	Header,
	ButtonGroup,
	ListItem
} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import App from '../App';
import Login from './Login';
import Logout from './Logout';
import Assignments from './Assignments';
import Course from './Course';


import { TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default TabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
});