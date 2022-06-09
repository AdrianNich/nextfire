import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBrTQHrI4h5nGC2RV57N7C-mjYKWszc24A',
  authDomain: 'nextfire-c98fc.firebaseapp.com',
  projectId: 'nextfire-c98fc',
  storageBucket: 'nextfire-c98fc.appspot.com',
  messagingSenderId: '315286463529',
  appId: '1:315286463529:web:f4d868c90526877c7a6838',
  measurementId: 'G-GLE21WB9MM',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
