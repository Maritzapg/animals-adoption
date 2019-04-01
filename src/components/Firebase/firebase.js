import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDhxBsQI6a7X7BCM3Wk42yu1wDUt8C3ilY",
    authDomain: "animals-adoption.firebaseapp.com",
    databaseURL: "https://animals-adoption.firebaseio.com",
    projectId: "animals-adoption",
    storageBucket: "animals-adoption.appspot.com",
    messagingSenderId: "478854852573"
};
//firebase.initializeApp(config);

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
  }
  
  export default Firebase;