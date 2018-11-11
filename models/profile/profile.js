import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileScreen extends React.Component {
  static navigationOptions={
    tabBarIcon:({tintColor})=>(
    <Icon name="user" size={20} color={ tintColor } />
    )
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}
