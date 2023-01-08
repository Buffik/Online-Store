import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/header';
import ProductPage from '../../Components/ProductPage/ProductPage';
import Cart from '../../Pages/Cart/cart';
import Main from '../../Pages/Main';
import PageNotFound from '../../Pages/PageNotFound';
import { TProductsItem, TProductPartialProps } from '../../types/types';

type TRootRouterProps = {
  isPending: boolean;
  productsInCart: TProductPartialProps[];
  productsInCartCount: TProductPartialProps[];
  products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
}

export default function RootRouter(props: TRootRouterProps) {
  const {
    isPending,
    productsInCart,
    productsInCartCount,
    products,
    increaseProductCount,
    decreaseProductCount,
    addToCart,
    dropFromCart,
  } = props;
  return (
    <div>
      <Header productsInCart={productsInCartCount} products={products} />
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              productsInCart={productsInCart}
              addToCart={addToCart}
              dropFromCart={dropFromCart}
            />
          )}
        />
        <Route path="/product/:id" element={<ProductPage productsInCart={productsInCart} addToCart={addToCart} dropFromCart={dropFromCart} />} />
        <Route
          path="/cart"
          element={(
            <Cart
              productsInCart={productsInCart}
              isPending={isPending}
              productsInCartCount={productsInCartCount}
              products={products}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
            />
          )}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
