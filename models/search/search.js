import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SearchScreen extends React.Component {
  static navigationOptions={
    title: null,
    tabBarIcon:({tintColor})=>(
    <Icon name="search" size={20} color={ tintColor } />
    )
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search Global Poll here!</Text>
      </View>
    );
  }
}
