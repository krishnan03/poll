import React from 'react';
// import App from react-NativeEventsReceiver;
import { Text,TextInput, View,CheckBox,StyleSheet,ToastAndroid,Picker,Button,AppRegistry,Alert,KeyboardAvoidingView,Platform,
  StatusBar,ActivityIndicator,NetInfo,Dimensions } from 'react-native';
import { Input } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView, Directions } from 'react-native-gesture-handler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import {ImagePicker,Permissions} from 'expo';
import {StackNavigator} from 'react-navigation';
import { NativeEventsReceiver } from 'react-native-navigation/lib/dist/adapters/NativeEventsReceiver';
import AnswerPoll from './answerPoll';
import Icon from 'react-native-vector-icons/Entypo';
import firebase from '../../firebase/firebase'
import GradientButton from 'react-native-gradient-buttons';
import MiniOfflineSign from '../../components/offlinePage'
import offlineHelper from '../../components/offlineHelperFunction';
import HandleBack from '../../components/HandleBack';

/* declaring answer types */
// var AnswerType = [ {label: "Yes/No", value: "Yes or No"}, {label: "Any Choice ", value: "multi_choice"},{label: "Multiple Check ", value: "multi_check"}];


 class PollUpdScreen extends React.Component 
{
  static navigationOptions={title:'Poll',
  tabBarIcon:({tintColor})=>(
    <Icon name="publish" size={20} color={ tintColor } />
    ),
    header:null
  };
  
  constructor(props) {
    super(props);
  
    this.state={
      //data:['MultiChoice','Multiple Answers'],
      checked:0,
      check:false,answerPickerValue:'',anonymousFlag:'',question_Poll:'', isConnected1: true,
      private_Flag:'',privateCheck:false,anonymousCheck:false,pollValueScreen1:'',answerPickerValue:'',imageSelected:false,isLoading:false,
      answerPickerValue:'yes_no',categoryPickerValue:'general',isPollEntered:true,timestamp:'',tempTime:'',editing: false,
    }
  }

  // state = {
  //   editing: false,

  // };

  componentDidMount() {
   offlineHelper.whenDidMount(this.handleConnectivityChange)
   var date = new Date();
   var t=(this.state.timestamp.toString())
   this.setState({timestamp:date.getTime()})
   console.log("timestamp inside poll"+t)
    
  }

  componentWillUnmount() {
   offlineHelper.whenUnmount(this.handleConnectivityChange)
  }

  handleConnectivityChange = isConnected1 => {
    if (isConnected1) {
      this.setState({ isConnected1 });
    } else {
      this.setState({ isConnected1 });
    }
  };

  toAnonymousCheck(){
    this.setState({
      anonymousCheck:!this.state.anonymousCheck      
    })
  }     
  toPrivateCheck(){
   
    this.setState({
      privateCheck:!this.state.privateCheck,
    })
  }
  
  onBack = () => {
    console.log("inside OnBack  "+this.state.editing)
    if (this.state.editing) {
      Alert.alert(
        "You're still editing!",
        "Are you sure you want to go home with your edits not saved?",
        [
          { text: "Keep Editing", onPress: () => {}, style: "cancel" },
          { text: "Go Home", onPress: () => this.props.navigation.goBack() },
        ],
        { cancelable: false },
      );
      return true;
    }
  
    return false;
  };

  validateNext(){
    const {navigate} = this.props.navigation;
    const { editing } = this.state;
    this.setState({ editing: !editing }) 
  console.log("inside validateNext  "+this.state.editing)
    let pollValueScreen1={
      private_Flag:this.state.privateCheck,
      anonymous_Flag:this.state.anonymousCheck,
      question_Poll:this.state.questionPoll,
      category:this.state.categoryPickerValue,   
      answerType:this.state.answerPickerValue,
      timestamp:this.state.timestamp,
      // hash_Tag:this.state.hashTag
    }
    if(this.state.questionPoll==undefined||this.state.questionPoll==''){
    this.setState({
      isPollEntered:false
    })
    }
    else{
    navigate('AnswerMain',pollValueScreen1)
    console.log(this.state.answerPickerValue)
    console.log(this.state.questionPoll)
  }
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
  }
  onChooseImagePress=async()=>{
    // console.log("timestamp before url"+tempTime)
    this.setState({
      isLoading:true
    
        })
    // var user ='users/'+(firebase.auth().currentUser.email);
      // this.setState({}) 
      // var timestamp = date.getTime()
      //(this.state.timestamp.toString())+'/'+
    var user ='poll/Poll_question/'+'shanvigneshittce@gmail.com/'+ (this.state.timestamp.toString());
    console.log("timestamp and url"+user)
    user=user.replace(".","_") 
    let result= await ImagePicker.launchImageLibraryAsync();
   
    if(!result.cancelled){
      this.uploadImage(result.uri,user)
        .then(()=>{
          this.setState({
            imageSelected:true,
            isLoading:false
          })
          Alert.alert("Image Added");

        }).catch((error)=>{
          Alert.alert(error);
        });
    }
    if(result.cancelled){
      this.setState({
        isLoading:false
      })
    }
  }
  
