/* eslint-disable max-len */
import React from 'react';
import { TProductsCart } from '../../types/types';
import ProductCartButton from '../UI/button/ProductCartButton';
import styles from './CartProduct.module.scss';

function CartProduct(props:TProductsCart) {
  // eslint-disable-next-line max-len
  const {
    title,
    description,
    price,
    category,
    brand,
    discountPercentage,
    rating,
    stock,
    thumbnail,
    onClickHandlerIncrease,
    data,
    onClickHandlerDecrease,
  } = props;
  if (!data) {
    return (
      <div>Is loading</div>
    );
  }
  return (
    <div className={styles.cardProduct}>
      <img src={thumbnail} alt={title} />
      <div className={styles.infoWrapper}>
        <h2>{title}</h2>
        <hr />
        <p>{description}</p>
        <div>{price}</div>
        <div>{category}</div>
        <div>{brand}</div>
        <div>{discountPercentage}</div>
        <div>{rating}</div>
        <div>{stock}</div>
      </div>
      <ProductCartButton value={data.id} onClick={onClickHandlerIncrease}><div>+</div></ProductCartButton>
      <div>{data.count}</div>
      <ProductCartButton value={data.id} onClick={onClickHandlerDecrease}><div>{data.count === 1 ? 'Delete from cart' : '-'}</div></ProductCartButton>
    </div>
  );
}

export default CartProduct;
