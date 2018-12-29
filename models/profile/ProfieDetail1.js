import React from 'react';
import { View, Left, Input, Item, TextInput, Alert, TouchableHighlight, Text, ScrollView,Platform,StatusBar } from 'react-native';
import { Container, Content, Form, Button, Card, CardItem, } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import CardComponent from './profile_CardItem';
import { ImagePicker, Permissions } from 'expo';
import firebase from '../../firebase/firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';
//import ProfileDetails from './ProfileDetails';
import UserDetails from './ProfileDetails';
import UserDetailsModal from '../userDetailsModal';
import ProfileFollow from './profile_Follow';


export default class ProfileDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            fontLoaded: false,
            name: '',
            date: '',
            PickerValue: '',
            PickerValue1: '',
            country: '',
            email:'',
            isMainUser:false,
            about:'',
            realtionship:''
        }


    }
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="user" size={20} color={tintColor} />
        ),
        header: null
    }
    editUser() {
        this.refs.addDetails.showModal();
    }
    async componentWillMount() {
        let paramfromOutput = this.props.navigation.state.params;
  
   try{
    this.setState({
      email:paramfromOutput.email
    })
     
    }catch(err){
    
      this.setState({
        email:firebase.auth().currentUser.email
      })
       
    }

    
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ fontLoaded: true });
        firebase.database().ref('users/').on('value', (data) => {
            var user = this.state.email;
            user = user.replace(/\./g, "_");
            var value = data.val();
            const dobVal = value[user].dob;
            var employment = value[user].employment;
            var gender = value[user].gender;
            var country = value[user].country;
            var name=value[user].name;
            var about=value[user].about;
            var relationship=value[user].relationship;
            this.setState({ date: dobVal });
            this.setState({ PickerValue: gender });
            this.setState({ PickerValue1: employment });
            this.setState({ name: name });
            this.setState({ country: country });
            this.setState({about:about});
            this.setState({relationship:relationship});
        })
    }
    componentDidMount(){
        if(this.state.email == firebase.auth().currentUser.email){
            this.setState({
                isMainUser:true
            })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const {
            containerStyle,
            searchTextStyle,
            buttonStyle,
            naviBar,
            buttonContainer,
            container
        } = style;
        return (
            <View style={{ flex: 1 }}>
                <UserDetailsModal ref={'addDetails'}></UserDetailsModal>
                

                <Content style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10}}>
                    <CardComponent  email={this.state.email}/>
                    <View style={container}>
                        <View style={buttonContainer}>
                            <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }} onPress={() => navigate('ProfilePoll',{email:this.state.email})}><Text>Poll  <Icon name="chevron-right" size={20} style={{ marginTop: 5 }} /></Text></Button>
                        </View>
                        <View style={buttonContainer}>
                            <Button transparent style={{ padding: '10%', alignSelf: 'center', marginTop: 0 }}
                            ><Text>Details <Icon name="chevron-down" size={20} style={{ marginTop: 5 }} /></Text></Button>
                        </View>
                    </View>
                    <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
                        <CardItem>
                            <Text>About:</Text>
                            <Text>     {this.state.about}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
                        <CardItem>
                            <Text>Date of Birth:</Text>
                            <Text>     {this.state.date}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
                        <CardItem>
                            <Text>Gender:</Text>
                            <Text>     {this.state.PickerValue1}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
                        <CardItem>
                            <Text>Relationship:</Text>
                            <Text>     {this.state.relationship}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ flex: 1, flexDirection: 'row', borderRadius: 10 }}>
                        <CardItem>
                            <Text>Employment:</Text>
                            <Text>     {this.state.PickerValue}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>

                            <Text>Country:</Text>
                            <Text>     {this.state.country}</Text>

                        </CardItem>

                    </Card>
                </Content>
                {this.state.isMainUser ? 
                <Button style={{ marginTop: 10, width: 80, justifyContent: 'center', alignSelf: 'center' }}
                    rounded
                    primary
                    center
                    onPress={() => this.editUser()}>
                    <Text>Edit</Text>
                </Button> : null}
{this.state.isMainUser ? null:
    <ProfileFollow />}
            </View >
        );
    }
}




const style = {
    containerStyle: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    naviBar: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        position: 'absolute',
        marginTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchTextStyle: {
        flex: 1
    },
    buttonStyle: {
        height: 30,
        marginBottom: 8
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 0
    },
    buttonContainer: {
        flex: 1,
    }
}



