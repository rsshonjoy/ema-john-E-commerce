import React, { useEffect } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const counts = productKeys.map((key) => savedCart[key]);
    console.log(counts);
  }, []);
  return (
    <div>
      <h1>This is review</h1>
    </div>
  );
};
export default Review;
