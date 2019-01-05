import React from 'react';
import { View, Left, Input, Item, TextInput, Alert, TouchableHighlight, Text ,Platform,StatusBar,TouchableOpacity} from 'react-native';
import {  Container, Content, Form, Button, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import CardComponent from './profile_CardItem';
import { ImagePicker, Permissions } from 'expo';
import firebase from '../../firebase/firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';
//import ProfileDetails from './ProfileDetails';
import UserDetails from './ProfileDetails';
import ProfileDetailsScreen from './ProfieDetail1';
import ProfileFollow from './profile_Follow';
import DetailsScreen from './detailsCard';
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      fontLoaded: false,
      name: '',
      value:'',
      email:'',
      isMainUser:false,
      poll:true,
      details:'',
      activity:'',
      date: '',
      PickerValue: '',
      PickerValue1: '',
      country: '',
      about:'',
      realtionship:''
    }
    
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={20} color={tintColor} /> 
    ),
    header:null

  }
  async componentWillMount() {
    let paramfromOutput = this.props.navigation.state.params;
    try{
    this.setState({
      email:paramfromOutput.email
    })     
    }catch(err){
    
      this.setState({
        email:firebase.auth().currentUser.email
      })
      firebase.database().ref('users/').on('value', (data) => {
        var user = this.state.email;
        user = user.replace(/\./g, "_");
        var value = data.val();
        const dobVal = value[user].dob;
        var employment = value[user].employment;
        var gender = value[user].gender;
        var country = value[user].country;
        var name=value[user].name;
        var about=value[user].about;
        var relationship=value[user].relationship;
        this.setState({ date: dobVal });
        this.setState({ PickerValue: gender });
        this.setState({ PickerValue1: employment });
        this.setState({ name: name });
        this.setState({ country: country });
        this.setState({about:about});
        this.setState({relationship:relationship});
    })
    }
    
   
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  loginUser() {
    this.refs.showDetails.showModal();

  }
  editUser() {
    this.refs.addDetails.showModal();
}
  componentDidMount(){
    var currentUser=firebase.auth().currentUser.email
    if(this.state.email.replace(/\./g, "_") == currentUser.replace(/\./g, "_")){

        this.setState({
            isMainUser:true
        })
    }
  }
  __setPage(page){

    switch (page) {
      case 'poll':
        this.setState({
          poll:true,
          details:false,
          activity:false
        })
        console.log('poll')
        break;
        case 'details':
        this.setState({
          poll:false,
          details:true,
          activity:false
        })
        console.log('details')
        break;

        case 'activity':
        this.setState({
          poll:false,
          details:false,
          activity:true
        })
        console.log('activity')
        break;
    
      default:
      this.setState({
        poll:true,
        details:false,
        activity:false
      })
        break;
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      containerStyle,
      searchTextStyle,
      buttonStyle,
      naviBar,
      buttonContainer,
      container
    } = style;
    return (
      <View style={{ flex: 1 }}>
        <Content style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10}}>
          <CardComponent email={this.state.email}/>
          <View style={container}>
            <View style={buttonContainer}>
            <TouchableOpacity>
              <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }}
              onPress={() =>this.__setPage('poll')}
              ><Text>Poll <Icon name="chevron-down" size={20} style={{marginTop:10,justifyContent:'center'}}/></Text></Button>
              </TouchableOpacity>
            </View>
            <View style={buttonContainer}>
            <TouchableOpacity>
              <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }}
                onPress={() =>this.__setPage('details')}
              ><Text>Details <Icon name="chevron-right" size={20} style={{marginTop:10,justifyContent:'center'}}/></Text></Button>
            </TouchableOpacity>
            </View>
            <View style={buttonContainer}>
            <TouchableOpacity>
              <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }}
                onPress={() =>this.__setPage('activity')}
              ><Text>Activity <Icon name="chevron-right" size={20} style={{marginTop:10,justifyContent:'center'}}/></Text></Button>
            </TouchableOpacity>
            </View>
          </View>
          {this.state.poll?
          <View style={containerStyle}>
          <TextInput
            placeholder="Search Poll in Profiles"
            style={searchTextStyle}
          />
          <Icon style={buttonStyle} name="magnifying-glass" size={20}
          />
        </View>
        :null}
            {this.state.details ?
            <View>
              <DetailsScreen about={this.state.about} date={this.state.date} PickerValue1={this.state.PickerValue1}
              relationship={this.state.relationship} PickerValue={this.state.PickerValue} country={this.state.country}/>
            <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>About:</Text>
                <Text>     {this.state.about}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Date of Birth:</Text>
                <Text>     {this.state.date}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Gender:</Text>
                <Text>     {this.state.PickerValue1}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Relationship:</Text>
                <Text>     {this.state.relationship}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Employment:</Text>
                <Text>     {this.state.PickerValue}</Text>
            </CardItem>
        </Card>
        <Card>
            <CardItem>

                <Text>Country:</Text>
                <Text>     {this.state.country}</Text>

            </CardItem>

        </Card>
        </View>
        :null}




        </Content>
        <View>

         </View>
        {this.state.isMainUser ? null:
        <ProfileFollow email={this.state.email}/>}
      </View>
    );
  }
}




const style = {
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  naviBar: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    position: 'absolute',
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextStyle: {
    flex: 1
  },
  buttonStyle: {
    height: 30,
    marginBottom: 8
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0
  },
  buttonContainer: {
    flex: 1,
  }
}



const NavigationProfile= StackNavigator({
  ProfilePoll:{screen: ProfileScreen},
 //ProfileDetails:{screen:ProfileDetailsScreen},
});
//export default HomeSwiper;
export default NavigationProfile;