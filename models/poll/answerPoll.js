import React, { Component } from 'react';
import { Text,TextInput, View,CheckBox,StyleSheet,ToastAndroid,Picker,Button,TouchableOpacity } from 'react-native';
import { Input } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView, Directions } from 'react-native-gesture-handler';
import { Slider } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Entypo';

import {StackNavigator} from 'react-navigation';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';


/* declaring answer types */
var resultTime = [ {label: "Immediate", value: "Immediate"}, {label: "setDate ", value: "setDate"}];


export default class AnswerPoll extends React.Component 
{
  static navigationOptions={
    header:null,
    tabBarIcon:({tintColor})=>(
        <Icon name="publish" size={20} color={ tintColor } />
        )
  };
  state = {
    isDateTimePickerVisible: false,
    a:true
  };
 
  _showDateTimePicker = () =>{ 
    if(!this.state.a){
    this.setState({ isDateTimePickerVisible: true })
  }}
   

    setDateFlag(value1) {
       if(value1=='setDate'){
        this.setState(
          {
          a:false,
          isDateTimePickerVisible:true
        })
       
      ToastAndroid.show(value1.toString(), ToastAndroid.SHORT)
    }
      // ToastAndroid.show(value1.toString(), ToastAndroid.SHORT)
    }
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.showStartDateTimePicker();
  };

  handleStartDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideStartDateTimePicker();
  };
   
  constructor(){
    super();
    this.state={
      value:0,
      isDateAndTimeButton:false,
      
    };
    
  }
    render(){

      var {params} = this.props.navigation.state;
  return(
            

            <View style={{ flex:1,padding:10}}>
              <View style={{flex:50,padding:50}}>
            <Text style={{ paddingLeft:5}}> Type your answers </Text>
             <ScrollView style={{ padding:5}}>
             <TextInput style={{ height:40,backgroundColor:'white',margin:10}}                                
                               editable={true}
                               label='answer1'
                               placeholder='Option 1'
                               onChangeText={(answer1)=>this.setState({answer1})}
                   />
                   <TextInput style={{ height:40,backgroundColor:'white',margin:10}}                                
                               editable={true}
                               label='answer2'
                               placeholder='Option 2'
                               onChangeText={(answer2)=>this.setState({answer2})}
                   />
                   <TextInput style={{ height:40,backgroundColor:'white',margin:10}}                                
                               editable={true}
                               label='answer3'
                               placeholder='Option 3'
                               onChangeText={(answer3)=>this.setState({answer3})}
                   />
                   <TextInput style={{ height:40,backgroundColor:'white',margin:10}}                                
                               editable={true}
                               label='answer4'
                               placeholder='Option 4'
                               onChangeText={(answer4)=>this.setState({answer4})}
                   />
                   <TextInput style={{ height:40,backgroundColor:'white',margin:10}}                                
                               editable={true}
                               label='answer5'
                               placeholder='Option 5'
                               onChangeText={(answer5)=>this.setState({answer5})}
                   />
                   <TextInput style={{ height:40,backgroundColor:'white',margin:10}}                                
                               editable={true}
                               label='answer6'
                               placeholder='Option 6'
                               onChangeText={(answer6)=>this.setState({answer6})}
                   />
             </ScrollView>
             </View>
             <View style={{flex: 50, justifyContent: 'center',padding:50}}>
                {/* <View style={{flex:25}}>
                  <Slider 
                  step={1}
                  maximumValue={30}
                  value={this.state.value}
                  
                  onValueChange={(value) => this.setState({value})} />
                  <Text>Value: {(this.state.value)}</Text>
                </View> */}
                <View style={{flex:25,flexDirection:"column"}}>
                <Text> Select Result time :</Text>
                <RadioForm style={{ padding:40,justifyContent:"space-around"}}
          radio_props={resultTime}
          initial={0}
          onPress={(value) => {this.setDateFlag(value)}}
          buttonSize={8}
          buttonOuterSize={20}
          selectedButtonColor={'#094A2A'}
          selectedLabelColor={'#094A2A'}
          labelStyle={{ fontSize: 15 }}
          disabled={false}
          formHorizontal={false}
        />
                {/* <TouchableOpacity            
                disabled={this.state.a}
                 onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
          </TouchableOpacity>  */}
        <DateTimePicker
        mode={'date'}
        
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}

        />
        
        {/* <TouchableOpacity isVisible={this.state.isDateAndTimeButton} onPress={this.showStartDateTimePicker}>
          <Text>Show TimePicker</Text>
        </TouchableOpacity> */}
        <DateTimePicker
        mode={'time'}
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}

        />
        
                </View>
              </View>
             </View>
            
              
              
        );
    }
}

// const styles = StyleSheet.create({
//   containerRadio: {
//     paddingVertical:50,
//     marginTop:10,
//     marginLeft:15,
//     // flex: 1,
//     justifyContent: 'center'

//     // backgroundColor: '#F5FCFF',
//   }
