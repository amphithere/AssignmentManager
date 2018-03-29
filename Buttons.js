import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, ButtonGroup } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

export class Buttons extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Button
            text='LOG IN'
            buttonStyle={{height: 50, width: 250, backgroundColor: 'black', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
            containerStyle={{marginVertical: 10}}
            titleStyle={{fontWeight: 'bold'}}
          />
          <Button
            text='Log in'
            loading={false}
            loadingProps={{size: 'small', color: 'white'}}
            buttonStyle={{height: 50, width: 230, backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5}}
            titleStyle={{fontWeight: 'bold', fontSize: 23}}
            containerStyle={{marginVertical: 10}}
            onPress={() => console.log('aye')}
            underlayColor="transparent"
          />
          <Button
            text="Request an agent"
            titleStyle={{fontWeight: '500'}}
            buttonStyle={{backgroundColor: 'rgba(199, 43, 98, 1)', width: 275, height: 45, borderColor: 'transparent', borderWidth: 0}}
            containerStyle={{marginTop: 10}}
          />
          <Button
            text="SIGN UP"
            disabled={true}
            titleStyle={{fontWeight: '700'}}
            buttonStyle={{backgroundColor: 'rgba(92, 99,216, 1)', width: 300, height: 45, borderColor: 'transparent', borderWidth: 0, borderRadius: 5}}
            containerStyle={{marginTop: 20}}
          />
          <Button
            text="SIGN UP"
            loading={true}
            loadingProps={{size: 'large', color: 'rgba(111, 202, 186, 1)'}}
            titleStyle={{fontWeight: '700'}}
            buttonStyle={{backgroundColor: 'rgba(92, 99,216, 1)', width: 300, height: 45, borderColor: 'transparent', borderWidth: 0, borderRadius: 5}}
            containerStyle={{marginTop: 20}}
          />
          </View>
      </ScrollView>
    );
  }
}


