import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDhxBsQI6a7X7BCM3Wk42yu1wDUt8C3ilY",//process.env.REACT_APP_KEY,//
    authDomain: "animals-adoption.firebaseapp.com",//process.env.REACT_APP_AUTH_DOMAIN,//
    databaseURL: "https://animals-adoption.firebaseio.com",//process.env.REACT_APP_DATABASE_URL,//
    projectId: "animals-adoption",//process.env.REACT_APP_PROJECT_ID,//
    storageBucket: "animals-adoption.appspot.com",//process.env.REACT_APP_STORAGE_BUCKET,//
    messagingSenderId: "478854852573"//process.env.REACT_APP_MESSAGING_SENDER_ID,//
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
            url: 'https://animals-adoption.firebaseapp.com'//process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,//'http://localhost:3000'//
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
                        if (dbUser !== null) {
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

    // *** Pet API ***
    pet = (uid) => this.db.ref(`pets/${uid}`);

    pets = () => this.db.ref('pets');

    // *** Form adoption API ***
    adoptionForm = (uid) => this.db.ref(`adoptionForms/${uid}`);

    adoptionForms = () => this.db.ref('adoptionForms');
}

export default Firebase;