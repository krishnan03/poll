import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Item, Button, Label, Input } from 'native-base';
import { StyleSheet, Text, View, KeyboardAvoidingView,ScrollView,ActivityIndicator} from 'react-native';
import firebase from '../firebase/firebase';
import editInput from '../components/input';
import KeyboardAvoid from 'react-native-keyboard-avoid';
import {Permissions,Notifications} from 'expo';

export default class Loader extends React.Component {
  static navigationOptions = {
    header:null
  };
  constructor() {
    super()
  }


componentDidMount(){
    const { navigate } = this.props.navigation;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user avilable')
          navigate('HomeScreen');
      } else {
          console.log('no user')
         navigate('Login');
      }
    });
}



  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>

    );

  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })
