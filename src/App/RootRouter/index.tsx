import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Cart from '../../Pages/Cart/cart';
import Main from '../../Pages/Main';
import Other from '../../Pages/Other';
import PageNotFound from '../../Pages/PageNotFound';
import { TProductsItem, TProductPartialProps } from '../../types/types';

// Компонент который осуществляет роутинг по страницам SPA,
// header вынесен из роутов,то он будет постоянным
// Можно сдеать каждому компоненту к которому мы роутим свой хедер внутри компонента,
// если нам нужен индивидуальный хедер на каждой страницы или убрать где-то хедер
// type TCartItem = {
//   id: number;
//   count: number;
// }

type TProps = {
  // productsInCart: TProductPartialProps[];
  productsInCartCount: TProductPartialProps[];
  products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default function RootRouter(props: TProps) {
  const {
    productsInCartCount, products, increaseProductCount, decreaseProductCount,
  } = props;
  return (
    <div>
      <Header productsInCartCount={productsInCartCount} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/other" element={<Other />} />
        <Route
          path="/cart"
          element={(
            <Cart
              // productsInCart={productsInCart}
              productsInCartCount={productsInCartCount}
              products={products}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
            />
          )}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
