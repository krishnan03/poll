const functions = require('firebase-functions');
var fetch=require('node-fetch')

const admin=require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPushNotification= functions.database.ref('result/{id}').onCreate((event,context) => {
    console.warn('inside notification')
const root=event.val();
console.warn(root)
var messages=[]
var expoToken="ExponentPushToken[ybqw4vAJUrbuUNyapdi-1d]"
if(expoToken){
    console.log(expoToken)
    messages.push({
        "to":expoToken,
        "body":"Result has been published for the poll you have been voted"
    })
}
Promise.all(messages)

fetch('https://exp.host/--/api/v2/push/send',{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "content-Type":"application/json"
        },
        body: messages
    })

})