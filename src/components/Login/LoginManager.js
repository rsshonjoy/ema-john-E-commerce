import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

export const initializeLogin = () => {
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // } else {
  //   firebase.app();
  // }
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      console.log(result);
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email,
        photo: photoURL,
        success: true,
      };
      return signInUser;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleSignOut = () =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      const signOutUer = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
      };
      return signOutUer;
    })
    .catch((error) => {
      console.log(error);
    });

const updateUserName = (name) => {
  const firebaseUser = firebase.auth().currentUser;

  firebaseUser
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log('sign in user successfully');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createUserWithEmailAddPassword = (name, email, password) =>
  firebase
    .auth()
    .createUserWithEmailAddPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      // setUser(newUserInfo);
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });

export const signInWithEmailAndPassword = (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
