import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/header';
import ProductPage from '../../Components/ProductPage/ProductPage';
import Cart from '../../Pages/Cart/cart';
import Main from '../../Pages/Main';
import PageNotFound from '../../Pages/PageNotFound';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import styles from './RootRouter.module.scss';

type TRootRouterProps = {
  isPending: boolean;
  // productsInCart: TProductPartialProps[];
  // setProductsInCart(arr: TProductPartialProps[]): void;
  productsInCartCount: TProductPartialProps[];
  setProductsInCartCount(arr: TProductPartialProps[]): void;
  products: TProductsItem[] | null;
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  addToCart(id: number): void;
  dropFromCart(id: number): void;
  formVisible: boolean;
  setFormVisible(bool:boolean): void;
}

export default function RootRouter(props: TRootRouterProps) {
  const {
    isPending,
    productsInCartCount,
    setProductsInCartCount,
    products,
    increaseProductCount,
    decreaseProductCount,
    addToCart,
    dropFromCart,
    formVisible,
    setFormVisible,
  } = props;
  return (
    <div className={styles.container}>
      <Header
        productsInCart={productsInCartCount}
        products={products}
      />
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              productsInCart={productsInCartCount}
              addToCart={addToCart}
              dropFromCart={dropFromCart}
            />
          )}
        />
        <Route
          path="/product/:id"
          element={(
            <ProductPage
              productsInCart={productsInCartCount}
              addToCart={addToCart}
              dropFromCart={dropFromCart}
              setFormVisible={setFormVisible}
            />
          )}
        />
        <Route
          path="/cart"
          element={(
            <Cart
              isPending={isPending}
              productsInCartCount={productsInCartCount}
              setProductsInCartCount={setProductsInCartCount}
              products={products}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
              formVisible={formVisible}
              setFormVisible={setFormVisible}
            />
          )}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
      <Footer />
    </div>
  );
}
