import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Button} from 'react-native'
import firebase from '../../firebase/firebase';

export default class ProfileFollow extends React.Component {
  constructor () {
    super()
    // this.state = {
    //   followerCount: null,
    //   followingCount: null
    // }
  }

  // async componentWillMount() {
    
  //   }

    follow()
    {
    var follow ='users/'+(firebase.auth().currentUser.email)+'/Follow/';
    follow=follow.replace(".","_");
    firebase.database().ref(follow).on('value', (data) => {
      var value = data.val();
      const followerCount = value['followers'].count;
      const followingCount = value['following'].count;
      Alert.alert("followerCount: " + followerCount);
      Alert.alert("followingCount: " + followingCount);
    })
    }

    render() {
        return(
          <Button title = 'follow' onPress={this.follow}/>);
    }
}