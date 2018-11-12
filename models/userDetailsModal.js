import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Dimensions,Platform,Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Modal from 'react-native-modalbox';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from '../firebase/firebase';



var screen=Dimensions.get('window');

export default class UserDetailsModal extends React.Component {
  showModal(){
    this.refs.addDetails.open();
  }
  constructor(props){
    super(props)
    this.state=
    ({
      date:"2016-05-15",
      PickerValue:'',
      PickerValue1:'',
    })
  }
  clickme=()=>{
		var data = this.state.PickerValue;
		if(data==""){
			alert("Please Select a Option");
		}else{
			alert(data);
		}
	}

  userDetails(dob,gender,employment){
    var user ='users/'+(firebase.auth().currentUser.email);
    user=user.replace(".","_")
    firebase.database().ref(user).set(
                {
                  dob:dob,
                  gender:gender,
                  employment:employment
                }
            ).then(() => {
              alert(firebase.auth.getUid())
                console.log('INSERTED !');
            }).catch((error) => {
                alert(error);
            });
  }
  render(){
    return(
      <Modal
        ref={"addDetails"}
        style={{
        justifyContent:'center',
        borderRadius: Platform.OS ==='ios'?30 : 10,
        shadowRadius:10,
        width:screen.width-80,
        height:500
      }}
      position='center'
      backdrop={true}
      onClosed={()=>{
        alert('Data Saved')
      }}>
    <Text style={{alignSelf: 'flex-start'}}>Date of Birth:</Text>
    <DatePicker
       style={{width: 200}}
       date={this.state.date}
       mode="date"
       placeholder="select date"
       format="YYYY-MM-DD"
       minDate="1950-05-01"
       maxDate="2010-12-31"
       confirmBtnText="Confirm"
       cancelBtnText="Cancel"
       customStyles={{
         dateIcon: {
           position: 'absolute',
           left: 0,
           top: 4,
           marginLeft: 0
         },
         dateInput: {
           marginLeft: 36
         }
       }}
       onDateChange={(date) => {this.setState({date: date})}}
     />
     <Picker
  style={{width:'80%'}}
  selectedValue={this.state.PickerValue}
  onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
  >
  <Picker.Item label="Male" value="Male" />
  <Picker.Item label="Female" value="Female"/>
  <Picker.Item label="Other" value="Other" />
  </Picker>

  <Picker
style={{width:'80%'}}
selectedValue={this.state.PickerValue1}
onValueChange={(itemValue,itemIndex) => this.setState({PickerValue1:itemValue})}
>
<Picker.Item label="Government Employee" value="Male" />
<Picker.Item label="Private Employee" value="Female"/>
<Picker.Item label="Other" value="Other" />
</Picker>
   <Button style={{marginTop:10, width:80, justifyContent:'center', alignSelf: 'center'}}
     rounded
     primary
     center
     onPress={()=> this.userDetails(this.state.date,this.state.PickerValue,this.state.PickerValue1)}>
     <Text style={{color:'white'}}>Save</Text>
   </Button>
      </Modal>
    );

  }
}
