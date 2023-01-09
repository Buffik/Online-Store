import React from 'react';
import { TProductPartialProps } from '../../../types/types';
import styles from './ProductAddDropButton.module.scss';

type ProductAddDropButtonProps = {
  productId: number | undefined;
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number | undefined): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number | undefined): void;
}

function ProductAddDropButton(props: ProductAddDropButtonProps) {
  const {
    productId,
    productsInCart,
    addToCart,
    dropFromCart,
  } = props;

  const isProductInCart = (id?: number): boolean => {
    if (productsInCart.find((item) => item.id === id)) {
      return true;
    }
    return false;
  };

  const handleClick = (): void => {
    if (isProductInCart(productId)) {
      dropFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleClick}
    >
      {(isProductInCart(productId)) ? 'Drop From Cart' : 'Add to Cart'}
    </button>
  );
}

export default ProductAddDropButton;
