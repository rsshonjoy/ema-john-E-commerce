/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
// eslint-disable-next-line import/no-cycle
import { UserContext } from '../../App';
import firebaseConfig from './firebaseConfig';
import styles from './Login.module.css';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const LogIn = () => {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/shipment' } };

  const [newUser, setNewUser] = useState(false);

  // email and password auth
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasValid = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
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

    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(res.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info', res.user, loggedInUser);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  // const updateUserName = (name) => {
  //     const user = firebase.auth().currentUser;

  //     user.updateProfile({
  //         displayName: name,
  //     })
  //         .then(() => {
  //             console.log('sign in user successfully');
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // };

  // google auth
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
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
        };
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSignOut = () => {
  //     firebase
  //         .auth()
  //         .signOut()
  //         .then(() => {
  //             const signOutUer = {
  //                 isSignIn: false,
  //                 name: '',
  //                 email: '',
  //                 photo: '',
  //                 error: '',
  //                 success: false,
  //             };
  //             setUser(signOutUer);
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // };
  return (
    <div className={styles.pagesBody}>
      {/* {user.isSignIn ? (
                <button type="button" onClick={handleSignOut}>
                    Sign Out
                </button>
            ) : (
                <button type="button" onClick={handleGoogleSignIn}>
                    Sign In
                </button>
            )}

            {user.isSignIn && (
                <div>
                    <h3>Welcome, {user.name}</h3>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            )} */}
      <br />
      <br />

      {/* Login form */}
      {/* <h3>Welcome, {user.name}</h3>
            <p>Your email: {user.email}</p>
            <p>Your password: {user.password}</p> */}
      <form className={styles.loginBox} action="index.html" method="post" onSubmit={handleSubmit}>
        <h1>{newUser ? 'Sign Up' : 'Sign In'}</h1>
        {newUser && (
          <input type="text" name="name" onBlur={handleBlur} placeholder="Name" required />
        )}
        <input type="text" name="email" onBlur={handleBlur} placeholder="Username" required />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Password"
          required
        />
        <input type="submit" name="" value={newUser ? 'Sign Up' : 'Sign In'} />
        <p className={styles.socialText}>Or Sign up with social platforms</p>
        <div className={styles.socialMedia}>
          <button type="button" className={styles.socialIcon} onClick={handleGoogleSignIn}>
            <i className="fab fa-google" />
          </button>
          <button type="button" className={styles.socialIcon}>
            <i className="fab fa-facebook-f" />
          </button>
          <button type="button" className={styles.socialIcon}>
            <i className="fab fa-twitter" />
          </button>
          <button type="button" className={styles.socialIcon}>
            <i className="fab fa-linkedin-in" />
          </button>
        </div>
        <div className={styles.link}>
          <a href="{#}">Forgot password?</a> or{' '}
          <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
          <label htmlFor="newUser">{newUser ? 'Sign In' : 'Sign Up'}</label>
        </div>
        <p style={{ color: 'red' }}>{user.error}</p>
        {user.success && (
          <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
