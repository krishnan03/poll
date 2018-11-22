import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

export default class ResultScreen extends React.Component {
  static navigationOptions={
    
    tabBarIcon:({tintColor})=>(
    <Icon name="results" size={20} color={ tintColor } />
    )
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Results will be published here!</Text>
      </View>
    );
  }
}
