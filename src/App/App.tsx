import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import RootRouter from './RootRouter';
import PostService from '../Components/API/PostService';
import useFetching from '../hooks/useFetching';
import { TProductsItem, TProductPartialProps } from '../types/types';
import handleLocalStorage from '../Components/utils/handleLocalStorage';
import setDataToLocalStorage from '../Components/utils/setDataToLocalStorage';

function App() {
  const [
    productsInCart, setProductsInCart,
  ] = useState<TProductPartialProps[]>(handleLocalStorage());
  const [
    productsInCartCount, setProductsInCartCount,
  ] = useState<TProductPartialProps[]>(handleLocalStorage());
  const [products, setProducts] = useState<TProductsItem[] | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [fetchProductsById, isPending] = useFetching(async () => {
    const response = await PostService.getCartItems(productsInCart)
      .then((items) => items.map((item) => item));
    setProducts(response);
  });

  useEffect(() => {
    fetchProductsById();
  }, [productsInCart]);

  useEffect(() => {
    setDataToLocalStorage(productsInCartCount);
  }, [productsInCart]);

  const increaseProductCount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cur = Number(event.currentTarget.value);
    const maxCount = products?.reduce<number>((acc, product) => {
      if (product.id === cur) {
        return acc + product.stock;
      }
      return acc;
    }, 0);
    const result = productsInCartCount.map((product) => {
      if (maxCount && product.count === maxCount) {
        return product;
      }
      if (product.id === cur) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });
    setProductsInCartCount(result);
    setDataToLocalStorage(result);
  };

  const decreaseProductCount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cur = Number(event.currentTarget.value);
    const result = productsInCartCount.reduce<TProductPartialProps[]>((acc, product) => {
      if (product.id === cur && product.count === 1) {
        setProductsInCart(productsInCart.filter((el) => el.id !== cur));
        return acc;
      }
      if (product.id === cur) {
        acc.push({ ...product, count: product.count - 1 });
        return acc;
      }
      acc.push(product);
      return acc;
    }, []);
    setProductsInCartCount(result);
    setDataToLocalStorage(result);
  };

  const isProductInCart = (id?: number): boolean => productsInCart.some(
    (item) => item.id === id,
  );

  const addToCart = (id: number) => {
    if (!isProductInCart(id)) {
      setProductsInCart([...productsInCart, { id, count: 1 }]);
      setProductsInCartCount([...productsInCartCount, { id, count: 1 }]);
    }
  };

  const dropFromCart = (id: number) => {
    if (isProductInCart(id)) {
      setProductsInCart(productsInCart.filter((item) => item.id !== id));
      setProductsInCartCount(productsInCartCount.filter((item) => item.id !== id));
    }
  };

  return (
    <HashRouter>
      <RootRouter
        isPending={isPending}
        productsInCart={productsInCart}
        setProductsInCart={setProductsInCart}
        productsInCartCount={productsInCartCount}
        setProductsInCartCount={setProductsInCartCount}
        products={products}
        increaseProductCount={increaseProductCount}
        decreaseProductCount={decreaseProductCount}
        addToCart={addToCart}
        dropFromCart={dropFromCart}
        formVisible={formVisible}
        setFormVisible={setFormVisible}
      />
    </HashRouter>

  );
}

export default App;
