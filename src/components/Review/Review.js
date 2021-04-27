import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProduct = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      return product;
    });
    console.log(cartProduct);
  }, []);
  return (
    <div>
      <h1>This is review</h1>
    </div>
  );
};
export default Review;
