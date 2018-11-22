import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Dimensions,Platform,Picker,TextInput} from 'react-native';
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
  clickme=()=>{
		var data = this.state.PickerValue;
		if(data==""){
			alert("Please Select a Option");
		}else{
			alert(data);
		}
	}

  userDetails(name,dob,gender,employment){
    var user ='users/'+(firebase.auth().currentUser.email);
    user=user.replace(".","_")
    firebase.database().ref(user).set(
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
  render(){
    return(
      <Modal
        ref={"addDetails"}
        style={{
        justifyContent:'center',
        borderRadius: Platform.OS ==='ios'?30 : 10,
        shadowRadius:10,
        width:screen.width-80,
        height:400
      }}
      position='center'
      backdrop={true}
      >
      <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',marginTop:10}}>Your Details</Text>
      <View>
      <Text style={{alignSelf: 'flex-start'}}>Alias Name:</Text>
      <TextInput
              label='Name'
              autoCapitalize="none"
              onChangeText={(name)=>this.setState({name})}/>
      </View>
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
<Picker.Item label="Gender" value="" />
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Female" value="female"/>
  <Picker.Item label="Other" value="other" />
  </Picker>

  <Picker
style={{width:'80%'}}
selectedValue={this.state.PickerValue1}
onValueChange={(itemValue,itemIndex) => this.setState({PickerValue1:itemValue})}
>
<Picker.Item label="Employment" value="" />
<Picker.Item label="Government Employee" value="govt" />
<Picker.Item label="Private Employee" value="pvt"/>
<Picker.Item label="Other" value="other" />
</Picker>
   <Button style={{marginTop:10, width:80, justifyContent:'center', alignSelf: 'center'}}
     rounded
     primary
     center
     onPress={()=> this.userDetails(this.state.name,this.state.date,this.state.PickerValue,this.state.PickerValue1)}>
     <Text>Save</Text>
   </Button>
      </Modal>
    );

  }
}
