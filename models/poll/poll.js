import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PollScreen extends React.Component {
  static navigationOptions={
    
    tabBarIcon:({tintColor})=>(
    <Icon name="bars" size={20} color={ tintColor } />
    )
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Create Your Poll here!</Text>
      </View>
    );
  }
}
