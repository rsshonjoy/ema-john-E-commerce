/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
// eslint-disable-next-line import/no-cycle
import { UserContext } from '../../App';
import styles from './Login.module.css';
import {
  createUserWithEmailAddPassword,
  handleGoogleSignIn,
  handleSignOut,
  initializeLogin,
  // eslint-disable-next-line prettier/prettier
  signInWithEmailAndPassword
} from './LoginManager';

const LogIn = () => {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  initializeLogin();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // private route
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/shipment' } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
    });
  };

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
    if (newUser && user.email && user.password) {
      createUserWithEmailAddPassword().then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
    e.preventDefault();
  };

  return (
    <div className={styles.pagesBody}>
      {user.isSignIn ? (
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button type="button" onClick={googleSignIn}>
          Sign In
        </button>
      )}

      {user.isSignIn && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
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
          <button type="button" className={styles.socialIcon} onClick={googleSignIn}>
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
