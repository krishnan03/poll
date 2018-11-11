import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import PollScreen from '../poll/poll';
import ProfileScreen from '../profile/profile';
import SearchScreen from '../search/search';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
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
  tabBarPosition:'bottom'
});


export default MainScreenNavigator;
