import React from 'react';
import { View, Left, Input, Item, TextInput, Alert, TouchableHighlight, Text } from 'react-native';
import { Container, Content, Form, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

import { ImagePicker, Permissions } from 'expo';
import firebase from '../../firebase/firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ProfileScreen from '../profile/profile';


export default class showProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      fontLoaded: false,
      name: ''
    }

  }
  static navigationOptions = {
    title: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={20} color={tintColor} />
    )
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
       


        <Content>
          <ProfileScreen />
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


