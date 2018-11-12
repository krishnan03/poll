import firebase from './firebase';

export default class User {
  constructor() {
    this.email='',
    this.uid='',
    this.currentUser=''
  }
  currentUser=firebase.auth().currentUser;
  email=currentUser.email;
  uid=currentUser.uid;
}
