import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import styles from './Shop.module.css';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);

  const handleAddProduct = () => {
    console.log('product added');
  };
  return (
    <div className={styles.shopContainer}>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <Product handleAddProduct={handleAddProduct} product={product} />
        ))}
      </div>
      <div>
        <h1>this is cart</h1>
      </div>
    </div>
  );
};

export default Shop;
