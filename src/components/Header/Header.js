import React from 'react';
import logo from '../../images/logo.png';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.header}>
    <img className={styles.logo} src={logo} alt="" />
    <nav className={styles.nav}>
      <a href="/shop">Shop</a>
      <a href="/review">Order Review</a>
      <a href="/inventory">Manage Inventory</a>
    </nav>
  </div>
);

export default Header;
