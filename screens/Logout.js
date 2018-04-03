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
	Icon 
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
			leftComponent={{ icon: "menu", color: "#fff" }}
			centerComponent={{
				text: this.state.user.email,
				style: { color: "#fff" },
			}}
			rightComponent={<Icon name='arrow-back' color='#fff' onPress={() => firebase.auth().signOut()}/>}
			/>
			<ScrollView>

			<View style={{ margin: 20 }}>
			<Text>
			Welcome to Assignment Manager!
			{this.state.user.email}!
			</Text>
			</View>

			<Course />
			</ScrollView>

			</View>
			);
	}
}
