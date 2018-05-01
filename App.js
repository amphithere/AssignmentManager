
import Login from './screens/Login';
import Logout from './screens/Logout';

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View, 
  ScrollView, 
} from 'react-native';

import { 
  StackNavigator,
  TabNavigator,
} from 'react-navigation';


import Assignments from './screens/Assignments';
import Course from './screens/Course';


import { 
  Text,
  Button,
  Header,
  ButtonGroup,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'react-native-firebase';

export default class App extends React.Component {

   constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }

  /**
   * Listen for any auth state changes and update component state
   */
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    if (!this.state.user) {
      return(
        <Login />
      ); 
    }

    return (
      <View>
      <Logout />
      </View>
    );
  }

}





// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
// }

// export default TabNavigator({
//   Home: { screen: Login },
//   Settings: { screen: Logout },
// });
