import { DrawerNavigator ,TabNavigator} from 'react-navigation';
import Settings from './settings/settings';
import tempscreen from './settings/tempscreen';
import PollScreen from './poll/poll';
import ProfileScreen from './profile/profile';
import SearchScreen from './search/search';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserDetailsModal from './userDetailsModal';
import firebase from '../firebase/firebase';
import HomeScreen from './home/homescreen'

var MainScreenNavigator=TabNavigator({
  //HomeScreen:{screen: HomeScreen},s
  Profile:{screen: ProfileScreen},
  Poll:{screen: PollScreen},
  Search:{screen: SearchScreen},
},{
  tabBarPosition:'bottom',
  tabBarOptions:{
    tabBarLabel: null,
    activeTintColor:'white' ,
    showIcon: true
  }
});

export default Drawer= DrawerNavigator({
  Tabs:{
    screen:MainScreenNavigator
  },
  Settings:{
    screen:Settings
  },
  tempscreen:{
    screen:tempscreen
  }
});
