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

import Course from "./Course";
import Login from "./Login";



export default class Logout extends Component {
	constructor() {
		super();
		this.state = {
			user: firebase.auth().currentUser,
		};
	}
	render() {
		if (this.state.user==null){
			return (
				<View>
				<Text>No one is logged in!</Text>
				<Login />

				</View>
				)
		}
		else {
			return (
				<View>
				<Header
				backgroundColor='grey'
				leftComponent={<Icon name='menu' color='#fff' onPress={(component) => alert('get menu working')}/>}
				centerComponent={{
					text: "Assignment Manager",
					style: { color: "#fff" },
				}}
				rightComponent={<Icon name='arrow-back' color='#fff' onPress={() => firebase.auth().signOut()}/>}
				/>
				<Text>{this.state.user.email}</Text>
				<Course />
				</View>
				);
		}
	}
}
