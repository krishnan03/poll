import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class FeedBackScreen extends React.Component {
  static navigationOptions={
    
    tabBarIcon:({tintColor})=>(
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    )
  }
  render() {
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feedback!</Text>
      </View>
    );
  }
}
