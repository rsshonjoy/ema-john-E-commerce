/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from './ReviewItem.module.css';

const ReviewItem = (props) => {
  // console.log(props);
  const { name, quantity, key } = props.product;
  return (
    <div className={styles.reviewItem}>
      <h1 className={styles.productName}>{name}</h1>
      <p>Quantity: {quantity}</p>
      <br />
      <button type="button" className={styles.cartButton} onClick={() => props.removeProduct(key)}>
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
