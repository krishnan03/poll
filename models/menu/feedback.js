import React from 'react';
import { Text, View, StyleSheet, TextInput, COLORS, Alert,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'native-base';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';

export default class FeedBackScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      ({
        feedback: '',
        about:'',
        isloading:false
      })
  }
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    ),
    title: 'Feedback'
  }
  async componentWillMount() {
    
  }
  onChooseImagePress = async () => {
    //to upload status
    this.setState({ isloading: true });
    var user = firebase.auth().currentUser.email.replace(".", "_")
    firebase.database().ref('admin/Feedbacks/'+user).on('value', (data) => {
     if(data){
        firebase.database().ref('admin/Feedbacks/'+user).update(
          {
            feedback: this.state.feedback,
            about:this.state.about
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
          <Text style={{fontStyle:'italic',justifyContent:'center'}}>**Poller is a Recorder of People's opinion, Your valuable feedback will help everyone for betterment**</Text>
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.textArea}
            underlineColorAndroid="transparent"
            placeholder="Feedback"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={(feedback) => this.setState({ feedback })}
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
        <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ textDecorationLine: 'underline' }} onPress={this.onChooseImagePress}>Submit</Text>
          {
        this.state.isloading ? <View>
        <ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : <Text></Text>
        }
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
