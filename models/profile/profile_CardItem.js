import React, { Component } from 'react';
import {
    Container, Text, Content,
    Card, CardItem, Thumbnail, Body, Left, Right,
    Button
} from 'native-base';
import { Image,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../firebase/firebase';
import {ImagePicker,Permissions} from 'expo';
export default class CardComponent extends Component {
  constructor () {
    super()

    var downoadUrl=''
    this.state = {
      dp: null,
      name:''
    }

    this.getImage()
  }

  async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      firebase.database().ref('users/').on('value', (data) => {
        var user = firebase.auth().currentUser.email;
        user = user.replace(".", "_");
        var value = data.val();
        const name = value[user].name;
        this.setState({ name: name });
    })
    }


  getImage () {
    let { state } = this
    var user ='users/'+(firebase.auth().currentUser.email);
    user=user.replace(".","_")
    firebase.storage().ref().child(`images/${user}`).getDownloadURL().then((url) => {
      this.setState({
        dp:url,
      });
    }).catch(function(e){

    })
  }

  onChooseImagePress=async()=>{
    var user ='users/'+(firebase.auth().currentUser.email);
    user=user.replace(".","_")
  //  let result= await ImagePicker.launchCameraAsync();
    let result= await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled){
      this.uploadImage(result.uri,user)
        .then(()=>{
          Alert.alert("Image uploaded successfully");

        }).catch((error)=>{
          Alert.alert(error);
        });
    }
  }
    uploadImage=async(uri,imageName)=>{
      const response=await fetch(uri);
      const blob=await response.blob();
  var ref=firebase.storage().ref().child("images/" + imageName);
  return ref.put(blob);
    }
    render() {
        return <Card>
          <CardItem>
             <Left>
               <Thumbnail
  source={{uri: this.state.dp}}
/>
<Icon name="ios-camera" size={20} style={{alignSelf: 'flex-end'}} onPress={this.onChooseImagePress}/>
                 <Body>
                   <Text>{this.state.name}</Text>
                     <Text note>     Total Poll Posted:</Text>
                     <Text note>     Total Poll Voted:</Text>
                 </Body>
             </Left>
         </CardItem>
        </Card>
    }
}
