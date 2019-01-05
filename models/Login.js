import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Item, Button, Label, Input } from 'native-base';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
//import firebase from '../firebase/firebase';
import editInput from '../components/input';
import KeyboardAvoid from 'react-native-keyboard-avoid';
import { Permissions, Notifications } from 'expo';
import MiniOfflineSign from '../components/offlinePage'
import offlineHelper from '../components/offlineHelperFunction';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import * as firebase from "firebase";

const firebaseConfig = {
  // ADD YOUR FIREBASE CREDENTIALS
  apiKey: "AIzaSyDtdkB6WXrgXBQrqpngZZqOcmEjjyQc0_I",
  authDomain: "nadak-a6ff4.firebaseapp.com",
  databaseURL: "https://nadak-a6ff4.firebaseio.com",
  projectId: "nadak-a6ff4",
  storageBucket: "nadak-a6ff4.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp({});
}


export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super()

    var downoadUrl = ''
    this.state = {
      userData: false, isloading: false,
      loggedIn: false,
      isConnected: true
    }



  }


  componentWillMount() {



    offlineHelper.whenDidMount(this.handleConnectivityChange)
  }
  componentDidMount() {
    offlineHelper.whenUnmount(this.handleConnectivityChange)
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };


  loginUser = (email, password) => {
    if (email != null && password != null) {
      this.setState({
        isloading: true
      })
      const { navigate } = this.props.navigation;
      firebase.auth().signInWithEmailAndPassword(email.trim(), password).then(user => {
        firebase.database().ref('users/').on('value', (data) => {
          var user = firebase.auth().currentUser.email;
          user = user.replace(/\./g, "_");
          var value = data.val();
          const UD = value[user].userData;
          this.setState({ userData: UD })
          console.log(this.state.userData);
         
        })
        this.registerforPushNotification(user);


      }).catch(function (e) {
        alert(e);
      });
    } else {
      alert("Enter Valid Username and Password")
    }
  }
  _onPress() {
    this.aTextInput.focus();
    KeyboardAvoid.checkNeedScroll({
      nodeRef: this.footer
    }, 'position', 0);
  }
  registerforPushNotification = async (user) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    firebase.database().ref('users/gplkrishnan320@gmail_com').update(
      {
        expotoken: token
      }
    ).then(() => {
    }).catch((error) => {
      alert(error);
    });
  }
  async loginWithFacebook() {

    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('328620027736825', { permissions: ['public_profile', 'email'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).then(function (user) {
     
 
        firebase.database().ref('users/').on('value', (data) => {
          
          var user = firebase.auth().currentUser.email;
          
          user = user.replace(/\./g, "_");
          var value = data.val();
          try{
          const UD = value[user].userData;
          }
          catch(error){
            firebase.database().ref('users/'+user).set(
              {
               userData:false
              }),
              firebase.database().ref('users/'+user + '/Verification').update(
                {
                  status: "Not Verified"
                }),
                firebase.database().ref('users/'+user + '/Poll').update(
                  {
                    dummy: ''
                  }),
                  firebase.database().ref('users/'+user + '/Follow/followers').update(
                    {
                      dummy: ''
                    }),
                    firebase.database().ref('users/'+user + '/Follow/following').update(
                      {
                        dummy: ''
                      })
          }
          


        })
        


      }).catch((error) => {
        console.log(error)
      })
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.state.isConnected ?
          <ScrollView>
            <Container style={styles.container}>
              <Form>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    label='Email'
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email })}
                    onPress={() => this._onPress()} />
                </Item>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    onPress={() => this._onPress()} />
                </Item>
                <Button style={{ marginTop: 10 }}
                  full
                  rounded
                  success
                  onPress={() => this.loginUser(this.state.email, this.state.password)}
                >
                  <Text style={{ color: 'white' }}>Login</Text>
                </Button>
                {
                  this.state.isloading ? <View>
                    <ActivityIndicator size='large' color='#330066' animating />
                  </View>
                    : null
                }
                <Button style={{ marginTop: 10 }}
                  full
                  rounded
                  primary
                  onPress={() => navigate('SignUp')}
                >
                  <Text style={{ color: 'white' }}>Sign up</Text>
                </Button>
                <Text style={{ marginTop: 30, textDecorationLine: 'underline', alignSelf: 'center' }}
                  onPress={() => navigate('forgotPassword')}>Forgot Password?</Text>

              </Form>
              <View>

                <Button style={{ marginTop: 10 }}
                  full
                  rounded
                  primary
                  onPress={() => this.loginWithFacebook()}
                >
                  <Text style={{ color: 'white' }}> Login With Facebook</Text>
                </Button>
              </View>
            </Container>
          </ScrollView>
          : <MiniOfflineSign />
        }
      </View>

    );

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
