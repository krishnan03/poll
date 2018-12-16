import Signup from './models/signUpScreen';
import forgotPassword from './models/forgotPasswordScreen';
import Login from './models/Login';
import HomeScreen from './models/home/homescreen'
import {StackNavigator} from 'react-navigation';
import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View} from 'react-native';
import MenuScreen from './models/menu/menu'


const NavigationApp= StackNavigator({
  HomeScreen:{screen: HomeScreen},
  Login:{screen: Login},
  SignUp:{screen: Signup},
  forgotPassword:{screen: forgotPassword},
  
  Menu:{screen:MenuScreen},
});


export default class App extends React.Component {
  render() {
    return<NavigationApp/>
  }
}
