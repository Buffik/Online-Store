/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PostService from '../../Components/API/PostService';
import CartProduct from '../../Components/CartProduct/CartProduct';
import useFetching from '../../hooks/useFetching';
import { TProductsItem, TProductPartialProps } from '../../types/types';

function Cart() {
  const arr = [{ id: 1, count: 1 }, { id: 3, count: 1 }, { id: 4, count: 1 }, { id: 10, count: 1 }];
  const [productsInCart, setProductsInCart] = useState<TProductPartialProps[]>(arr);
  const [productsInCartCount, setproductsInCartCount] = useState<TProductPartialProps[]>(arr);
  const [products, setProducts] = useState<TProductsItem[] | null>(null);
  const [fetchProductsById] = useFetching(async () => {
    const response = await PostService.getCartItems(productsInCart).then((items) => items.map((item) => item));
    setProducts(response);
  });

  useEffect(() => {
    fetchProductsById();
  }, [productsInCart]);

  const increaseProductCount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cur = Number(event.currentTarget.value);
    const maxCount = products?.reduce<number>((acc, product) => {
      if (product.id === cur) {
        // eslint-disable-next-line no-param-reassign
        acc += product.stock;
        return acc;
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
