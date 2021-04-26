/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
  const { productKey } = useParams();
  const product = fakeData.find((pd) => pd.key === productKey);
  console.log(product);
  return (
    <div>
      <h1>Your Product detail</h1>
      <Product showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetail;
