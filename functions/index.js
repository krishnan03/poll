const functions = require('firebase-functions');
var fetch=require('node-fetch')
const admin=require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPushNotification= functions.database.ref('result/{id}').onCreate(event=>{
    console.warn('inside notification')
const root=event.data.ref.root
console.warn(root)
var messages=[]

return root.child('users/').once('value').then(function(snapshot){

    snapshot.forEach(function(childSnapshot){
        console.warn(childSnapshot)
        var expoToken=childSnapshot.val().expotoken
        if(expoToken){

            messages.push({
                "to":expoToken,
                "body":"Result has been published for the poll you have been voted"
            })
        }
    })
    return Promise.all(messages)
}).then(messages =>{
    fetch('https://exp.host/--/api/v2/push/send',{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "content-Type":"application/json"
        },
        body: JSON.stringfy(messages)
    })
}).catch((error) => {
    this.errorMessage = 'Error - ' + error.message
});
})