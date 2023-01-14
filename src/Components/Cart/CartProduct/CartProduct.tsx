/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { TProductsCart } from '../../../types/types';
import ProductCartButton from '../../UI/button/ProductCartButton';
import LoadingSpinner from '../../UI/LoadingSpinner';
import formatPrice from '../../utils/formatPrice';
import styles from './CartProduct.module.scss';

function CartProduct(props:TProductsCart) {
  // eslint-disable-next-line max-len
  const {
    productIndex,
    id,
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
      <div style={{
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className={styles.cardProduct}>
      <div className={styles.productIndex}>{productIndex}</div>
      <Link to={`/product/${id}`} className={styles.dataLinkWrapper}>
        <img className={styles.infoImg} src={thumbnail} alt={title} />
        <div className={styles.infoWrapper}>
          <h3 className={styles.infoHeader}>{title}</h3>
          <hr />
          <p className={styles.textAbout}>{description}</p>
          <div className={styles.subtitlesWrapper}>
            <div className={styles.subtitlesWrapperFirstLine}>
              <div>
                <span className={styles.infoHeaders}>Category:</span>
                {' '}
                <span>{category}</span>
              </div>
              <div>
                <span className={styles.infoHeaders}>Brand:</span>
                {' '}
                <span>
                  {brand}
                </span>
              </div>
            </div>
            <div className={styles.subtitlesWrapperSecondLine}>
              <div>
                <span className={styles.infoHeaders}>Rating:</span>
                {' '}
                <span>{rating}</span>
              </div>
              <div>
                <span className={styles.infoHeaders}>Discount:</span>
                {' '}
                <span>
                  {discountPercentage}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.buttonsWrapper}>
        <div className={styles.textStock}>
          {'Available stock: '}
          {stock}
        </div>
        <ProductCartButton value={id} onClick={onClickHandlerIncrease}><div>+</div></ProductCartButton>
        <div className={styles.textCount}>{data.count}</div>
        <ProductCartButton value={id} onClick={onClickHandlerDecrease}><div>{data.count === 1 ? 'Delete from cart' : '-'}</div></ProductCartButton>
        <div className={styles.textPrice}>
          {formatPrice(price * data.count)}
        </div>
      </div>
    </div>

  );
}

export default CartProduct;
