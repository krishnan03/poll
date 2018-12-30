import React from 'react';

// import {Dimensions,StyleSheet} from 'react-native';
import { Text,TextInput, View,CheckBox,StyleSheet,ToastAndroid,Picker,Button,AppRegistry,Alert,KeyboardAvoidingView,Platform,
  StatusBar,ActivityIndicator,NetInfo,Dimensions } from 'react-native';


export default function MiniOfflineSign()  {
    return (
      <View style={stylesForOffline.offlineContainer}>
        <Text style={stylesForOffline.offlineText}>No Internet Connection</Text>
      </View>
    );
  }

  const { width } = Dimensions.get('window');
const stylesForOffline = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
}); 