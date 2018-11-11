import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import firebase from '../firebase/firebase'
import input from '../components/input'
import { Icon } from 'react-native-elements'


class forgotPassword extends React.Component{
  static navigationOptions={
    title: 'Forgot Password',

  };
  resetPassword=(email) =>{
    firebase.auth().sendPasswordResetEmail(email).then(function(user){
        alert("Password reset mail has been sent");
    }).catch(function(e){
      alert(e);
    })
  }
  render(){
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const {navigate} = this.props.navigation;

    return(
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>

          <Label>Email</Label>

            <Input
            autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(email)=>this.setState({email})}/>
          </Item>
          <Button style={{marginTop:10, width:80, justifyContent:'center', alignSelf: 'flex-end'}}
            rounded
            success
            center
            onPress={()=> this.resetPassword(this.state.email)}>
            <Text style={{color:'white'}}>Reset</Text>
          </Button>

        </Form>
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



 export default forgotPassword;
