import React, { Component } from "react";

import { 
	Platform, 
	StyleSheet, 
	View, 
	Alert,
	FlatList,
	ScrollView,
	Dimensions,
	Modal,
	TouchableHighlight,
	Animated
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

import { Navigation } from 'react-native-navigation';

import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "react-native-firebase";

import Assignments from "./Assignments";

import Main from './Navigation';

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
			modalVisible: false,
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
			course_name: this.state.text,
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
			const {course_name, semester} = doc.data();
			courses.push({
				key: doc.id,
				doc,
				course_name,
				semester
			});
		});

		this.setState({ 
			courses,
			loading: false,
		});

	}

	__renderAssignments(item){
		return(
			<Assignments course={item} />
		);
	}

	keyExtractor = (item, index) => String(index)
	
	renderItem = ({ item }) => (
		<View>
			<ListItem 
			chevron
			bottomDivider
			topDivider
			title={item.course_name} 
			subtitle={
				<View style={styles.subtitleView}>
					<Text style={styles.ratingText}>{item.semester}</Text>
					{this.__renderAssignments(item)}
				</View>
			} 
			/>
		</View>
		)


	render() {
		if (this.state.loading) return <Text h2>hi</Text>; // or render a loading icon

		return (
			<View>
			<Card 
			title='List of Courses'
			containerStyle={{height: 300}}
			flexDirection='column'
			>

			{
				<ScrollView style={{ marginBottom: 46 }}>
				<FlatList 
				keyExtractor={this.keyExtractor}
				data={this.state.courses}
				renderItem={this.renderItem}
				/>
				</ScrollView>

			}
						<Main />

			</Card>
			<View>

			<Input
			placeholder="Course Name"
			value={this.state.text}
			containerStyle={{ margin: 20 }}
			returnKeyType='next'
			onChangeText={text => this.__updateText(text)}
			/>
			<Input
			placeholder="Semester"
			value={this.state.sem}
			containerStyle={{ margin: 20 }}
			onChangeText={text => this.__updateSem(text)}
			/>
			<Button
			style={{ 'margin': 30 }}
			title={"Add Course"}
			disabled={!this.state.text.length}
			onPress={() => this.__addCourse()}
			/>
			</View>
			</View>
			);
	}
}


const styles = StyleSheet.create({
	subtitleView: {
		flex:1,
		flexDirection: 'column',
		paddingLeft: 10,
		paddingTop: 5
	},
	ratingText: {
		paddingLeft: 10,
		color: 'grey'
	}
})