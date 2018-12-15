import React, { Component ,Keyboard,Alert} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Dimensions,Platform,Picker,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-datepicker';
import firebase from '../firebase/firebase';



var screen=Dimensions.get('window');

export default class PollOptions extends React.Component {
  constructor(props){
    super(props)
    console.ignoredYellowBox = [
'Setting a timer'
];
    this.state=
    ({
      date:'',
      PickerValue:'',
      PickerValue1:'',
    })
  }
 
  
  
  componentWillMount(){
  
  }

  userDetails(name,dob,gender,employment){
    var user ='users/'+(firebase.auth().currentUser.email);
    user=user.replace(".","_")
    if(name!=null){
    firebase.database().ref(user).update(
                {
                  name:name,
                  dob:dob,
                  gender:gender,
                  employment:employment
                }
            ).then(() => {
            }).catch((error) => {
                alert(error);
            });
            this.refs.addDetails.close();
  }
  else{
    Alert.alert('Error');
  }
}
  render(){
    return(
     <View>
       <Text>This is options screen</Text>
     </View>
    );

  }
}