    uploadImage=async(uri,imageName)=>{
      const response=await fetch(uri);
      const blob=await response.blob();
  var ref=firebase.storage().ref().child("images/" + imageName);
  return ref.put(blob);
    }
    render() {
        
      
          if (!this.state.isConnected1) {
            return <MiniOfflineSign />;
          }
          else{
        return (
          <HandleBack onBack={this.onBack}>
          <View style={{ flex:1,marginTop:0,backgroundColor:"white",paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
            <View style={{ flex:20,flexDirection:"row",paddingLeft:30,paddingTop:10,paddingRight:40}}>
                <View style={{flex:50,flexDirection:"row",justifyContent:"flex-start"}}> 
                <CheckBox value={this.state.anonymousCheck} onChange={()=> this.toAnonymousCheck()}/>
                <Text style={{paddingTop:6}}>Poll as Anonymous</Text>
                </View>
                <View style={{flex:50,flexDirection:"row",justifyContent:"flex-end"}}> 
                <CheckBox  value={this.state.privateCheck} onChange={()=> this.toPrivateCheck()}/>
                <Text style={{paddingTop:6}}>Private</Text>
                </View>
            </View>
            
             <View style={{ flex:50,padding:15}}>
             {this.state.isPollEntered?null:<Text style={{padding:20}}>Please enter poll</Text>}
                    <TextInput style={{ height:100,justifyContent:'center',margin:20,padding:20,
                            borderWidth:1,backgroundColor:'white',borderRadius:15}}
                                multiline={true}
                                // numberOfLines={3}
                                autoFocus={true}
                                editable={true}
                                label='questionPoll'
                                placeholder='write your poll'
                                onChangeText={(questionPoll)=>this.setState({questionPoll})}
                                //onFocus={() => this._onFocus()}
                    />
             </View>
             <View style={{paddingVertical:20,paddingHorizontal:50,alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
        <Text> Select Category Type </Text>
          <Picker style={{width:'50%'}}
		                              selectedValue={this.state.categoryPickerValue}
	                              	onValueChange={(itemValue,itemIndex) => this.setState({categoryPickerValue:itemValue})}
	                          	>
		                                  
                                      {/* <Picker.Item label="Category Of Poll" /> */}
                                      <Picker.Item label="Genral" value="General"/>
		                                  <Picker.Item label="Animal" value="Animal"/>
<Picker.Item label="Art" value="Art"/>
<Picker.Item label="Comics" value="Comics"/>
<Picker.Item label="Dance" value="Dance"/>
<Picker.Item label="Fitness" value="Fitness"/>
<Picker.Item label="Food" value="Food"/>
<Picker.Item label="Humor" value="Humor"/>
<Picker.Item label="TV & Movie" value="TV & Movie"/>
<Picker.Item label="Music" value="Music"/>
<Picker.Item label="Politics" value="Politics"/>
<Picker.Item label="Science & Tech" value="Science & Tech"/>
<Picker.Item label="Sports" value="Sports"/>
<Picker.Item label="Travel" value="Travel" />
		                        </Picker>
                        
                    </View>
            <View style={{flex:100}}>
            <View style={{paddingVertical:20,paddingHorizontal:50,alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
            {this.state.imageSelected ? <Text> Image Added</Text> : <Text>Upload Image</Text>}
            {this.state.isLoading ? <View>
        <ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : null}
            <Icon name="camera" size={30} color='#C7B8B1' onPress={this.onChooseImagePress}/></View>
            <View style={{paddingVertical:20,paddingHorizontal:50,alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
        <Text> Select Answer Type </Text>
                            <Picker
		                              style={{width:'50%'}}
		                              selectedValue={this.state.answerPickerValue}
	                              	onValueChange={(itemValue,itemIndex) => this.setState({answerPickerValue:itemValue})}
	                          	>
		                                  
		                                  {/* <Picker.Item label="Answer Type" /> */}
		                                  <Picker.Item label="Yes-No" value="yes_no"/>
                                      <Picker.Item label="Choice" value="Choice" />
		                                  <Picker.Item label="multiple" value="multi answer"/>
		                        </Picker>
                        
                    </View>
             
                  </View>
                  
                   
                <View style={{padding:30,alignItems: 'flex-end',justifyContent:'flex-start'}}>

                 
                  <GradientButton
      style={{ marginVertical: 8 }}
      text="NEXT"
      textSyle={{ fontSize: 5 }}      
      gradientBegin="#659B80"
      gradientEnd="#22764C"
      gradientDirection="diagonal"
      height={30}
      width={100}
      radius={0}
      impact
      impactStyle='Light'
      onPressAction={()=> this.validateNext()}
    >
    </GradientButton>
                  </View>
              
             
            
              </View>
       
              </HandleBack>     
        );}
      }
}


const NavigationPoll= StackNavigator({
  PollMain:{screen: PollUpdScreen},
  AnswerMain:{screen: AnswerPoll},
});


const styles = StyleSheet.create({
  containerRadio: {
    paddingVertical:50,
    marginTop:10,
    marginLeft:15,
    // flex: 1,
    justifyContent: 'center'

    // backgroundColor: '#F5FCFF',
  }
});


 export default NavigationPoll;