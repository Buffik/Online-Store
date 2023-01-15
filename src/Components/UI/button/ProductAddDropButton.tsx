import React from 'react';
import { TProductPartialProps } from '../../../types/types';
import styles from './ProductAddDropButton.module.scss';

type ProductAddDropButtonProps = {
  productId: number | undefined;
  productsInCart: TProductPartialProps[];
  addToCart(id: number | undefined): void;
  dropFromCart(id: number | undefined): void;
}

function ProductAddDropButton(props: ProductAddDropButtonProps) {
  const {
    productId,
    productsInCart,
    addToCart,
    dropFromCart,
  } = props;

  const isInCart = productsInCart.some((item) => item.id === productId);

  const handleClick = (): void => {
    if (isInCart) {
      dropFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  return (
    <button
      className={(isInCart)
        ? [styles.button, styles.button_drop].join(' ')
        : styles.button}
      type="button"
      onClick={handleClick}
    >
      {(isInCart) ? 'Drop From Cart' : 'Add to Cart'}
    </button>
  );
}

export default ProductAddDropButton;
