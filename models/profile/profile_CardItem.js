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
      followingCount:'',
      pollPosted:''
    }
   
    
   
  }

  async componentWillMount() {
    if(this.state.email != null && this.state.email != ''){
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
    })

    firebase.database().ref(user + '/Poll').on('value', (data) => {
      this.setState({pollPosted: this.getAlphaNumericalCount(data.numChildren()-1)});
    })
    firebase.database().ref(user + '/Follow/followers').on('value', (data) => {
      this.setState({followerCount: this.getAlphaNumericalCount(data.numChildren()-1)});
    })
    firebase.database().ref(user + '/Follow/following').on('value', (data) => {
      this.setState({followingCount: this.getAlphaNumericalCount(data.numChildren()-1)});
    })
    // firebase.database().ref(user + '/Follow/followers').on('value', (data) => {
    //   this.setState({followerCount: this.getAlphaNumericalCount(data.val().count)});
    // })
    // firebase.database().ref(user + '/Follow/following').on('value', (data) => {
    //   this.setState({followingCount: this.getAlphaNumericalCount(data.val().count)});
    // })
  }
  }

  getAlphaNumericalCount(count) {
    var alphaNumCount = '';
    if(count < 1000)
    {
      alphaNumCount = count;
    }
    else if(count >= 1000 && count < 1000000)
    {
      alphaNumCount = this.getCount(count, 1000, 'K');
    }
    else if(count >= 1000000 && count < 100000000)
    {
      alphaNumCount = this.getCount(count, 1000000, 'M');
    }
    else if(count >= 100000000)
    {
      alphaNumCount = this.getCount(count, 100000000, 'B');
    }
    return alphaNumCount;
  }

  //getCount() function is used to get the alphanumerical count from a numberical count
  //For example, 12000 is returned to 12K, 89999 is returned to 89K+
  //Input Parameters : 
  //                   count-numerical count, 
  //                   target-1000(thousand), 10,00,000(10 lakhs), 10,00,00,000(10 Crores)
  //                   alpha-K(thousand), M(million), B(billion)
  //Output: Alphanumerical String
  getCount(count, target, alpha)
  {
    // alphaNumCount = alphaNumCount + Math.floor(count/1000000) + 'M';
    // if(count > 1000000)
    // {
    //   alphaNumCount = alphaNumCount + '+';
    // }

    var alphaNumCount = Math.floor(count/target) + alpha;
    if((count%target) !== 0)
    {
      alphaNumCount = alphaNumCount + '+';
    }
    return alphaNumCount;
  }


componentDidMount(){
 
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
            <Text note>     Total Poll Posted: {this.state.pollPosted}</Text>
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