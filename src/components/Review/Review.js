import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import styles from './Review.module.css';

const Review = () => {
  const [cart, setCart] = useState([]);
  const removeProduct = (productKey) => {
    console.log('remove clicked', productKey);
    const newCart = cart.filter((product) => product.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const cartProduct = productKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProduct);
  }, []);
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.productContainer}>
        {cart.map((product) => (
          <ReviewItem key={product.key} product={product} removeProduct={removeProduct} />
        ))}
      </div>
      <div>
        <Cart cart={cart} />
      </div>
    </div>
  );
};
export default Review;
