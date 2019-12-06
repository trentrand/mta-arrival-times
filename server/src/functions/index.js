import admin, { firestore } from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH),
  databaseURL: "https://mta-arrival-times.firebaseio.com"
});
let db = admin.firestore();

// admin.firestore.setLogFunction((log) => {
//   console.log(log);
// });
