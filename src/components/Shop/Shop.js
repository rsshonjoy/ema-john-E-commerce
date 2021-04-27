/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import styles from './Shop.module.css';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className={styles.shopContainer}>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart
            handleAddProduct={handleAddProduct}
            product={product}
          />
        ))}
      </div>
      <div>
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Shop;
