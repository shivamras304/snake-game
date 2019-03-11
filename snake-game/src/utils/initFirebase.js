import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyBc3wyVR4TULTkuiS9j1XBXQ_4ZcTGV6cY',
  authDomain: 'sr-snake-game.firebaseapp.com',
  projectId: 'sr-snake-game'
});

export default firebase