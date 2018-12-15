import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Modal,Dimensions,Platform,Picker,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';
import firebase from '../firebase/firebase';
import input from '../components/input';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';


export default class UserData extends React.Component{

  static navigationOptions={
    title: 'My Details',
    
  };
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
  
  render(){
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const {navigate} = this.props.navigation;

    return(
        <View>
           <Item>
              <Input
                label='Name'
                autoCapitalize="none"
                placeholder="Name"
                onChangeText={(email) => this.setState({ email })} 
                />
            </Item>
            <Item>
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
     /></Item>
     <Picker
  style={{width:'80%'}}
  selectedValue={this.state.PickerValue}
  onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
  >
<Picker.Item label="Gender" value="" />
  <Picker.Item label="Male" value="Male" />
  <Picker.Item label="Female" value="Female"/>
  <Picker.Item label="Other" value="Other" />
  </Picker>

  <Picker
style={{width:'80%'}}
selectedValue={this.state.PickerValue1}
onValueChange={(itemValue,itemIndex) => this.setState({PickerValue1:itemValue})}
>
<Picker.Item label="Employment" value="" />
<Picker.Item label="Government Employee" value="Government Employee" />
<Picker.Item label="Private Employee" value="Private Employee"/>
<Picker.Item label="Other" value="Other" />
</Picker>
   <Button style={{marginTop:10, width:80, justifyContent:'center', alignSelf: 'center'}}
     rounded
     primary
     center
     onPress={()=> this.userDetails(this.state.name,this.state.date,this.state.PickerValue,this.state.PickerValue1)}>
     <Text>Save</Text>
   </Button>
        </View>
        

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
});