import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import RootRouter from './RootRouter';
import PostService from '../Components/API/PostService';
import useFetching from '../hooks/useFetching';
import { TProductsItem, TProductPartialProps } from '../types/types';
// import { isTemplateExpression } from 'typescript';

function App() {
  const arr = [{ id: 1, count: 1 }, { id: 3, count: 1 }, { id: 4, count: 1 }];
  const [productsInCart, setProductsInCart] = useState<TProductPartialProps[]>(arr);
  const [productsInCartCount, setproductsInCartCount] = useState<TProductPartialProps[]>(arr);
  const [products, setProducts] = useState<TProductsItem[] | null>(null);
  const [fetchProductsById] = useFetching(async () => {
    const response = await PostService.getCartItems(productsInCart)
      .then((items) => items.map((item) => item));
    setProducts(response);
  });

  useEffect(() => {
    fetchProductsById();
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
    setproductsInCartCount(result);
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
    setproductsInCartCount(result);
  };

  const isProductInCart = (id?: number): boolean => {
    if (productsInCart.find((item) => item.id === id)) {
      return true;
    }
    return false;
  };

  const addToCart = (id: number) => {
    if (!isProductInCart(id)) {
      setProductsInCart([...productsInCart, { id, count: 1 }]);
      setproductsInCartCount([...productsInCartCount, { id, count: 1 }]);
    }
  };

  const dropFromCart = (id: number) => {
    if (isProductInCart(id)) {
      setProductsInCart(productsInCart.filter((item) => item.id !== id));
      setproductsInCartCount(productsInCartCount.filter((item) => item.id !== id));
    }
  };

  return (
    <HashRouter>
      <RootRouter
        productsInCart={productsInCart}
        productsInCartCount={productsInCartCount}
        products={products}
        increaseProductCount={increaseProductCount}
        decreaseProductCount={decreaseProductCount}
        addToCart={addToCart}
        dropFromCart={dropFromCart}
      />
    </HashRouter>

  );
}

export default App;
