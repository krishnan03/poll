import React from 'react';
// import App from react-NativeEventsReceiver;
import { Text,TextInput, View,CheckBox,StyleSheet,ToastAndroid,Picker,Button,AppRegistry } from 'react-native';
import { Input } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView, Directions } from 'react-native-gesture-handler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import {StackNavigator} from 'react-navigation';
import { NativeEventsReceiver } from 'react-native-navigation/lib/dist/adapters/NativeEventsReceiver';
import AnswerPoll from './answerPoll';
import Icon from 'react-native-vector-icons/Entypo';

/* declaring answer types */
// var AnswerType = [ {label: "Yes/No", value: "Yes or No"}, {label: "Any Choice ", value: "multi_choice"},{label: "Multiple Check ", value: "multi_check"}];

 class PollUpdScreen extends React.Component 
{
  static navigationOptions={title:'Poll',
  tabBarIcon:({tintColor})=>(
    <Icon name="publish" size={20} color={ tintColor } />
    )
  };
  
  constructor(props) {
    super(props);
    this.state={
      //data:['MultiChoice','Multiple Answers'],
      checked:0,
      check:false,PickerValue:''
    }
  }
  toAnonymousCheck(){
    this.setState({
      anonymousCheck:!this.state.anonymousCheck      
    })
  }
  toPrivateCheck(){
    this.setState({
      privateCheck:!this.state.privateCheck
    })
  }
  toMultiCheckAnswers(){
    this.setState({
      multiCheckAns:!this.state.multiCheckAns
    })
  }
    render() {

      var {navigate} = this.props.navigation;
          // let selectedButton = this.state.data.find(e => e.selected == true);
          // selectedButton = selectedButton ? selectedButton.value : this.state.data[0].value;

          // let category={
          // categoryVal: selectedButton,
          // };
        return (
    
          <View style={{ flex:1,marginTop:20,backgroundColor:"#91C4E1" }}>
            <View style={{ flex:5,flexDirection:"row",paddingLeft:15,paddingTop:5,paddingRight:15}}>
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
                    <TextInput style={{ height:100,justifyContent:'center',margin:20,padding:20,
                            borderWidth:0.5,backgroundColor:'white',borderRadius:15}}
                                multiline={true}
                                editable={true}
                                label='questionPoll'
                                placeholder='write your poll'
                                onChangeText={(questionPoll)=>this.setState({questionPoll})}
                    />
                    <View style={{ padding:10,
                            margin:1,justifyContent:'center',flexDirection:"row"}}>
                   <Text style={{ padding:20}}> Category Of Poll </Text>
                    
                   
                            <Picker
		                              style={{width:'50%'}}
		                              selectedValue={this.state.PickerValue}
	                              	onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
	                          	>
		                                  
		                                  <Picker.Item label="Sports" value="Sports" />
		                                  <Picker.Item label="movie" value="movie"/>
                                      <Picker.Item label="tv" value="tv" />
		                                  <Picker.Item label="science" value="science"/>
		                        </Picker>
                        
                    </View>
                    <View style={{ padding:15,
                            margin:1,justifyContent:'center',flexDirection:"row"}}>
                   <Text style={{ padding:20}}> Answer Type </Text>
                    
                   
                            <Picker
		                              style={{width:'50%'}}
		                              selectedValue={this.state.PickerValue}
	                              	onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
	                          	>
		                                  
		                                  <Picker.Item label="Yes/No" value="Yes/No" />
		                                  <Picker.Item label="Any Choice" value="Choice"/>
                                      <Picker.Item label="multi Select ANswers" value="multi_select" />
		                                  
		                        </Picker>
                        
                    </View>
             </View>
             
             <View style={{ flex:30,padding:15}}>

             <TextInput style={{ height:40,
                            backgroundColor:'white',margin:20}}
                                
                                editable={true}
                                label='hashTag'
                                placeholder='Hash your Label'
                                onChangeText={(hashTag)=>this.setState({hashTag})}
                    />
              
             
              
                <View style={{padding:30,alignItems: 'flex-end',justifyContent:'flex-start'}}>
                  <Button  /*style ={styles.container_button}*/
                    title="NEXT-"
                    //onPress={()=> navigate('AnswerMain',this.state.hashTag)} 
                    onPress={()=> navigate('AnswerMain')}
                  >
                  <Text style={{color:'white'}}> Next </Text>
                  </Button>
                  </View>
                  </View>
              
             
            
          </View>
    
        );
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

// var pollnavi=StackNavigator({
//   question:{screen: PollUpdScreen},
//   answer: {screen: answerPoll}
// })
 export default NavigationPoll;