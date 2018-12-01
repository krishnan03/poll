import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform,
    StatusBar,
    Image,
    Dimensions, TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Content, Header, Left, Right, Item, Input, Card, CardItem, Button } from 'native-base'
import Swiper from 'react-native-swiper';
import { lucida } from 'expo';
import {StackNavigator} from 'react-navigation';
import MenuScreen from '../menu/menu';
import VerifyProfileScreen from '../menu/verifyProfile';
import SignOutScreen from '../menu/signout';
import BugScreen from '../menu/bug';
import PromotionsScreen from "../menu/promotions";
import FeedBackScreen from "../menu/feedback";


var screen = Dimensions.get('window');
const { width } = Dimensions.get('window')

const Slider = props => (<View style={style.container}>
    <Image style={style.image} source={props.uri} />
</View>
)


class HomeSwiper extends Component {
    
    static navigationOptions = ({ navigation, screenProps }) =>({
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={20} color={tintColor} />
        ),
        
        title: 'Poll',
        headerRight: (
      <TouchableHighlight>
            <Icon style={{marginLeft:10,marginRight:10}} name="menu" size={25}  onPress={() => navigation.navigate('Menu')}
                />
           </TouchableHighlight>    
          ),
        headerLeft:(
            <Icon style={{marginLeft:10,marginRight:10}}  name="home" size={25}
            />
        ),
        
        });
    
    constructor(props) {
        super(props)

        this.state = {
            imagesSlider: [
                require('../../assets/swiper.jpg'),
                require('../../assets/swiper1.jpg'),
                require('../../assets/swiper2.jpg')
            ]
        }
    }
goMenu(){
    alert('insideMenu')
    this.props.navigation.navigate('Menu');
}
    render() {
        const{navigate}=this.props.navigation;
        return <Container>
            <Content>
                <Swiper
                    autoplay
                    height={150}
                    style={{ padding: 10 }}
                >
                    {
                        this.state.imagesSlider.map((item, i) => <Slider
                            uri={item}
                            key={i}
                        />)
                    }
                </Swiper>
                <View style={style.containerDiv}>
                    <View style={style.buttonContainer}>
                        <Button transparent style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 2, alignSelf: 'center'
                        }}><Text>Global</Text></Button>
                    </View>
                    <View
                        style={{
                            width: 1,
                            backgroundColor: '#000000'
                        }}
                    />
                    <View style={style.buttonContainer}>
                        <Button transparent style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 2, alignSelf: 'center'
                        }}
                            onPress={() => this.loginUser()}
                        ><Text style={{ marginTop: 0 }}>Regional</Text></Button>
                    </View>
                </View>
                <Card style={{ marginLeft: 5, marginRight: 5 }}>
                    <CardItem header style={{ borderBottomWidth: 1, borderBottomColor: '#dee0e2' }}>
                        <Text>Card View to be Updated</Text>
                    </CardItem>
                </Card>
            </Content>

        </Container>
      

    }
}

const NavigationApp1= StackNavigator({
    HomeMain:{screen: HomeSwiper},
    Menu:{screen:MenuScreen},
    VerifyProfile:{screen:VerifyProfileScreen},
    Promotion:{screen:PromotionsScreen},
    Bug:{screen:BugScreen},
    Feedback:{screen:FeedBackScreen},
    Signout:{screen:SignOutScreen},

  });
//export default HomeSwiper;
export default NavigationApp1;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    },
    image: {
        flex: 1,
        width
    },
    containerDiv: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        padding: 5,
        backgroundColor: '#3399ff',
        borderRadius: 30,
    },
    buttonContainer: {
        flex: 1,
        height: 30
    }, containerStyle: {

        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10,
        justifyContent: "space-between",
        elevation: 3,
        backgroundColor: 'white'
    },
    buttonStyle: {
        height: 30,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10
    },
    searchTextStyle: {
        flex: 1
    },
    navBar: {
        flex: 3,
        elevation: 3,
        padding: 5,
        backgroundColor: 'white',
    }
});