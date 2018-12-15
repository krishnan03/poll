import React from 'react';
import { Text, View, StyleSheet, TextInput, COLORS, Alert,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'native-base';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';

export default class BugScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      ({
        feedback: '',
        about:'',
        type:'',
        number:'',
        isloading:false
      })
  }
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    ),
    title: 'Bugs/Feature enhancements'
  }
  async componentWillMount() {
    
  }
  onChooseImagePress = async () => {
    //to upload status
    this.setState({ isloading: true });
    var user = firebase.auth().currentUser.email.replace(".", "_")
    firebase.database().ref('admin/Bugs/'+user).on('value', (data) => {
     if(data){
        firebase.database().ref('admin/Bugs/'+user).update(
          {
            feedback: this.state.feedback,
            type:this.state.type,
            about:this.state.about,
            contact_number:this.state.number
          }
        ).then(() => {
          
          Alert.alert('Thanks for your Feedback!')
          this.setState({ isloading: false });
        }).catch((error) => {
          alert(error);
        });
      }
    })
  }
  
  render() {
    return (
    
      
      <ScrollView>
       
      <View>
        <View style={{marginBottom:10,padding:10}}>
          <Text style={{fontStyle:'italic',justifyContent:'center'}}>**Poller is a Recorder of People's opinion, Help us to make it better**</Text>
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.textArea}
            underlineColorAndroid="transparent"
            placeholder="Description"
            placeholderTextColor="grey"
            numberOfLines={30}
            multiline={true}
            onChangeText={(feedback) => this.setState({ feedback })}
          />
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.linkArea}
            underlineColorAndroid="transparent"
            placeholder="Bug/Feature Enhancement"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={(type) => this.setState({ type })}
          />
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.linkArea}
            underlineColorAndroid="transparent"
            placeholder="About You (optional)"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={(about) => this.setState({ about })}
          />
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.linkArea}
            underlineColorAndroid="transparent"
            placeholder="Contact Number with country code"
            placeholderTextColor="grey"
            numberOfLines={3}
            multiline={true}
            onChangeText={(number) => this.setState({ number })}
          />
        </View>
        <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ textDecorationLine: 'underline' }} onPress={this.onChooseImagePress}>Submit</Text>
        </View>
        {
        this.state.isloading ? <View>
        <ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : null
        }
        <View style={{marginBottom:10,marginTop:25}}>
          <Text style={{fontStyle:'italic',justifyContent:'center'}}>**Please provide valid contact number which is having bank account, Every valid bug will be rewarded depends upon severity which will be sent to your account.**</Text>
        </View>
      </View>
    </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    borderRadius: 25,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    padding: 10
  },
  linkArea: {
    height: 40,
    justifyContent: "flex-start",
    padding: 10
  },
  footerStyle:{
    position: 'absolute',
    bottom: 0,
  }
})
