import React, { Component } from 'react';
import { Image, View, StyleSheet, Dimensions, Text, Button, TouchableOpacity, TouchableHighlight, Platform, StatusBar, FlatList } from 'react-native';
import { Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardValue from './CardItems';
import firebase from '../../firebase/firebase';

let windowWidth = Dimensions.get('window');
export default class SearchItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [null],
            val: ''
        }

    }
    static navigationOptions = {
        title: null,
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="search" size={20} color={tintColor} />
        )
    }
    componentWillMount() {
        

    }



    render() {
        let paramfromOutput = this.props.navigation.state.params;

        return (
            <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10 }}>
                {
                    paramfromOutput.output.map((output) =><CardValue
                   name={output}
                />)
                }
                
                    
                    
                
                


            </View>
        );
    }
}

// Sample style sheet function
const styles = StyleSheet.create(
    {
        cardContainer: {
            borderRadius: 150,
            flexDirection: 'row',
            padding: 2,
            height: 60
        },
        cardstyles: {
            width: windowWidth.width,
            marginBottom: 20
        },
        imageAfterText: {
            padding: 10,
            fontWeight: 'bold',
            textAlign: 'left',
            fontWeight: '100',
            fontStyle: 'italic'
        },
        questionStyle: {
            fontWeight: '600',
            fontSize: 18,
            marginBottom: 20
        },
        questionImageStyle: {
            alignItems: 'flex-end'
        },
        likeOptionsStyle: {
            flexDirection: 'row'
        },
        likeStatus: {
            flexDirection: 'column'
        },
        buttonStyle: {
            width: 10,
            borderRadius: 10,
            backgroundColor: 'red'
        },
        text: {
            borderWidth: 1,
            padding: 25,
            borderColor: 'black',
            backgroundColor: 'red'
        }

    });