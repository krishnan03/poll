import React from 'react';
import { Text, View, StyleSheet, TextInput, COLORS, Alert,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'native-base';
import firebase from '../../firebase/firebase';
import { ImagePicker, Permissions } from 'expo';


export default function renderIf(condition, content) {

    if (condition) {
        return (
              <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading} />
        </View>
      </View>
    </Modal>
        );
    } else {
        return null;
    }
}