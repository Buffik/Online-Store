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
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  setProductsInCart(arr: TProductPartialProps[]): void;
  productsInCartCount: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  setProductsInCartCount(arr: TProductPartialProps[]): void;
  products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
  formVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setFormVisible(bool:boolean): void;
}

export default function RootRouter(props: TRootRouterProps) {
  const {
    isPending,
    productsInCart,
    setProductsInCart,
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
        <Route path="/product/:id" element={<ProductPage productsInCart={productsInCart} addToCart={addToCart} dropFromCart={dropFromCart} setFormVisible={setFormVisible} />} />
        <Route
          path="/cart"
          element={(
            <Cart
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
