import React, { Component, View } from 'react';
import {
  Container, Text, Content,
  Card, CardItem, Thumbnail, Body, Left, Right,
  Button
} from 'native-base';
import { Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';
import renderIf from './renderif';
export default class CardComponent extends Component {
  constructor(props) {
    super(props)
    
    var downoadUrl = ''
    this.state = {
      dp: null,
      name: '',
      verified: false,
      color: null,
      email:this.props.email,
      followerCount:'',
      followingCount:''
    }
   
    
   
  }

  async componentWillMount() {
    
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    firebase.database().ref('users/').on('value', (data) => {
      var user = this.state.email;
      user = user.replace(/\./g, "_");
      var value = data.val();
      const name = value[user].name;
      this.setState({ name: name });
    })
    this.getImage()
    var user = 'users/' + this.state.email;
    user = user.replace(/\./g, "_")
    firebase.database().ref(user).on('value', (data) => {
      var value = data.val();
      const status = value['Verification'].status;
      if (status == 'Not verified') {
        this.setState({ verified: false });
      } else if (status == 'Verified') {
        this.setState({ color: 'green' }),
          this.setState({ verified: true });
      }
      const followerCount = value['Follow']['followers'].count;
     this.setState({followerCount: followerCount});
     const followingCount = value['Follow']['following'].count;
     this.setState({followingCount: followingCount});
    })
    
  }


  getImage() {
    let { state } = this
    var user = 'users/' + this.state.email;
    user = user.replace(/\./g, "_")
    firebase.storage().ref().child(`images/${user}`).getDownloadURL().then((url) => {
      if (url != null) {
        this.setState({
          dp: url,
        });
      }
      else {

      }
    }).catch(function (e) {

    })
  }



  onChooseImagePress = async () => {
    var user = 'users/' + this.state.email;
    user = user.replace(/\./g, "_")
    //  let result= await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, user)
        .then(() => {
          Alert.alert("Image uploaded successfully");

        }).catch((error) => {
          Alert.alert(error);
        });
    }
  }
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }
  render() {
    return <Card>
      <CardItem>
        <Left>
          {this.state.dp ? <Thumbnail
            source={{ uri: this.state.dp }}
          /> : <Thumbnail
              source={require('../../assets/unknown.png')}
            />}
          <Icon name="ios-camera" size={20} style={{ alignSelf: 'flex-end' }} onPress={this.onChooseImagePress} />
          <Body style={{ justifyContent: 'space-between' }}>
            <Text style={{ borderBottomWidth: 2, borderBottomColor: this.state.verified === true ? 'green' : null }}>{this.state.name} {renderIf(this.state.verified,
              <Thumbnail style={style.thumbIcon} source={require('../../assets/verify.png')} />
            )}</Text>
            <Text note>     Total Poll Posted:</Text>
            <Text note>     Total Poll Voted:</Text>
          </Body>
        </Left>
      </CardItem>

      <CardItem style={{flexDirection : 'row', justifyContent:'space-between'}}>
                <Left>
                   <Text note> {this.state.followingCount} Following</Text>
                </Left>
                <Right>
                   <Text note> {this.state.followerCount} Followers</Text>
                </Right>
        </CardItem>
    </Card>
  }
}


const style = {
  thumbIcon: {
    width: 40, height: 40,
    justifyContent: 'space-between'
  },

}