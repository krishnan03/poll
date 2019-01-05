import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Button} from 'react-native'
import firebase from '../../firebase/firebase';
import { user } from 'firebase-functions/lib/providers/auth';

export default class ProfileFollow extends React.Component {
  constructor (props) {
    super(props)
      this.state = {
      email: this.props.email,
      existingUser: false
    }
  }


  async componentWillMount() {
     

      // firebase.database().ref('users/'+currentUserMail+'/Follow/following/'+userMail).once('value', function (snapshot) {
      //   console.log(snapshot)
      //   console.log(snapshot.val())
      //   console.log(snapshot !== null && snapshot.val() !== null);
      //   if(snapshot !== null && snapshot.val() !== null){
      //       console.log(snapshot.val() !== null);
      //       this.setState({existingUser: true});
      //   }
      // });
    }
    componentDidMount(){
      if(firebase.auth().currentUser.isAnonymous){}else{
      var currentUserMail=firebase.auth().currentUser.email.replace(/\./g,"_"); 
      var userMail = this.state.email.replace(/\./g,"_");

      firebase.database().ref('users/'+currentUserMail+'/Follow/following/'+userMail +'/').on('value', (data) => {
        this.setState({
          existingUser: data.val() !== null
        });
      })
    }
  }
    follow()
    {
      var currentUserMail=firebase.auth().currentUser.email.replace(/\./g,"_"); 
      var userMail = this.state.email.replace(/\./g,"_");

      firebase.database().ref('users/'+userMail+'/Follow/followers/'+currentUserMail).update(
        {
          email:currentUserMail
        })

      firebase.database().ref('users/'+currentUserMail+'/Follow/following/'+userMail).update(
        {
          email:userMail
        })
    }

    unFollow()
    {
      var currentUserMail=firebase.auth().currentUser.email.replace(/\./g,"_"); 
      var userMail = this.state.email.replace(/\./g,"_");

      firebase.database().ref('users/'+userMail+'/Follow/followers/'+currentUserMail).update(
        {
          email:null
        })

      firebase.database().ref('users/'+currentUserMail+'/Follow/following/'+userMail).update(
        {
          email:null
        })
    }

    getUserName()
    {
      var userName = '';
      var userMail = this.state.email.replace(/\./g,"_");
      firebase.database().ref('users/'+userMail).on('value', (data) => {
        var value = data.val();
        userName = value.name;
      })
      return userName;
    }

    alertBox()
    {
      var userName = this.getUserName();
      Alert.alert(
        'Unfollow ' + userName,
        'Do you really want to unfollow ' + userName + '?',
        [
          {text: 'Unfollow', onPress: () => this.unFollow()},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        ],
        { cancelable: false }
      )
    }

    render() {
        return(
          <View>
            {
              this.state.existingUser ? 
              <Button title = 'UNFOLLOW' onPress={()=>{this.alertBox()}}/> 
              :
              <Button title = 'FOLLOW' onPress={()=>{this.follow()}}/>
            }
            </View>
        );
    }
}