import React, {Component} from 'react';
import { Image, View, StyleSheet, Dimensions, Text, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Card,CardItems} from 'react-native-elements';


let windowWidth = Dimensions.get('window');
export default class SearchItems extends React.Component {
   constructor(props) {
       super(props)
       alert(this.props.name);
       this.state({
        data : this.props.name
       }) 
     }

     onPress=()=>{
   this.setState({
       count: this.state.count + 1,
       likeFlag: !this.state.likeFlag
   })
}



render(){
   return (
      
       <View style={styles.cardstyles} >
       <Card>
       <CardItems>
           <Text>{this.state.data}</Text>
       </CardItems>
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