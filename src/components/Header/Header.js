/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import styles from './Header.module.css';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} alt="" />
      <nav className={styles.nav}>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button type="button" className={styles.logOut} onClick={() => setLoggedInUser({})}>
          Sign Out
        </button>
      </nav>
    </div>
  );
};
export default Header;
