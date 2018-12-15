import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StyleSheet, Text, View, BackHandler, Dimensions, Platform, Picker,StatusBar } from 'react-native';
import Modal from 'react-native-modalbox';
import PollComponents from './showPollComponents';
import Swiper from 'react-native-swiper-animated';
import Icon from 'react-native-vector-icons/Entypo';

var screen = Dimensions.get('window');

export default class ShowPoll1 extends React.Component {
     
    static navigationOptions = ({ navigation, screenProps }) =>({
       header:null,
       tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color={tintColor} />
    ),
        });
  showModal() {
    this.refs.showPoll.open();
  }
  constructor(props) {
    super(props)
    console.ignoredYellowBox = [
      'Setting a timer'
    ];


    this.state =
      ({
        dp: null,
        name:'',
        verified:false,
        color:null
      })

      
  }

  


  

  componentWillMount() {
    
  }

  componentDidMount() {
     
  }



  render() {
    


    return (
        <Swiper
        style={styles.wrapper}
        smoothTransition
        loop
        showPagination={false}
        paginationLeft={''}
    paginationRight={''}
      >
   <View style={styles.slide1}>
        <Content>
          <PollComponents/>
        </Content>
  </View>
  <View style={styles.slide2}>
  <Content style={{ height: 5}}>
          <PollComponents/>
        </Content>
  </View>
  <View style={styles.slide3}>
  <Content style={{ height: 5}}>
          <PollComponents/>
        </Content>
  </View>
     </Swiper>
    );

  }
}

const styles = {
    wrapper: {
      backgroundColor: '#666666',
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    slide1: {
     flex:1
     
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
      }
}