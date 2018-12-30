import React from 'react';
import { Text, View,Platform,StatusBar,Alert,BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Thumbnail , Card, CardItem,Left, Right} from 'native-base';
import firebase from '../../firebase/firebase';
export default class MenuScreen extends React.Component {
  static navigationOptions={
    header:null,
    tabBarIcon:({tintColor})=>(
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    ),
    title:'Menu'
  }

  logout(){
    firebase.auth().signOut()
    BackHandler.exitApp()
  }

  __signOut(){
    Alert.alert(

      '','Do you want to Signout & Exit',
      [
        {text: 'No', },
        {text:'Yes', onPress: ()=>{ this.logout()} }
      ]
    )
  }
  render() {
    const{navigate}=this.props.navigation;
    return (
      <View style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10,}}>
        <Card>
            <CardItem>
                <Left>
                  <Thumbnail style={style.thumbIcon} source={require('../../assets/verify.png')}/>   
                  <Text>Verify your Profile</Text>
                </Left>
                <Right><Icon name="chevron-with-circle-right" size={20} onPress={() => navigate('VerifyProfile')}/></Right>
            </CardItem>
            </Card>
            <Card>
            <CardItem>
                <Left>
                  <Thumbnail style={style.thumbIcon} source={require('../../assets/promotion.png')}/>   
                  <Text>Promotions</Text>
                </Left>
                <Right><Icon name="chevron-with-circle-right" size={20} onPress={() => navigate('Promotion')}/></Right>
            </CardItem>
            </Card>
            <Card>
            <CardItem>
                <Left>
                  <Thumbnail style={style.thumbIcon} source={require('../../assets/feedback.jpg')}/>   
                  <Text>Feedback</Text>
                </Left>
                <Right><Icon name="chevron-with-circle-right" size={20} onPress={() => navigate('Feedback')}/></Right>
            </CardItem>
            </Card>
            <Card>
            <CardItem>
                <Left>
                  <Thumbnail style={style.thumbIcon} source={require('../../assets/bug.png')}/>   
                  <Text>Bug??</Text>
                </Left>
                <Right><Icon name="chevron-with-circle-right" size={20} onPress={() => navigate('Bug')}/></Right>
            </CardItem>
            </Card>
            <Card onPress={() => this.__signOut()}>
            <CardItem onPress={() => this.__signOut()}>
                <Left>
                  <Thumbnail style={style.thumbIcon} onPress={() => this.__signOut()} source={require('../../assets/signout.png')}/>   
                  <Text onPress={() => this.__signOut()}>Sign out..</Text>
                </Left>
                <Right><Icon name="chevron-with-circle-right" size={20} onPress={() => this.__signOut()}/></Right>
            </CardItem>
            </Card>
     
      </View>
    );
  }
}


const style = {
  thumbIcon: {
    width:30,height:30
  },
 
}
