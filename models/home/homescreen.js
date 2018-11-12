import React from 'react';
import { Text, View,Image,Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import PollScreen from '../poll/poll';
import ProfileScreen from '../profile/profile';
import SearchScreen from '../search/search';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserDetailsModal from '../userDetailsModal';


class HomeScreen extends React.Component {

  static navigationOptions={
    tabBarIcon:({tintColor})=>(
    <Icon name="home" size={20} color={ tintColor } />
    )
  }
  openModal(){
    this.refs.addDetails.showModal();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="User Modal"
          onPress={()=> this.openModal()}>
        </Button>
        <UserDetailsModal ref={'addDetails'}></UserDetailsModal>
      </View>
    );
  }
}


var MainScreenNavigator=TabNavigator({
  Home:{screen: HomeScreen},
  Profile:{screen: ProfileScreen},
  Poll:{screen: PollScreen},
  Search:{screen: SearchScreen},
},{
  tabBarPosition:'bottom',
  tabBarOptions:{
    tabBarLabel: null,
    activeTintColor:'white',
    showIcon: true
  }
});


export default MainScreenNavigator;
