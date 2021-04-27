import React from 'react';
import styles from './ReviewItem.module.css';

const ReviewItem = ({ product }) => {
  const { name, quantity } = product;
  return (
    <div className={styles.reviewItem}>
      <h1 className={styles.productName}>{name}</h1>
      <p>Quantity: {quantity}</p>
    </div>
  );
};

export default ReviewItem;
