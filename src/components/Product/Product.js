/* eslint-disable react/destructuring-assignment */
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Product.module.css';

const Product = (props) => {
  const { img, name, seller, price, stock } = props.product;
  // console.log(props);
  return (
    <div className={styles.product}>
      <div>
        <img src={img} alt="" />
      </div>
      <div className={styles.productInfo}>
        <h4 className={styles.productName}>{name}</h4>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only: {stock} left in stock - Order Soon</small>
        </p>
        <button
          onClick={() => props.handleAddProduct(props.product)}
          className={styles.cartButton}
          type="button"
        >
          <FontAwesomeIcon icon={faShoppingCart} /> add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
