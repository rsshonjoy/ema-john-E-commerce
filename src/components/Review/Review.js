import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

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
    <div>
      <h1>Cart Items: {cart.length}</h1>
      {cart.map((product) => (
        <ReviewItem key={product.key} product={product} removeProduct={removeProduct} />
      ))}
    </div>
  );
};
export default Review;
