import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StyleSheet, Text, View, BackHandler, Dimensions, Platform, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Modal from 'react-native-modalbox';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from '../../firebase/firebase';
import CardComponent from './profile_CardItem';
import DobCardComponent from './profile_details_card';
import HeaderCard from './headerCard';
import UserDetailsModal from '../userDetailsModal';


var screen = Dimensions.get('window');

export default class UserDetails extends React.Component {
  showModal() {
    firebase.database().ref('users/').on('value', (data) => {
      var user = firebase.auth().currentUser.email;
      user = user.replace(".", "_");
      var value = data.val();
      const dobVal = value[user].dob;
      var employment = value[user].employment;
      var gender = value[user].gender;
      this.setState({ date: dobVal });
      this.setState({ PickerValue: employment });
      this.setState({ PickerValue1: gender });
    })
    this.refs.showDetails.open();
  }
  constructor(props) {
    super(props)

    console.ignoredYellowBox = [
      'Setting a timer'
    ];


    this.state =
      ({
        date: '',
        PickerValue: '',
        PickerValue1: '',
      })


  }
  clickme = () => {
    var data = this.state.PickerValue;
    if (data == "") {
      alert("Please Select a Option");
    } else {
      alert(data);
    }
  }

  componentWillMount() {
    
  }

  componentDidMount() {
     
  }

  editUser(){
    this.refs.addDetails.showModal();
  }

  userDetails(dob, gender, employment) {
    var user = 'users/' + (firebase.auth().currentUser.email);
    user = user.replace(".", "_")
    firebase.database().ref(user).set(
      {
        dob: dob,
        gender: gender,
        employment: employment
      }
    ).then(() => {
    }).catch((error) => {
      alert(error);
    });
    this.refs.showDetails.close();
  }
  render() {
    


    return (
      
      <Modal
        ref={"showDetails"}
        style={{
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30 : 10,
          shadowRadius: 10,
          width: screen.width,
          height: screen.height
        }}
        position='center'
        backdrop={true}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}>
    <UserDetailsModal ref={'addDetails'}></UserDetailsModal>
        <Content style={{ height: 5}}>
          <HeaderCard style={{ height: 5}}/>

           <Button style={{ marginTop: 10, width: 80, justifyContent: 'center', alignSelf: 'center' }}
            rounded
            primary
            center
            onPress={() => this.editUser()}>
            <Text>Edit</Text>
          </Button>
        </Content>

         

      </Modal>
    );

  }
}
