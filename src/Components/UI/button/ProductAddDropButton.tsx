import React from 'react';
import { TProductPartialProps } from '../../../types/types';

type ProductAddDropButtonProps = {
  value: number | undefined;
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number | undefined): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number | undefined): void;
}

function ProductAddDropButton(props: ProductAddDropButtonProps) {
  const {
    value,
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
    if (isProductInCart(value)) {
      dropFromCart(value);
    } else {
      addToCart(value);
    }
  };

  return (
    <button type="button" value={value} onClick={handleClick}>
      {(isProductInCart(value)) ? 'Drop From Cart' : 'Add to Cart'}
    </button>
  );
}

export default ProductAddDropButton;
