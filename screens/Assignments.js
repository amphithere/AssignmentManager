/*
* Show each assignment 
*/
import React, { Component } from "react";

import { 
	Platform, 
	StyleSheet, 
	View, 
	Alert,
	FlatList,
	ScrollView,
	Dimensions,
} from "react-native";

import {
	Text,
	Input,
	Button,
	Header,
	ButtonGroup,
	ListItem,
	Divider,
	Card
} from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "react-native-firebase";

export default class Assignment extends Component {
	constructor() {
		super();
		this.ref = firebase.firestore().collection('users').doc(String(firebase.auth().currentUser.uid)).collection('courses').doc(this.props.course_name);
		this.unsubscribe = null;
	}
}