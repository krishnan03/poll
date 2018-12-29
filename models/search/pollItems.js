import React, {Component} from 'react';
import { Image, View, StyleSheet, Dimensions, Text, Button, TouchableOpacity, TouchableHighlight,navigation} from 'react-native';
import { } from 'react-native-elements';
import { Thumbnail,Card, CardItem,Left,Body } from 'native-base';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import renderIf from '../../components/renderif';
let windowWidth = Dimensions.get('window');
export default class CardValue extends React.Component {
   constructor(props) {
       super(props)
       let data = this.props.name;
       this.state = { count: 0,
       allData: '', dp: null,
       name: '',
       verified: false,
       color: null,about:''}

     }


componentWillMount(){
    
}
showData(){
   
    
}
render(){
    
   return (
    <View>
   
    <Card>
        <CardItem>
        
          <Body style={{ justifyContent: 'space-between' }}>
          <Text>{this.props.name}</Text>
          </Body>
        
        </CardItem>
    </Card>
    
    </View>
       );
   }
}

// Sample style sheet function
const styles = StyleSheet.create(
   {
   cardContainer:{
       borderRadius: 150,
       flexDirection: 'row',
       padding : 2,
       height: 60
   },
   cardstyles:{
       width:windowWidth.width,
       marginBottom: 20
   },
   imageAfterText:{
       padding: 10,
       fontWeight: 'bold',
       textAlign: 'left',
       fontWeight: '100',
       fontStyle:'italic'
   },
   questionStyle:{
       fontWeight: '600',
       fontSize: 18,
       marginBottom: 20
   },
   questionImageStyle:{
       alignItems:'flex-end'
   },
   likeOptionsStyle:{
       flexDirection:'row'
   },
   likeStatus:{
       flexDirection:'column'
   },
   buttonStyle:{
       width:10,
       borderRadius: 10,
       backgroundColor: 'red'
   },
   text: {
       borderWidth: 1,
       padding: 25,
       borderColor: 'black',
       backgroundColor: 'red'
    }

});


const style = {
    thumbIcon: {
      width: 40, height: 40,
      justifyContent: 'space-between'
    },
  
  }