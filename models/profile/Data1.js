import { TabNavigator } from 'react-navigation';
import React from 'react';
import { Container, Text, Content,Form,Button,View} from 'native-base';

export default class Data1 extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Data 1'
  };

  render() {
    return (
      <Text>Data inside Data 1</Text>
    );
  }
}
