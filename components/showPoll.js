import React, { Component, Keyboard } from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StyleSheet, Text, View, BackHandler, Dimensions, Platform, Picker } from 'react-native';
import Modal from 'react-native-modalbox';
import PollComponents from './showPollComponents';



var screen = Dimensions.get('window');

export default class ShowPoll extends React.Component {
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
      
      <Modal
        ref={"showPoll"}
        style={{
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30 : 10,
          shadowRadius: 10,
          width: screen.width,
          height: screen.height,
         
        }}
        position='center'
        backdrop={true}
        swipeArea={200}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}>
        <Content style={{ height: 5}}>
          <PollComponents/>
        </Content>

         

      </Modal>
    );

  }
}
