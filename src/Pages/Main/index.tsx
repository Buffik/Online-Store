import React, { useEffect, useState } from 'react';
import FiltersList from '../../Components/Main/FiltersList';
import ProductsList from '../../Components/Main/ProductsList';
// import TestForMain from '../../Components/TestForMain';
import { TProductPartialProps } from '../../types/types';

type TMainProps = {
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
}

function Main(props: TMainProps) {
  const { productsInCart, addToCart, dropFromCart } = props;
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    const productsList = await response.json();
    setProducts(productsList.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main style={{ display: 'flex', gap: '50px' }}>
      <FiltersList products={products} />
      <ProductsList
        productsInCart={productsInCart}
        addToCart={addToCart}
        dropFromCart={dropFromCart}
        products={products}
      />
    </main>
  );
}

export default Main;
