import React, { Component } from "react";

import { 
	Platform, 
	StyleSheet, 
	View, 
	Alert,
	FlatList,
	ScrollView,
} from "react-native";

import {
	Text,
	Input,
	Button,
	Header,
	ButtonGroup,
	ListItem,
	Divider,
} from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "react-native-firebase";

export default class Course extends Component {
	constructor() {
		super();
		this.ref = firebase.firestore().collection('users').doc(String(firebase.auth().currentUser.uid)).collection('courses');
		this.unsubscribe = null;
		this.state = {
			text: "",
			sem: '',
			loading: true,
			user: String(firebase.auth().currentUser.uid),
			courses: [],
		};
	}


	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	__updateText(value) {
		this.setState({ text: String(value) });
	}

	__updateSem(value) {
		this.setState({ sem: String(value) });
	}

	__addCourse() {
		var test = this.ref.doc(this.state.text);
		test.set({
			course_code: this.state.text,
			semester: this.state.sem,
		});

		this.setState({
			text: '',
			sem: '',
		});
	}

	onCollectionUpdate = (querySnapshot) => {
		const courses = [];
		querySnapshot.forEach((doc) => {
			const {course_code, semester} = doc.data();
			courses.push({
				key: doc.id,
				doc,
				course_code,
				semester
			});
		});

		this.setState({ 
			courses,
			loading: false,
		});

	}

	keyExtractor = (item, index) => String(index)
	
	renderItem = ({ item }) => (
		<ListItem 
		title={item.course_code} 
		subtitle={
			<View style={styles.subtitleView}>
			<Text style={styles.ratingText}>{item.semester}</Text>
			</View>
		} 
		/>
		)

	render() {
		if (this.state.loading) return <Text h2>hi</Text>; // or render a loading icon

		return (
			<View style={{ paddingBottom: 50 }}>
			<Text h2>List of Courses</Text>
			<ScrollView>
			<View>
			<FlatList 
			keyExtractor={this.keyExtractor}
			data={this.state.courses}
			renderItem={this.renderItem}
			/>
			</View>
			</ScrollView>
			<ScrollView>

			<View style={{ margin: 30 }}>
			<Input
			placeholder="Course Name"
			value={this.state.text}
			containerStyle={{ margin: 20 }}
			onChangeText={text => this.__updateText(text)}
			/>
			<Input
			placeholder="Semester"
			value={this.state.sem}
			containerStyle={{ margin: 20 }}
			onChangeText={text => this.__updateSem(text)}
			/>
			<Button
			title={"Add Course"}
			disabled={!this.state.text.length}
			onPress={() => this.__addCourse()}
			/>
			</View>
			</ScrollView>
			</View>
			);
	}
}


const styles = StyleSheet.create({
	subtitleView: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingTop: 5
	},
	ratingText: {
		paddingLeft: 10,
		color: 'grey'
	}
})