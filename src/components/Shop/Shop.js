import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import styles from './Shop.module.css';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);
  console.log(first10);
  return (
    <div className={styles.shopContainer}>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
      <div>
        <h1>this is cart</h1>
      </div>
    </div>
  );
};

export default Shop;
