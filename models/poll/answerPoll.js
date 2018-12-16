import React, { Component } from 'react';
import { Text, TextInput, View, CheckBox, StyleSheet, ToastAndroid, Picker, Button, TouchableOpacity,Alert,Platform,StatusBar,ActivityIndicator } from 'react-native';
import { Input, Left } from 'native-base';
// import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView, Directions } from 'react-native-gesture-handler';
import { Slider } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Entypo';
import firebase from '../../firebase/firebase';
import {StackNavigator} from 'react-navigation';
// import PollUpdScreen from './poll';

import RadioForm from 'react-native-simple-radio-button';


/* declaring answer types */
var resultTime = [{ label: "Immediate", value: "Immediate" }, { label: "setDate ", value: "setDate" }];
// var answernavigation =this.props.navigation.state.params;

export default class AnswerPoll extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="publish" size={20} color={tintColor} />
    ),
   
  };

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      isDateAndTimeButton: false,
      anonymous_Flag:'',
      question_Poll:'',
      category:'',
      answerType:'',
      hash_Tag:'',
      private_Flag:'',
      Poll_duration:'',
      value1:'',
      expirationSelected:false,isLoading:false,datePicked:false

    }
    //alert(private_Flag);
  }
  state = {
    isDateTimePickerVisible: false,
    a: true
  };
 async componentWillMount(){
  let valuefromScreen1 = this.props.navigation.state.params;
  this.setState({
    private_Flag: valuefromScreen1.private_Flag,
    anonymous_Flag:valuefromScreen1.anonymous_Flag,
    question_Poll:valuefromScreen1.question_Poll,
    category:valuefromScreen1.category,
    answerType:valuefromScreen1.answerType,
    hash_Tag:valuefromScreen1.hash_Tag
  })

  if (this.state.answerType=='')
  hidetext:false
 }
  _showDateTimePicker = () => {
    if (!this.state.a) {
      this.setState({ isDateTimePickerVisible: true })
    }
  }


  setDateFlag(value1) {
    if (value1 == 'setDate') {
      this.setState(
        {
          a: false,
          isDateTimePickerVisible: true

        })
        ToastAndroid.show(value1.toString(), ToastAndroid.SHORT)
      }
else{this.setState({datePicked:false})
      
    
    // ToastAndroid.show(value1.toString(), ToastAndroid.SHORT)
  }}
  submitPoll(a1, a2, a3, a4, a5, a6) {
    //console.warn(a1 + this.state.question_Poll);
    if (this.state.anonymous_Flag) author = "Anonymous"
    else {
      author = "Mr.Vignesh"
    }
   /**  if (this.state.private_Flag) visible = "private"
    else {
      visible = "public"
    }**/
    var min = 1;
    var max = 100;
    var rand = Math.round(min + (Math.random() * (max - min)));
    var date = new Date();
    var timestamp = date.getTime();
    var user = 'users/' + "shanvigneshittce@gmail.com" + '/Poll/' + (timestamp.toString()); //replace shan mail address (firebase.auth().currentUser.email)
    user = user.replace(".", "_")
    firebase.database().ref(user).update(
      {
        poll_topic: this.props.navigation.state.params.question_Poll,
        author_name: author,
        visibility: this.state.private_Flag,
        categoryOfPoll: this.state.category,
        answer_Type: this.state.answerType,
        label: this.state.hash_Tag,
        anonymous:this.state.anonymous_Flag,
        created_time:timestamp,
        poll_duration:this.state.Poll_duration,
        totalCount:0,
        imageurl:'',
        comments:''
      }
    ).then(() => {
      console.log("document added to Firestore!");
    }).catch((error) => {
      alert(error);
    });
    firebase.database().ref(user+'/Answer').update({
      Ans1:a1,
      Ans1_C:0,
      Ans2:a2,
      Ans2_C:0,
      Ans3:a3,
      Ans3_C:0,
      Ans4:a4,
      Ans4_C:0,
      Ans5:a5,
      Ans5_C:0,
      Ans6:a6,
      Ans6_C:0
    } ).then(() => {
      console.log("document added to Firestore!");
    }).catch((error) => {
      alert(error);
    });
  }
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({
      Poll_duration: date.toString().substring(4,15).trim(),
      datePicked:true,isLoading:true
    }); 
    
    console.log('A date has been picked: ', this.state.Poll_duration);
    this._hideDateTimePicker();
    this.showStartDateTimePicker();
   
  };

  handleStartDatePicked = (date) => {
    this.setState({
      Poll_duration: this.state.Poll_duration +' '+ date.toString().substring(16,24).trim()
    });
    console.log('A time has been picked: ', this.state.Poll_duration);
    this.hideStartDateTimePicker();
  };

  back(){
    // this.props.navigation.navigate('PollUpdScreen')
  }

  render() {
    var { params } = this.props.navigation.state;
    const {navigate}=this.props.navigation;
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,paddingLeft:20 }}>
 <View><TouchableOpacity><Icon name="chevron-with-circle-left" size={40} style={{paddingTop:10}}  onPress={()=> 
  // this.goBack }/> 
 navigate('PollMain')} />
 </TouchableOpacity></View>
        <View style={{ flex: 50, padding: 20 }}>
          <Text style={{ paddingLeft: 5 }}> Type your answers </Text>
          <ScrollView style={{ padding: 5 }}>
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer1'
              placeholder='Option 1'
              onChangeText={(answer1) => this.setState({ answer1 })}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer2'
              placeholder='Option 2'
              onChangeText={(answer2) => this.setState({ answer2 })}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer3'
              placeholder='Option 3'
              onChangeText={(answer3) => this.setState({ answer3 })}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer4'
              placeholder='Option 4'
              onChangeText={(answer4) => this.setState({ answer4 })}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer5'
              placeholder='Option 5'
              onChangeText={(answer5) => this.setState({ answer5 })}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer6'
              placeholder='Option 6'
              onChangeText={(answer6) => this.setState({ answer6 })}
            />
          </ScrollView>
        
        <View style={{ padding:10,
                            margin:1,justifyContent:'center',flexDirection:"row"}}>
        
                            <Picker
		                              style={{width:'50%'}}
		                              selectedValue={this.state.categoryPickerValue}
	                              	onValueChange={(itemValue,itemIndex) => this.setState({categoryPickerValue:itemValue})}
	                          	>
		                                  
		                                  <Picker.Item label="Category Of Poll" />
		                                  <Picker.Item label="movie" value="movie"/>
                                      <Picker.Item label="tv" value="tv" />
		                                  <Picker.Item label="science" value="science"/>
		                        </Picker>
                        
                    </View>
                    </View>
          <View style={{ flex: 25,flexDirection:"row",paddingHorizontal:15 }}>
            <Text style={{fontSize:15}}> Result time </Text>
            <RadioForm style={{ paddingHorizontal: 30,paddingTop:0, justifyContent: "space-around" }}
              radio_props={resultTime}
              initial={0}
              onPress={(value) => { this.setDateFlag(value) }}
              buttonSize={8}
              buttonOuterSize={20}
              selectedButtonColor={'#EE691B'}
              selectedLabelColor={'#EE691B'}
              labelStyle={{ fontSize: 15 }}
              disabled={false}
              formHorizontal={true}
            />
            {/* <TouchableOpacity            
                disabled={this.state.a}
                 onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
          </TouchableOpacity>  */}
            <DateTimePicker
              mode={'date'}
              format="YYYY-MM-DD"
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
          {this.state.datePicked ? <Text> Date set {this.state.Poll_duration}</Text> : null}
            {/* {this.state.isLoading ? <View><ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : null} */}
        {/* </View> */}
        <View style={{ padding: 30, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <Button  style ={{}}
            title="Submit"
            //onPress={()=> navigate('AnswerMain',this.state.hashTag)} 
            onPress={() => this.submitPoll(this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.answer5, this.state.answer6)}
          >
            <Text style={{ color: 'white' }}> Next </Text>
          </Button>
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
// const NavigationPoll2= StackNavigator({
  
//   AnswerMain:{screen: AnswerPoll},
//   PollMain:{screen: PollUpdScreen},
 

// });

// export default NavigationPoll2;