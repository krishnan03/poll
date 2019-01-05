const functions = require('firebase-functions');
var fetch=require('node-fetch')

const admin=require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPushNotification= functions.database.ref('result/{id}').onCreate((event,context) => {
    console.warn('inside notification')
//const root=event.val();
const root = event.ref.root;
console.warn(root)
var messages=[]
const msgTitle = 'New Message';
const promises = [];
const msgBody = 'Incoming Text';

return root.child('users/').once('value', snapshot => {
    snapshot.forEach(user => {
      const promise = root.child('users/gplkrishnan320@gmail_com').once('value', snapshot => {
        const expoToken = snapshot.val().expotoken;
      //  const userId = snapshot.val().uid;
        if (expoToken ) {
          messages.push({
            "to": expoToken,
            "title": msgTitle,
            "body": 'msgBody'
          });
        }
      });
      promises.push(promise);
    });
    return Promise.all(promises).then(() => {
      return sendMessages(messages);
    });
  });
  function sendMessages(messages){



    return new Promise((resolve, reject) => {
      const f = fetch('https://exp.host/--/api/v2/push/send', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(messages)
      });
      f.on("end", () => {
        resolve();
      });
    });
/**fetch('https://exp.host/--/api/v2/push/send',{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "content-Type":"application/json"
        },
        body: messages
    }) */

}


})