/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import happyImage from '../../images/giphy.gif';
import {
  getDatabaseCart,
  processOrder,
  // eslint-disable-next-line prettier/prettier
  removeFromDatabaseCart
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import styles from './Review.module.css';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
    history.push('/shipment');
  };

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
  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.productContainer}>
        {cart.map((product) => (
          <ReviewItem key={product.key} product={product} removeProduct={removeProduct} />
        ))}
        {thankYou}
      </div>
      <div>
        <Cart cart={cart}>
          <button type="button" onClick={handleProceedCheckout} className={styles.cartButton}>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};
export default Review;
