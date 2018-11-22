import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Modal} from 'react-native';
import {StackNavigator} from 'react-navigation';
import firebase from '../firebase/firebase';
import input from '../components/input';
import { Icon } from 'react-native-elements';



export default class Signup extends React.Component{

  static navigationOptions={
    title: 'Register New User',
    
  };
  signUpUser=(email,password,cpassword) =>{
    if(password.length >5 && cpassword.length >5){
    if(password==cpassword){

  firebase.auth().createUserWithEmailAndPassword(email.trim(),password).then(function(user){
    firebase.auth().currentUser.sendEmailVerification().then(function() {});
      alert("Verification mail has been sent to your email.");
  }).catch(function(e){
  })
}else{
  alert("Password is not matching")
}
}else {
  alert("Password should contains atlest 6 character")
}

  }
  render(){
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const {navigate} = this.props.navigation;

    return(

        <Form>
          <Item floatingLabel>

          <Label>Email</Label>

            <Input
            autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(email)=>this.setState({email})}/>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
            autoCorrect={false}
          autoCapitalize="none"
        onChangeText={(pwd)=>this.setState({pwd})}/>
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input
            autoCorrect={false}
          autoCapitalize="none"
        onChangeText={(cpwd)=>this.setState({cpwd})}/>
          </Item>
          <Button style={{marginTop:10, width:80, justifyContent:'center', alignSelf: 'flex-end'}}
            rounded
            success
            center
            onPress={()=> this.signUpUser(this.state.email,this.state.pwd,this.state.cpwd)}>
            <Text style={{color:'white'}}>SignUp</Text>
          </Button>

        </Form>


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