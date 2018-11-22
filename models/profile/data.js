import { TabNavigator } from 'react-navigation';
import React from 'react';
import { Container, Text, Content,Form,Button} from 'native-base';
import Data1 from './Data1';
import Data2 from './Data2'

var MyApp = TabNavigator({
  Data1: { screen: Data1 },
  Data2: { screen: Data2 }
});

export default class App extends React.Component {
  render() {
    return<MyApp/>
  }
}
