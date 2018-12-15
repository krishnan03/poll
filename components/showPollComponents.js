import React, { Component } from 'react';
import {
    Container, Text, Content,
    Card, CardItem, Thumbnail, Body, Left, Right,
    Button, View
} from 'native-base';
import { Image, Alert, TextInput, TouchableOpacity,navigation} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImagePicker, Permissions } from 'expo';
import firebase from '../firebase/firebase'
import renderIf from '../models/profile/renderif';
import RadioGroup from 'react-native-radio-buttons-group';
import { ScrollView } from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';
import PollOptions from './pollOptions';

export default class PollComponents extends Component {
    constructor() {
        super()

        var downoadUrl = ''
        this.state = {
            dp: null,
            date: '',
            PickerValue: '',
            PickerValue1: '',
            name: '',
            about: '',
            countdownFlag:false,
            data: [

                {
                    label: 'Yes',
                    value: "Yes",
                    color: '#666666',
                    size: 15
                },
                {
                    label: 'No',
                    value: "No",
                    color: '#666666',
                    size: 15
                },

                {
                    label: 'May be',
                    value: "May be",
                    color: '#666666',
                    size: 15
                },
            ],
        }

        this.getImage();

    }
    getImage() {
        let { state } = this
        var user = 'users/' + (firebase.auth().currentUser.email);
        user = user.replace(".", "_")
        firebase.storage().ref().child(`images/${user}`).getDownloadURL().then((url) => {
            this.setState({

                dp: url,
            });
        }).catch(function (e) {

        })
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        firebase.database().ref('users/').on('value', (data) => {
            var user = firebase.auth().currentUser.email;
            user = user.replace(".", "_");
            var value = data.val();
            const name = value[user].name;
            this.setState({ about: value[user].about });
            this.setState({ name: name });
        })

        var user = 'users/' + (firebase.auth().currentUser.email);
        user = user.replace(".", "_")
        firebase.database().ref(user).on('value', (data) => {
            var value = data.val();
            const status = value['Verification'].status;
            if (status == 'Not verified') {
                this.setState({ verified: false });
            } else if (status == 'Verified') {
                this.setState({ color: 'green' }),
                    this.setState({ verified: true });
            }
        })
    }
    closeModal() {
        this.refs.addDetails.close();
    }

    render() {
        navigate = this.props.navigation;
        return <View>

            <Card style={{ borderRadius: 20, borderColor: 'black' }}>
                <CardItem>
                    <Left>
                        <Thumbnail
                            source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }}
                        />
                        <Body>
                            <Text>{this.state.name} {renderIf(this.state.verified,
                                <Thumbnail style={style.thumbIcon} source={require('../assets/verify.png')} />
                            )}  <Text note style={{ fontSize: 10 }}>posted on 22 Jan 07:18</Text></Text>
                            <Text note style={{ fontSize: 10 }}>{this.state.about}</Text>
                        </Body>
                        <Icon name="close" size={20} color='#666666' style={{ marginTop: 5 }}  onPress={() => navigate('HomeMain')}/>
                        <Icon name="bookmark" size={20} color='#FFA500' style={{ marginTop: 5 }} />
                    </Left>

                </CardItem>
                <CardItem>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Do what Modi to play Second Innings?</Text>
                </CardItem>
                <CardItem>
                    <RadioGroup radioButtons={this.state.data} />
                </CardItem>
                <CardItem>
                    <Left>
                        <Icon name="star" size={20} color='#00aced' />

                    </Left>
                    <Right>
                        {
                            this.state.countdownFlag ? <CountDown
                                until={10}
                                onFinish={() => alert('finished')}
                                onPress={() => this.setState({
                                 countdownFlag:true   
                                })}
                                size={10}
                            />
                                : <Button title='View Result Summary'></Button>
                        }
                    </Right>
                </CardItem>
            </Card>
            <Card style={{ borderRadius: 15, borderColor: 'black' }}>

                <CardItem>
                    <Left>
                        <Icon name="comment" size={20} color='#666666' />
                        <Body>
                            <TextInput
                                placeholder="Share your view..."
                                multiline={true}
                                style={{ padding: 5 }}
                            /></Body>
                        <Icon name="send" size={20} color='#666666' />
                    </Left>
                </CardItem>
                <ScrollView>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Vignesh: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Gopalakrishnan: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Bala: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Dinesh: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Karthik: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Vignesh: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Vignesh: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Gopalakrishnan: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Bala: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Dinesh: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Karthik: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left><Thumbnail source={{ uri: this.state.dp }} style={{ width: 30, height: 30 }} />
                            <Text style={{ borderBottomWidth: 1, fontSize: 15 }}>Vignesh: </Text><Text style={{ fontSize: 14 }}>TestComment</Text>
                        </Left>
                    </CardItem>
                    <View style={{ padding: 5 }}></View>
                </ScrollView>
            </Card>

        </View>
    }
}
const style = {
    thumbIcon: {
        width: 40, height: 40,
        justifyContent: 'space-between'
    },

}