import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Thumbnail , Card, CardItem,Left, Right} from 'native-base';

export default class MenuScreen extends React.Component {
  static navigationOptions={
    
    tabBarIcon:({tintColor})=>(
      <Icon name="chevron-with-circle-right" size={20} color={tintColor} />
    ),
    title:'Menu'
  }
  render() {
    const{navigate}=this.props.navigation;
    return (
      <View>
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
            <Card>
            <CardItem>
                <Left>
                  <Thumbnail style={style.thumbIcon} source={require('../../assets/signout.png')}/>   
                  <Text>Sign out..</Text>
                </Left>
                <Right><Icon name="chevron-with-circle-right" size={20} onPress={() => navigate('Signout')}/></Right>
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
