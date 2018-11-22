import { TabNavigator } from 'react-navigation';
import React from 'react';
import { Container, Text, Content,Form,Button,View} from 'native-base';

export default class Data2 extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Data 2'
  };

  render() {
    return (
      <View>
        <Text>Data inside Data 2</Text>
      </View>
    );
  }
}
