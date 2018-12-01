import React, { Component } from 'react';
import {
    Container, Text, Content,
    Card, CardItem, Thumbnail, Body, Left, Right,
    Button, View
} from 'native-base';
import { Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';

export default class HeaderCard extends Component {
    constructor() {
        super()

        var downoadUrl = ''
        this.state = {
            dp: null,
            date: '',
            PickerValue: '',
            PickerValue1: '',
            name: ''
        }



    }

    closeModal() {
        this.refs.addDetails.close();
    }
    async componentWillMount() {
        firebase.database().ref('users/').on('value', (data) => {
            var user = firebase.auth().currentUser.email;
            user = user.replace(".", "_");
            var value = data.val();
            const dobVal = value[user].dob;
            var employment = value[user].employment;
            var gender = value[user].gender;
            var name = value[user].name;
            this.setState({ date: dobVal });
            this.setState({ PickerValue: gender });
            this.setState({ PickerValue1: employment });
            this.setState({ name: name });
        })
    }
    render() {
        return <View>

            <Card>
                <CardItem>
                    <Left>
                        <Icon name="ios-arrow-back-outline" size={20} style={{ alignSelf: 'flex-end' }} onPress={() => this.closeModal} />
                        <Text>Details</Text>
                    </Left>
                </CardItem>
            </Card>

            <Card>
                <CardItem>
                    <Left>
                        <Text>Alias Name:</Text>
                        <Text>{this.state.name}</Text>
                    </Left>
                </CardItem>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <CardItem>
                    <Left>
                        <Text>Date of Birth:</Text>
                        <Text>{this.state.date}</Text>
                    </Left>
                </CardItem>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <CardItem>
                    <Left>
                        <Text>Gender:</Text>
                        <Text>{this.state.PickerValue}</Text>
                    </Left>
                </CardItem>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <CardItem>
                    <Left>
                        <Text>Employment:</Text>
                        <Text>{this.state.PickerValue1}</Text>
                    </Left>
                </CardItem>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
            </Card>

        </View>
    }
}