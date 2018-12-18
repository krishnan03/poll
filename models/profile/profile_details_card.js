import React, { Component } from 'react';
import {
    Container, Text, Content,
    Card, CardItem, Thumbnail, Body, Left, Right,
    Button,View
} from 'native-base';
import { Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
export default class DobCardComponent extends Component {
    constructor() {
        super()

        var downoadUrl = ''
        this.state = {
            dp: null,
            date: '',
            PickerValue: '',
            PickerValue1: '',
            country:''
        }

        firebase.database().ref('users/').on('value', (data) => {
            var user = firebase.auth().currentUser.email;
            user = user.replace(".", "_");
            var value = data.val();
            const dobVal = value[user].dob;
            var employment = value[user].employment;
            var gender = value[user].gender;
            var country=value[user].country;
            this.setState({ date: dobVal });
            this.setState({ PickerValue: employment });
            this.setState({ PickerValue1: gender });
            this.setState({country:country});
        })

    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    }
    render() {
        return <ScrollView>
        <Card>
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
                    padding:2
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
                    padding:2
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
                    padding:2
                }}
            />
            <CardItem>
                <Left>
                    <Text>Country:</Text>
                    <Text>{this.state.country}</Text>
                </Left>
            </CardItem>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    padding:2
                }}
            />
        </Card>
        </ScrollView>
    }
}
