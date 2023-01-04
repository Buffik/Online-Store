/* eslint-disable max-len */
import React from 'react';
import { TProductsCart } from '../../../types/types';
import ProductCartButton from '../../UI/button/ProductCartButton';
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
      <img className={styles.infoImg} src={thumbnail} alt={title} />
      <div className={styles.infoWrapper}>
        <h3>{title}</h3>
        <hr />
        <p className={styles.textAbout}>{description}</p>

        <div>
          Category:
          {' '}
          {category}
        </div>
        <div>
          Brand:
          {' '}
          {brand}
        </div>
        <div className={styles.ratingWrapper}>
          <div>
            Rating:
            {' '}
            {rating}
          </div>
          <div>
            Discount:
            {' '}
            {discountPercentage}
          </div>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.textStock}>
          Available stock:
          {stock}
        </div>
        <ProductCartButton value={data.id} onClick={onClickHandlerIncrease}><div>+</div></ProductCartButton>
        <div className={styles.textCount}>{data.count}</div>
        <ProductCartButton value={data.id} onClick={onClickHandlerDecrease}><div>{data.count === 1 ? 'Delete from cart' : '-'}</div></ProductCartButton>
        <div className={styles.textPrice}>
          €
          {price * data.count}
          .00
        </div>
      </div>
    </div>

  );
}

export default CartProduct;
