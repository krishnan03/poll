import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDtdkB6WXrgXBQrqpngZZqOcmEjjyQc0_I",
  authDomain: "nadak-a6ff4.firebaseapp.com",
  databaseURL: "https://nadak-a6ff4.firebaseio.com",
  projectId: "nadak-a6ff4",
  storageBucket: "nadak-a6ff4.appspot.com",
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
