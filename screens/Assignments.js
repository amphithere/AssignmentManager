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
	DatePickerIOS,
	Image,
	TouchableHighlight,
	Animated,
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

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "react-native-firebase";


export default class Assignments extends Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('users').doc(String(firebase.auth().currentUser.uid)).collection('courses').doc(this.props.course.course_name).collection('Assignments');
		this.unsubscribe = null;
		this.setDate = this.setDate.bind(this);
		this.state = { 
			chosenDate: new Date(),
			assign_name: '',
			assignments:[],
			loading: true,
		};


	}
	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	setDate(newDate) {
		this.setState({chosenDate: newDate})
	}

	onCollectionUpdate = (querySnapshot) => {
		const assignments = [];
		querySnapshot.forEach((doc) => {
			const {assign_name, due_date} = doc.data();
			assignments.push({
				key: doc.id,
				doc,
				assign_name,
				due_date,
			});
		});

		this.setState({ 
			assignments,
			loading: false,
		});

	}

	__addAssignment(){
		var test = this.ref.doc(this.state.assign_name);
		test.set({
			assign_name: this.state.assign_name,
			due_date: this.state.chosenDate,
		});

		this.setState({
			assign_name: '',
		});
	}

	__updateText(text){
		this.setState({assign_name: String(text)});
	}

	render() {
		return(
			<View 
				style={{ 
					flex: 1, 
					flexDirection: 'column',
 				}}>
				<ScrollView style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
						<Calendar
						onDayPress={(day) => alert(JSON.stringify(day))}
						monthFormat={'MMM yyyy'} 
						/>
				  	</View>
				  	<View style={{ flex: 1 }}>
					  <Input
					  placeholder="Assignment Name"
					  value={this.state.assign_name}
					  returnKeyType='next'
					  onChangeText={text => this.__updateText(text)}
					  />
					  <Button
					  style={{ 'margin': 10 }}
					  title={"Add Assignment"}
					  onPress={() => this.__addAssignment()}
					  />
				  	</View>
			  </ScrollView>
		  </View>
			  );
	}
}