import React from 'react';

const Cart = (props) => {
  const { cart } = props;
  const grandTotal = cart.reduce((total, product) => total + product.price, 0);
  return (
    <div>
      <h4>Order Summery</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Total Price: {grandTotal}</p>
    </div>
  );
};

export default Cart;
