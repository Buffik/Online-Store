/* eslint-disable max-len */
import React from 'react';
// import React, { useEffect, useState } from 'react';
// import PostService from '../../Components/API/PostService';
import CartProduct from '../../Components/CartProduct/CartProduct';
// import useFetching from '../../hooks/useFetching';
import { TProductsItem, TProductPartialProps } from '../../types/types';

type TCartProps = {
  productsInCartCount: TProductPartialProps[];
  products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
}

function Cart(props: TCartProps) {
  const {
    productsInCartCount, products, increaseProductCount, decreaseProductCount,
  } = props;

  // eslint-disable-next-line max-len
  return (
    <div>
      {!products ? (
        <>Is Loading...</>
      ) : (
        products.map((product: TProductsItem, index) => (
          <CartProduct
            key={product.id}
            title={product.title}
            description={product.description}
            price={0}
            category={product.category}
            brand={product.brand}
            discountPercentage={product.discountPercentage}
            rating={product.rating}
            stock={product.stock}
            thumbnail={product.thumbnail}
            onClickHandlerIncrease={increaseProductCount}
            onClickHandlerDecrease={decreaseProductCount}
            data={productsInCartCount[index]}
          />
        ))
      )}
    </div>
  );
}

export default Cart;
