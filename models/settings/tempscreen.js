import React from 'react';
import { Text, View,Image,Button } from 'react-native';
import { TabNavigator,DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class tempscreen extends React.Component{
  static navigationOptions={
    tabBarLabel:'Settings',
    drawerIcon:({tintColor})=>{
      return(
        <MaterialIcons>
          name="change-history"
          size={24}
          style={{color: tintColor}}
        </MaterialIcons>

      );
    }
  }
  render(){
    return <View style={
      {flex:1,
      justifyContent:'center',
      alignItems:'center'}
    }>
    <Text style={{fontSize:30,color:'blue'}}>Temp Screen</Text>
    <Button
      onPress={()=> this.props.navigation.navigate('DrawerOpen')}
      title="Open Navigation"
    />
  </View>
  }
}
