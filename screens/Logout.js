import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ImageBackground,
	Dimensions,
	LayoutAnimation,
	UIManager,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';

import {
	Text,
	Header,
	Input, 
	Button 
} from 'react-native-elements'

import firebase from 'react-native-firebase';

import Course from '../Course';

export default class LoggedOut extends React.Component {
	constructor(){
		super();
		this.state = {
			user: firebase.auth().currentUser,
		}
	}
	render(){
		return (
			<View>
			<Header
			leftComponent={{ icon: 'menu', color: '#fff' }}
			centerComponent={{ text: this.props.user.email, style: { color: '#fff' } }}
			rightComponent={{ icon: 'home', color: '#fff' }}
			/>
			<View style={{margin: 20}}>
			<Text>
			Welcome to Assignment Manager!
			{this.state.user.email}!
			</Text>
			</View>

			<Button
			onPress={() => this.props.unsubscriber.signOut()}
			text={'Log Out'}
			/>
			<Course/>
			</View>
			);
	}
}