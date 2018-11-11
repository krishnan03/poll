import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Item,Button,Label,Input} from 'native-base';
import {StyleSheet, Text,View} from 'react-native';
import firebase from '../firebase/firebase';
import editInput from '../components/input';

export default class Login extends React.Component{
  static navigationOptions={
    header: null

  };


loginUser=(email,password) =>{
  const{navigate}=this.props.navigation;
  firebase.auth().signInWithEmailAndPassword(email.trim(),password).then(function(){
    navigate('HomeScreen')
  }).catch(function(e){
    alert(e);
  })
}
  render(){
    const{navigate}=this.props.navigation;
    return(
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
          <Label>Email</Label>
            <Input
              label='Email'
              autoCapitalize="none"
              onChangeText={(email)=>this.setState({email})}/>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
            autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        onChangeText={(password)=>this.setState({password})}/>
          </Item>
          <Button style={{marginTop:10}}
            full
            rounded
            success
            onPress={()=> this.loginUser(this.state.email,this.state.password)}
            >
            <Text style={{color:'white'}}>Login</Text>
          </Button>
          <Button style={{marginTop:10}}
            full
            rounded
            primary
             onPress={()=> navigate('SignUp')}
            >
            <Text style={{color:'white'}}>Sign up</Text>
          </Button>
            <Text style={{marginTop:30,textDecorationLine:'underline',alignSelf: 'center'}}
            onPress={()=> navigate('forgotPassword')}>Forgot Password?</Text>

        </Form>
      </Container>
    );

  };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding:10
    },
  });
