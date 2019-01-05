import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Item, Button, Label, Input } from 'native-base';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert,TouchableHighlight,TouchableOpacity,Image,Dimensions,Linking} from 'react-native';
//import firebase from '../firebase/firebase';
import editInput from '../components/input';
import KeyboardAvoid from 'react-native-keyboard-avoid';
import { Permissions, Notifications } from 'expo';
import MiniOfflineSign from '../components/offlinePage'
import offlineHelper from '../components/offlineHelperFunction';
import * as firebase from "firebase";
import Icon from 'react-native-vector-icons/Entypo';

const firebaseConfig = {
  apiKey: "AIzaSyDtdkB6WXrgXBQrqpngZZqOcmEjjyQc0_I",
  authDomain: "nadak-a6ff4.firebaseapp.com",
  databaseURL: "https://nadak-a6ff4.firebaseio.com",
  projectId: "nadak-a6ff4",
  storageBucket: "nadak-a6ff4.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp({});
}

var screen=Dimensions.get('window');
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
    var user = firebase.auth().currentUser.email;
    user = user.replace(/\./g, "_");
    firebase.database().ref('users/'+user).update(
      {
        expotoken: token
      }
    ).then(() => {
    }).catch((error) => {
      alert(error);
    });
  }

  __loginAnonymously(){
    const { navigate } = this.props.navigation;
    this.setState({
      isloading: true
    })
    firebase.auth().signInAnonymously().then(user => {
      console.log(user)

      firebase.database().ref('users/anonymous_user_'+firebase.auth().currentUser.uid).set(
        {
         anonymous_user:true
        })
        navigate('HomeScreen');
    }).catch(function(error) {
      
      // ...
    });
  }


  async loginWithFacebook() {
    const { navigate } = this.props.navigation;
    this.setState({
      isloading: true
    })
    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('328620027736825', { permissions: ['public_profile', 'email'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).then(function (user) {
     
 
        firebase.database().ref('users/').on('value', (data) => {
        
          var user = firebase.auth().currentUser.email;
          if(user !=null && user !=''){
          user = user.replace(/\./g, "_");
          var value = data.val();
          try{
          const UD = value[user].userData;
          navigate('HomeScreen');
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
            <View>
              <Image  style={{width: screen.width, height: 80,justifyContent:'center'}}
          source={{uri: 'https://firebasestorage.googleapis.com/v0/b/nadak-a6ff4.appspot.com/o/poller_admin%2Fheader1.png?alt=media&token=e9affae2-3be8-4621-ad95-d57e3e779079'}}
        />
          <Text style={{justifyContent:'center',alignSelf:'center',alignItems:'center',fontStyle:'italic'}}>     Recorder of people's opinion</Text>
              </View>
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
                <Button style={{ marginTop: 10,backgroundColor:'orange' }}
                  full
                  rounded
                  success
                  onPress={() => this.loginUser(this.state.email, this.state.password)}
                >
                  <Text style={{ color: 'black' }}>Login</Text>
                </Button>
                {
                  this.state.isloading ? <View>
                    <ActivityIndicator size='large' color='#330066' animating />
                  </View>
                    : null
                }
                <Text style={{ marginTop: 10, textDecorationLine: 'underline', alignSelf: 'center' }}
                  onPress={() => navigate('forgotPassword')}>Forgot Password?</Text>

                 
                <Button style={{ marginTop: 10,backgroundColor:'orange' }}
                  full
                  rounded
                  primary
                  onPress={() => navigate('SignUp')}
                >
                  <Text style={{ color: 'black' }}>Sign up</Text>
                </Button>
                <View style={{ flex: 1,
        flexDirection: 'row',marginTop: 10,justifyContent:'space-evenly'}}>
                    <Button style={{ marginTop: 10 }}
                  full
                  rounded
                  primary
                  onPress={() => this.loginWithFacebook()}
                >
                  <Text style={{ color: 'white' }}>     Login with <Icon name="facebook" size={20}/>     </Text>
                </Button>
               
                <Button style={{ marginTop: 10 }}
                 full
                 rounded
                 primary
                 onPress={() => this.__loginAnonymously()}
                 >
                <Text style={{color: 'white', alignSelf: 'center' }}>     Login as Guest!!     </Text>
                  </Button>
                  
                  </View>

              </Form>
              
            </Container>
          </ScrollView>
          : <MiniOfflineSign />
        }
     
        <TouchableOpacity onPress={() => Linking.openURL('http://www.zhagara.com')}>
<Text style={{marginBottom:0,justifyContent:'center',alignSelf:'center'}}

>Developed by Zhagara @www.zhagara.com</Text>
</TouchableOpacity>


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
