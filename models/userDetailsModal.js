import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Dimensions,Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Modal from 'react-native-modalbox';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

var screen=Dimensions.get('window');

export default class UserDetailsModal extends React.Component {
  showModal(){
    this.refs.addDetails.open();
  }
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }
  render(){
    let data = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Other',
    }];
    let employee = [{
      value: 'Govt Employee',
    }, {
      value: 'Private Employee',
    }, {
      value: 'Other',
    }];eifjcchcfcetnekguurdluvnbgnidigdehtfgtfkerrv

    return(
      <Modal
        ref={"addDetails"}
        style={{
        justifyContent:'center',
        borderRadius: Platform.OS ==='ios'?30 : 0,
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
     <View>
       <Dropdown
         label='Select Gender'
         data={data}
       />
   </View>

   <View>
     <Dropdown
       label='Select Employment'
       data={employee}
     />
   </View>

      </Modal>
    );

  }
}
