import React, { Component ,Keyboard} from 'react';
import {Container,Content,Header,Form,Input,Item,Button,Label,Card,CardItem,Body,Left} from 'native-base';
import {StyleSheet, Text,View,BackHandler,Alert} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';


class AnonymousInfo extends React.Component{
  static navigationOptions={
    tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={20} color={tintColor} />
      ),
    title: 'You are not authorised',
    header:null
  };
  
 closeApp(){
    Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
       );
       
  }

  render(){
    let paramfromCategoryScreen = this.props.navigation.state.params;
    const {navigate} = this.props.navigation;

    return(
      <Container style={styles.container}>
        <Card style={styles.card}>
           
      <CardItem>
     <Text>You are not Authorised to visit this page</Text>
       
       
      </CardItem>
      <CardItem>
     
       <View>
           <Button style={{backgroundColor:'grey'}} onPress={() => this.closeApp()}><Text>   Please Exit & Signup to access more features   </Text></Button>
           </View>
        
       
      </CardItem>
      </Card>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
  card:{
    justifyContent: 'center',
    elevation:10,
    backgroundColor:'white',
    alignItems:'center',
    borderRadius: 10,
    borderBottomEndRadius:10,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    borderBottomStartRadius:10
  }
});



 export default AnonymousInfo;
