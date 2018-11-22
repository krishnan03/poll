import Signup from './models/signUpScreen';
import forgotPassword from './models/forgotPasswordScreen';
import Login from './models/Login';
import HomeScreen from './models/home/homescreen'
import {StackNavigator} from 'react-navigation';
import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View} from 'react-native';
import Drawer from './models/drawer'


const NavigationApp= StackNavigator({
  Login:{screen: Login},
  SignUp:{screen: Signup},
  forgotPassword:{screen: forgotPassword},
  HomeScreen:{screen: HomeScreen}
  //Drawer:{screen:Drawer}
});


export default class App extends React.Component {
  render() {
    return<NavigationApp/>
  }
}
