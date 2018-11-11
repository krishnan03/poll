import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler} from 'react-native';
import {StackNavigator} from 'react-navigation';
import firebase from '../../firebase/firebase'
import input from '../../components/input'
import { Icon } from 'react-native-elements'


export default class HomeScreen extends React.Component{

  static navigationOptions={
    header:null
  };


  render(){
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const {navigate} = this.props.navigation;

    return(
      <Container style={styles.container}>
        <Text>Welcome to HomeScreen</Text>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
});
