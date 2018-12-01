import React from 'react';
import { View, Left, Input, Item, TextInput, Alert, TouchableHighlight ,Text} from 'react-native';
import { Container, Content, Form, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardComponent from './profile_CardItem';
import { ImagePicker, Permissions } from 'expo';
import firebase from '../../firebase/firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';
//import ProfileDetails from './ProfileDetails';
import UserDetails from './ProfileDetails';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      fontLoaded: false,
      name:''
    }

  }


  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={20} color={tintColor} />
    ),

  }
  async componentWillMount() {
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
      <View style={{ flex: 1}}>
        <UserDetails ref={'showDetails'}></UserDetails>
        <View style={containerStyle}>
          <TextInput
            placeholder="Search Poll in Profiles"
            style={searchTextStyle}
          />
          <Icon style={buttonStyle} name="search" size={20}
          />
        </View>


        <Content>
          <CardComponent />
          <View style={container}>
            <View style={buttonContainer}>
              <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }}><Text>Poll</Text></Button>
            </View>
            <View style={buttonContainer}>
              <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }}
                onPress={() => this.loginUser()}
              ><Text>Details</Text></Button>
            </View>
          </View>
         
        </Content>
        <View>

        </View>
      </View>
    );
  }
}




const style = {
  containerStyle: {
    flexDirection: 'row',
    marginTop: 30,
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
