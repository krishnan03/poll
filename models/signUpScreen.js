import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StyleSheet, Text, View, BackHandler, Modal ,ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from '../firebase/firebase';
import input from '../components/input';
import { Icon } from 'react-native-elements';



export default class Signup extends React.Component {

  static navigationOptions = {
    title: 'Register New User',

  };
  constructor() {
    super()
    this.stoploading = this.stoploading.bind(this);
    var downoadUrl = ''
    this.state = {
       isloading:''
    }
  }
  stoploading(){
    this.setState({
      isloading:false
    })
  }
  signUpUser = (email, password, cpassword) => {
    this.setState({
      isloading:true
    })
    if (password.length > 5 && cpassword.length > 5) {
      if (password == cpassword) {

        firebase.auth().createUserWithEmailAndPassword(email.trim(), password).then(function (user) {
          var user=email.trim()

          user=user.replace(/\./g, "_");
         
          firebase.auth().currentUser.sendEmailVerification().then(function () { 
            
            firebase.database().ref('users/'+user).set(
              {
               userData:'false'
              }),
              firebase.database().ref('users/'+user + '/Verification').update(
                {
                  status: "Not Verified"
                }),
                firebase.database().ref('users/'+user + '/Poll').update(
                  {
                    PollCount: 0
                  }),
                  firebase.database().ref('users/'+user + '/Follow/followers').update(
                    {
                      Count: 0
                    }),
                    firebase.database().ref('users/'+user + '/Follow/following').update(
                      {
                        Count: 0
                      }
                    ).then(() => {
          }).catch((error) => {
              alert(error);
          });
            
          });
         
          alert("Verification mail has been sent to your email.");
        
        
        }).catch(function (error) {
          alert(error);
        })

      } else {
        alert("Password is not matching")
       
      }
    } else {
      alert("Password should contains atlest 6 character")
    
    }
   
  
  }
  render() {
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;

    return (

      <Form>
        <Item floatingLabel>

          <Label>Email</Label>

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })} />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(pwd) => this.setState({ pwd })} />
        </Item>
        <Item floatingLabel>
          <Label>Confirm Password</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(cpwd) => this.setState({ cpwd })} />
        </Item>
        <Button style={{ marginTop: 10, width: 80, justifyContent: 'center', alignSelf: 'flex-end' }}
          rounded
          success
          center
          onPress={() => this.signUpUser(this.state.email, this.state.pwd, this.state.cpwd)}>
          <Text style={{ color: 'white' }}>SignUp</Text>
        </Button>
        {
        this.state.isloading ? <View>
        <ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : null
        }

      </Form>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});