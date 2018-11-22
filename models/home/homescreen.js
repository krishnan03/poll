import React from 'react';
import { Text, View,Image,Button,Platform} from 'react-native';
import { TabNavigator } from 'react-navigation';
import PollScreen from '../poll/poll';
import ProfileScreen from '../profile/profile';
import ResultScreen from '../results/results';
import SearchScreen from '../search/search';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserDetailsModal from '../userDetailsModal';
import firebase from '../../firebase/firebase';
import Drawer from '../drawer'
//import Settings from '../settings/settings'
//import tempscreen from '../settings/tempscreen'
class HomeScreen extends React.Component {

  static navigationOptions={
    tabBarIcon:({tintColor})=>(
    <Icon name="home" size={20} color={ tintColor } />
  ),
        title: "Digital Poll",
        headerRight: <Icon size={20}
        name={Platform.OS === 'ios' ?
                'question-circle' : 'question-circle'}
        style={{ paddingRight: 10 }} />
  }
  componentDidMount() {
    //var user = firebase.auth().currentUser.email;
    firebase.database().ref('users/').on('value', (data) => {
      var user = firebase.auth().currentUser.email;
      user = user.replace(".", "_");
      var value = data.val();
      const dobVal = value[user].dob;
      if(dobVal == ""){
        this.refs.addDetails.showModal();
      }
  })
    
 
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <UserDetailsModal ref={'addDetails'}></UserDetailsModal>
      </View>
    );
  }
}




var MainScreenNavigator=TabNavigator({
  Home:{screen: HomeScreen},
  Search:{screen: SearchScreen},
  Poll:{screen: PollScreen},
  Result:{screen: ResultScreen},
  Profile:{screen: ProfileScreen},
},{
  tabBarPosition:'bottom',
  tabBarOptions:{
    tabBarLabel: null,
    activeTintColor:'white' ,
    inactiveTintColot:'grey',
    showIcon: true,
    showLabel: false,
    style:{
      backgroundColor:'#1e90ff'
    },
  }
});


export default MainScreenNavigator;
