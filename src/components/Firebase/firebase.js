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

    doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000'//process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if(dbUser !== null)
            {
              if (!dbUser.roles) {
                dbUser.roles = [];
              }
            }
            

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
            ...dbUser,
            };

            next(authUser);
            });
        } else {
          fallback();
        }
    });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
  }
  
  export default Firebase;