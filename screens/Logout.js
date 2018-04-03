import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ImageBackground,
	Dimensions,
	LayoutAnimation,
	UIManager,
	KeyboardAvoidingView,
	Alert,
	ScrollView,
} from "react-native";

import { 
	Text, 
	Header, 
	Input, 
	Button, 
	Icon,
	Card,
} from "react-native-elements";

import firebase from "react-native-firebase";

import Course from "../Course";



export default class Logout extends Component {
	constructor() {
		super();
		this.state = {
			user: firebase.auth().currentUser,
		};
	}
	render() {
		return (
			<View>
			<Header
			backgroundColor='grey'
			leftComponent={<Icon name='menu' color='#fff' onPress={() => alert('get menu working')}/>}
			centerComponent={{
				text: this.state.user.email,
				style: { color: "#fff" },
			}}
			rightComponent={<Icon name='arrow-back' color='#fff' onPress={() => firebase.auth().signOut()}/>}
			/>
			<Course />
			</View>
			);
	}
}
