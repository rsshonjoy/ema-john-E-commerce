import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = (props) => {
  const { cart } = props;
  // const grandTotal = cart.reduce((total, product) => total + product.price, 0);

  let total = 0;
  for (let i = 0; i < cart.length; i += 1) {
    const product = cart[i];
    total += product.price * product.quantity;
  }

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  const tax = total / 10;
  const grandTotal = total + shipping + tax;

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  return (
    <div>
      <h4>Order Summery</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: {formatNumber(total)}</p>
      <p>
        <small>Shipping Cost: {formatNumber(shipping)}</small>
      </p>
      <p>
        <small>Tax + VAT: {formatNumber(tax)}</small>
      </p>
      <p>Total Price: {formatNumber(grandTotal)}</p>
      <br />
      <Link to="/review">
        <button type="button" className={styles.cartButton}>
          Order Review
        </button>
      </Link>
    </div>
  );
};

export default Cart;
