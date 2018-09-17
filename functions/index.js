const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.removeCheckedTRequest = functions.database.ref('/trequests/{trequestId}')
    .onCreate(() => {
      const ref = admin.database().ref('trequests');
      return ref.orderByChild("checked").equalTo(true).once('value', (snapshot) => {
        const updates = {};
        // console.log(snapshot.val());
        snapshot.forEach(child => {
          // console.log(child);
          updates[child.key] = null;
        });
        return ref.update(updates);
      });
    });