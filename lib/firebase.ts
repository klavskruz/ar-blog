import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBErPHJ7RTZCpiQDunH-lkBPUTBfdOFGZ8",
    authDomain: "all-solar-admin.firebaseapp.com",
    projectId: "all-solar-admin",
    storageBucket: "all-solar-admin.appspot.com",
    messagingSenderId: "666979858459",
    appId: "1:666979858459:web:d0cec5ca5454cb07d320be",
    measurementId: "G-2K9LTDHLK0"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Helper functions

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc){
  const data = doc.data();
  return{
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  }
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const increment = firebase.firestore.FieldValue.increment;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

