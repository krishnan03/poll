import React from 'react';
import { Text, View, StyleSheet, TextInput, COLORS, Alert ,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'native-base';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';
import email from 'react-native-email';

export default class VerifyProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      ({
        about: '',
        link: '',
        status: '',
        isloading:false

      })
  }
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    ),
    title: 'Be Verified'
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    var user = firebase.auth().currentUser.email;
    user = user.replace(".", "_");
    firebase.database().ref('users/' + user).on('value', (data) => {
      var value = data.val();
      const status = value['Verification'].status;
      this.setState({ status: status });
    })
  }
  onChooseImagePress = async () => {
    //to upload status
    this.setState({ isloading: true });
    var user = 'users/' + (firebase.auth().currentUser.email);
    user = user + '/Verification'
    user = user.replace(".", "_")
    firebase.database().ref(user).update(
      {
        about: this.state.about,
        link: this.state.link,
      }
    ).then(() => {
    }).catch((error) => {
      alert(error);
    });
    //to upload document
    var user = 'users/' + (firebase.auth().currentUser.email);
    user = user.replace(".", "_")
    user = user + '_verify_doc'
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, user)
        .then(() => {
          Alert.alert("Document uploaded successfully");
          this.setState({ isloading: false });
        }).catch((error) => {
          Alert.alert(error);
        });
    }
    //to send email after submitting document
    var user = firebase.auth().currentUser.email.replace(".", "_")
    firebase.database().ref('admin/Verification/'+user).on('value', (data) => {
     if(data){
        firebase.database().ref('admin/Verification/'+user).update(
          {
            message: 'Please verify my profile',

          }
        ).then(() => {
        }).catch((error) => {
          alert(error);
        });
      }
      else{
        firebase.database().ref('admin/Verification/'+user).set(
          {
            message: 'Please verify my profile',

          }
        ).then(() => {
        }).catch((error) => {
          alert(error);
        });
      }
    })
  }
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/verifydoc/" + imageName);
    return ref.put(blob);
  }
  userDetails(about, link) {
    var user = 'users/' + (firebase.auth().currentUser.email);
    user = user + '/Verification'
    user = user.replace(".", "_")
    firebase.database().ref(user).update(
      {
        about: about,
        link: link,
      }
    ).then(() => {
    }).catch((error) => {
      alert(error);
    });

  }

  handleEmail = (user) => {
  
}
  render() {
    return (
      <View>
        <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ borderBottomWidth: 2, borderBottomColor: 'green' }}>Status: {this.state.status}</Text>
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
            placeholder="Paste your FB/Twitter profile link"
            placeholderTextColor="grey"
            numberOfLines={2}
            multiline={true}
            onChangeText={(link) => this.setState({ link })}
          />
        </View>
        <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ textDecorationLine: 'underline' }} onPress={this.onChooseImagePress}>Upload Government Proof & submit</Text>
          <Icon name="add-to-list" size={20} onPress={this.onChooseImagePress} />
          {
        this.state.isloading ? <View>
        <ActivityIndicator size='large' color='#330066' animating/>
      </View>
      : <Text></Text>
        }
        </View>
        <View style={{marginBottom:10,marginTop:150}}>
          <Text style={{fontStyle:'italic',justifyContent:'center'}}>**Verification will take 2 working days to get Update, On successful verification you will receive mail from us**</Text>
        </View>
      </View>
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