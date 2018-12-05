import React from 'react';
import { Text, View,Image,Button,Platform,Dimensions} from 'react-native';
import { TabNavigator,StackNavigator,TabBarBottom } from 'react-navigation';
import PollScreen from '../poll/poll';
import ProfileScreen from '../profile/profile';
import ResultScreen from '../results/results';
import SearchScreen from '../search/search';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserDetailsModal from '../userDetailsModal';
import firebase from '../../firebase/firebase';
import Drawer from '../drawer';
import HomeSwiper from './homeSwiper';
import {Swiper,Swiperdot,Swiperactivedot} from 'react-native-swiper';
import {Container,Content,Card,CardItem} from 'native-base';
import MenuScreen from '../menu/menu';


var MainScreenNavigator=TabNavigator({
  Home:{screen: HomeSwiper},
  Search:{screen: SearchScreen},
  Poll:{screen: PollScreen},
  Result:{screen: ResultScreen},
  Profile:{screen: ProfileScreen},
  
},{
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel:false
  },
  animationEnabled: true,
  swipeEnabled: true,
  
});


export default MainScreenNavigator;
