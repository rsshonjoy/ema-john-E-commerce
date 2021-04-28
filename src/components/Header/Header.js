import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.header}>
    <img className={styles.logo} src={logo} alt="" />
    <nav className={styles.nav}>
      <Link to="/shop">Shop</Link>
      <Link to="/review">Order Review</Link>
      <Link to="/inventory">Manage Inventory</Link>
    </nav>
  </div>
);

export default Header;
