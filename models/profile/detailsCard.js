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

export class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
    
  }
  
  
  async componentWillMount() {
   
    }
    
  
 
  componentDidMount(){
    
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
    return (<View>
    <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>About:</Text>
                <Text>     {this.props.about}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Date of Birth:</Text>
                <Text>     {this.props.date}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Gender:</Text>
                <Text>     {this.props.PickerValue1}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Relationship:</Text>
                <Text>     {this.props.relationship}</Text>
            </CardItem>
        </Card>
        <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
            <CardItem>
                <Text>Employment:</Text>
                <Text>     {this.props.PickerValue}</Text>
            </CardItem>
        </Card>
        <Card>
            <CardItem>

                <Text>Country:</Text>
                <Text>     {this.props.country}</Text>

            </CardItem>

        </Card>
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
