import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View, 
	ScrollView, 
	Alert,
} from 'react-native';


import { 
	Text,
	Input,
	Button,
	Header,
	ButtonGroup,
	List,
	ListItem,
	Divider,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'react-native-firebase';

export default class Course extends React.Component {
	constructor(){
		super();
		this.ref = firebase.firestore().collection('users');
		this.unsubscribe = null;
		this.state = {
			text: '',
			loading: true,
			user: firebase.auth().currentUser,
			courses: []
		};
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	__updateText(value){
		this.setState({text: value});
	}

	__addCourse(){
		this.ref.doc(String(this.state.user.uid)).set({
			id: this.state.user.uid
		});

		this.setState({
			text:'',
		});
	}

	onCollectionUpdate = (querySnapshot) => {
		const courses = [];
		querySnapshot.forEach((doc) => {
			const { uid } = doc.data();
			courses.push({
				key: doc.id,
      doc, // DocumentSnapshot
      uid
  });
		});
		this.setState({ 
			courses,
			loading: false,
		});
	}

	render() {
		if (this.state.loading) return null; // or render a loading icon

		return(
			<View style={{ margin: 20 }}>
			<ScrollView>
			<Divider style={{ margin: 50 }} />

			<Text style={{justifyContent: 'center'}}>
			List of Courses
			</Text>
			<List>
			{
				this.state.courses.map((item, i) => (
					<ListItem
					key={i}
					title={item.uid}
					/>
					))
			}
			</List>
			</ScrollView>
			<Input
			placeholder={'Add Course'}
			value={this.state.text}
			onChangeText={(text) => this.__updateText(text)}
			/>
			<Button
			text={'Add Course'}
			disabled={!this.state.text.length}
			onPress={() => this.__addCourse()}
			/>
			</View>
			);

	}
}