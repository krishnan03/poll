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
import MiniOfflineSign from '../../components/offlinePage';
import offlineHelper from '../../components/offlineHelperFunction';
import GradientButton from 'react-native-gradient-buttons';

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
      hashTag:'',
      private_Flag:'',
      timestamp:'',
      Poll_duration:'',
      value1:'',
      imageurl:'',
      expirationSelected:false,isLoading:false,datePicked:false,isConnected1:true,showothertext:true,minAnswer:0,isEditText:true,text: null ,
      name:null,dontsubmit:true,secondAnswer:true,isEdit:false

    }
    //alert(private_Flag);
    this._handleChange = this._handleChange.bind(this)
  }
  state = {
    isDateTimePickerVisible: false,
    a: true
  };
  handleConnectivityChange = isConnected1 => {
    if (isConnected1) {
      this.setState({ isConnected1 });
    } else {
      this.setState({ isConnected1 });
    }
  };
  getImage(time1) {
    let { state } = this
    console.log("time " +time1)
    var user = 'poll/Poll_question/'+'shanvigneshittce@gmail.com/' + time1;
    
    user = user.replace(/\./g, "_")
    console.log("imageurl"+user)
    firebase.storage().ref().child(`images/${user}`).getDownloadURL().then((url) => {
      console.log("inside firebase imageurl")
      if (url != null) {
        this.setState({
          imageurl: url,
        });
      }
      else {

      }
    }).catch(function (e) {

    })
  }

  componentDidMount() {
    console.log("time inside componentWillUnmount" +this.state.timestamp)
    offlineHelper.whenDidMount(this.handleConnectivityChange)
    
   }
 
   componentWillUnmount() {
    
    offlineHelper.whenUnmount(this.handleConnectivityChange)
   }
 async componentWillMount(){
  let valuefromScreen1 = this.props.navigation.state.params;
  
  this.setState({
    private_Flag: valuefromScreen1.private_Flag,
    anonymous_Flag:valuefromScreen1.anonymous_Flag,
    question_Poll:valuefromScreen1.question_Poll,
    category:valuefromScreen1.category,
    answerType:valuefromScreen1.answerType,
    timestamp:valuefromScreen1.timestamp
    // hash_Tag:valuefromScreen1.hash_Tag
  })
  this.getImage(valuefromScreen1.timestamp)
  // Alert.alert(valuefromScreen1.answerType);
  if (valuefromScreen1.answerType=='yes_no')
  {
    // Alert.alert('yes_no entered');
  this.setState({showothertext:false})
  }
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
  _handleChange(name,value) {
    // const { value } = e.target;  //it will destructure your name and value where ever you are using _handleChange method.
    this.setState({
        [name]: value, // here we are setting the state dynamically.

    });
   
    this.check123Entered()
  // Alert.alert('answer count' +this.state.minAnswer)
}

check123Entered(){
  if(!((this.state.answer1==undefined||this.state.answer1=='') && (this.state.answer2==undefined||this.state.answer2=='') && (this.state.answer3==undefined||this.state.answer3=='')))
    this.setState({
      isEdit:true // here we are setting the state dynamically.
    
  });
  else{
    this.setState({
      isEdit:false // here we are setting the state dynamically.
    
  });  
  }
}

commonSubmit(a1, a2, a3, a4, a5, a6){
  if ( this.state.answerType=='yes_no')
    {
      if(a3==undefined)
      a3='';
      a4='';a5='';a6='';
    }
      // Alert.alert('your poll is submitted successfully',onPress)
   
    var user = 'users/' + "shanvigneshittce@gmail.com" + '/Poll/' + (this.state.timestamp.toString()); //replace shan mail address (firebase.auth().currentUser.email)
    user = user.replace(".", "_")
    console.log("timestamp inside answerPoll"+user+"image url"+(this.state.imageurl.toString()))
    
    firebase.database().ref(user).update(
      {
        poll_topic: this.props.navigation.state.params.question_Poll,
        author_name: author,
        visibility: this.state.private_Flag,
        categoryOfPoll: this.state.category,
        answer_Type: this.state.answerType,
        label: this.state.hashTag,
        anonymous:this.state.anonymous_Flag,
        created_time:this.state.timestamp,
        poll_duration:this.state.Poll_duration,
        totalCount:0,
        imgURL:this.state.imageurl,
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
    const {navigate} = this.props.navigation;
    Alert.alert(
      '','Poll Submitted Successfully ☺',
      [
        
        {text: 'Ok', onPress: () =>navigate('PollMain')},
      ],
      { cancelable: false }
    )
} 

callAlert(a1, a2, a3, a4, a5, a6){
  Alert.alert(
    '','Are you sure? to submit the poll:☝',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Submit', onPress: () => this.submitPoll(a1, a2, a3, a4, a5, a6)},
    ],
    { cancelable: false }
  )
}

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
    if(((a2==undefined||a2=='') || (a1==undefined||a1=='')) && (this.state.answerType=='yes_no'))
    {
      
      this.setState({dontsubmit:false})   
      
  
    }
    else if(this.state.answerType!='yes_no')
    {
     if( (a3==undefined||a3=='') && (a4==undefined||a4=='') && (a5==undefined||a5=='') && (a6==undefined||a6==''))
      this.setState({dontsubmit:false})

      else if(a4==undefined || a5==undefined || a6==undefined){
        if(a4==undefined)
        a4=''
        if(a5==undefined)
          a5=''
         if(a6==undefined)
          a6=''
      }
       
      this.commonSubmit(a1, a2, a3, a4, a5, a6)
    }
    
    else {
      this.commonSubmit(a1, a2, a3, a4, a5, a6)
  
}
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

  

  render() {
    var { params } = this.props.navigation.state;
    const {navigate}=this.props.navigation;
    const { goBack } = this.props.navigation;
    if (!this.state.isConnected1) {
      return <MiniOfflineSign />;
    }
    return (
      <View style={{ flex: 1,backgroundColor:'white', paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,paddingLeft:20 }}>
 <View><TouchableOpacity><Icon name="chevron-with-circle-left" size={40} style={{paddingTop:10}}  onPress={()=>goBack() }/> 
 {/* navigate('PollMain')} /> */}
 </TouchableOpacity></View>
        <View style={{ flex: 50, padding: 20 }}>
          <Text style={{ paddingLeft: 5 }}> Type your answers </Text>
          {this.state.dontsubmit?null:<Text style={{ paddingLeft: 5 }}> atleast 3 answers mandatory / for yes or no 3 answers mandatory </Text>}
          {/* {this.state.secondAnswer?null:<Text style={{ paddingLeft: 5 }}> for yes or no 3 answers mandatory </Text>} */}
          <ScrollView style={{ padding: 5 }}>
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer1'
              placeholder='Option 1'
              onChangeText={(answer1)=>this._handleChange("answer1",answer1)}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={this.state.isEditText1}
              label='answer2'
              placeholder='Option 2'
              onChangeText={(answer2) => this._handleChange("answer2",answer2)}
            />
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={true}
              label='answer3'
              placeholder='Option 3'
              onChangeText={(answer3) => this._handleChange("answer3",answer3)}
            />
            {this.state.showothertext && this.state.isEdit?
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={this.state.isEdit}
              label='answer4'
              placeholder='Option 4'
              onChangeText={(answer4) => this._handleChange("answer4",answer4)}/> :null}
              {this.state.showothertext && this.state.isEdit?
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={this.state.isEdit}
              label='answer5'
              placeholder='Option 5'
              onChangeText={(answer5) => this._handleChange("answer5",answer5)}
            />:null}
            {this.state.showothertext && this.state.isEdit?
            <TextInput style={{ height: 40, backgroundColor: 'white', margin: 10 }}
              editable={this.state.isEdit}
              label='answer6'
              placeholder='Option 6'
              onChangeText={(answer6) => this._handleChange("answer6",answer6)}
            />:null}
          </ScrollView>

          <View style={{ flex:30,marginTop:20,paddingVertical:40,paddingHorizontal:30}}>

<TextInput style={{ height:60,padding:20,
 backgroundColor:'white',margin:20}}
     
     editable={true}
     label='hashTag'
     placeholder='Hash your Label'
     onChangeText={(hashTag)=>this.setState({hashTag})}
/>

</View>
        
        
                    </View>
          <View style={{ flex: 25,flexDirection:"row",paddingHorizontal:15,paddingVertical:30 }}>
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
            <DateTimePicker
              mode={'date'}
              format="YYYY-MM-DD"
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}

            />
            <DateTimePicker
              mode={'time'}
              isVisible={this.state.startDateTimePickerVisible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideStartDateTimePicker}

            />
            
          </View>
          {this.state.datePicked ? <Text style={{padding:30,color:'orange'}}> poll result will be publihed on {this.state.Poll_duration}</Text> : null}
            {/* {this.state.isLoading ? <View><ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : null} */}
        {/* </View> */}
        <View style={{ paddingVertical: 30, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <GradientButton
      style={{ marginVertical: 8 }}
      text="Submit"
      textSyle={{ fontSize: 5 }}      
      gradientBegin="#659B80"
      gradientEnd="#22764C"
      gradientDirection="diagonal"
      height={30}
      width={100}
      radius={0}
      impact
      impactStyle='Light'
      onPressAction={() => this.callAlert(this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.answer5, this.state.answer6)}
    >
    </GradientButton>
        </View>
      </View>



    );
  }
}
