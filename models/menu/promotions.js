import React from 'react';
import { Text, View, StyleSheet, TextInput, COLORS, Alert,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'native-base';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';

export default class PromotionsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      ({
        about: '',
        reason: '',
        number:'',
        isloading:false
      })
  }
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    ),
    title: 'Promotions'
  }
  async componentWillMount() {
    
  }
  onChooseImagePress = async () => {
    //to upload status
    this.setState({ isloading: true });
    var user = firebase.auth().currentUser.email.replace(".", "_")
    firebase.database().ref('admin/Promotions/'+user).on('value', (data) => {
     if(data){
        firebase.database().ref('admin/Promotions/'+user).update(
          {
            message: 'I need Promotion to leverage my business',
            about:this.state.about,
            reason:this.state.reason,
            contact_number:this.state.number
          }
        ).then(() => {
          Alert.alert('Request Submitted')
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
          <Text style={{fontStyle:'italic',justifyContent:'center'}}>**Poller Promotion will help you to leverage your business across the world**</Text>
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.textArea}
            underlineColorAndroid="transparent"
            placeholder="Give a Intro About Yourself"
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
            placeholder="Purpose of need"
            placeholderTextColor="grey"
            numberOfLines={2}
            multiline={true}
            onChangeText={(reason) => this.setState({ reason })}
          />
        </View>
        <View style={style.textAreaContainer} >
          <TextInput
            style={style.linkArea}
            underlineColorAndroid="transparent"
            placeholder="Contact Number with Country code"
            placeholderTextColor="grey"
            numberOfLines={1}
            multiline={true}
            onChangeText={(number) => this.setState({ number })}
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
        <View style={{marginBottom:10,marginTop:50}}>
          <Text style={{fontStyle:'italic',justifyContent:'center'}}>**Our Business Team will get in touch with you for further proceedings**</Text>
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
