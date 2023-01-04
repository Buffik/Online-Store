/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PostService from '../../Components/API/PostService';
import CartProduct from '../../Components/Cart/CartProduct/CartProduct';
import DeleteCode from '../../Components/Cart/Promo/handleCodes/DeleteCode';
import Promo from '../../Components/Cart/Promo/Promo';
import countTotalCost from '../../Components/utils/countTotalCost';
import countTotalCount from '../../Components/utils/countTotalCount';
import countTotalSumWithDiscounts from '../../Components/utils/countTotalSumWithDiscounts';
import useFetching from '../../hooks/useFetching';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import styles from './cart.module.scss';

function Cart() {
  const arr = [{ id: 1, count: 1 }, { id: 3, count: 1 }, { id: 4, count: 1 }, { id: 10, count: 1 }];
  const [productsInCart, setProductsInCart] = useState<TProductPartialProps[]>(arr);
  const [productsInCartCount, setProductsInCartCount] = useState<TProductPartialProps[]>(arr);
  const [products, setProducts] = useState<TProductsItem[] | null>(null);
  const [totalCount, setTotalCount] = useState(countTotalCount(arr));
  const [totalCost, setTotalCost] = useState(0);
  const [fetchProductsById, isPending] = useFetching(async () => {
    const response = await PostService.getCartItems(productsInCart).then((items) => items.map((item) => item));
    setProducts(response);
  });

  const [isCodeValid, setIsCodeValid] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isCodeAdd, setIsCodeAdd] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [codeAdded, setCodeAdded] = useState<number[]>([]);

  useEffect(() => {
    fetchProductsById();
  }, [productsInCart]);

  useEffect(() => {
    setTotalCount(countTotalCount(productsInCartCount));
  }, [productsInCartCount, productsInCart]);

  useEffect(() => {
    if (products) {
      setTotalCost(countTotalCost(products, productsInCartCount));
    }
  }, [productsInCartCount, products]);

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
    setProductsInCartCount(result);
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
  };

  const addPromoCode = (event: React.MouseEvent<HTMLButtonElement>, isAdd: boolean) => {
    setIsCodeAdd(isAdd);
    setIsCodeValid(false);
    const discountValue = Number(event.currentTarget.value);
    const result = [...codeAdded, discountValue];
    setCodeAdded(result);
  };

  const delPromoCode = (event: React.MouseEvent<HTMLButtonElement>, isAdd: boolean) => {
    if (codeAdded.length < 2) {
      setIsCodeAdd(isAdd);
    }
    const discountValue = Number(event.currentTarget.value);
    const result = codeAdded.filter((code) => code !== discountValue);
    setCodeAdded(result);
  };

  if (isPending) {
    return (
      <div>
        Is loading...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.productsWrapper}>
        { products?.map((product: TProductsItem, index) => (
          <CartProduct
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
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
        ))}
      </div>
      <div className={styles.summaryWrapper}>
        <h2>Summary</h2>
        <div className={styles.textSummary}>
          <span className={styles.textProducts}>Products:</span>
          {' '}
          {totalCount}
        </div>
        <div className={isCodeAdd ? styles.textSummaryLineThrough : styles.textSummary}>
          <span className={styles.textTotal}>Total:</span>
          {' '}
          €
          {' '}
          {totalCost}
          .00
        </div>
        {isCodeAdd ? (
          <div>
            <div className={styles.textSummaryWithDiscount}>
              <span className={styles.textTotal}>Total:</span>
              {' '}
              €
              {' '}
              {countTotalSumWithDiscounts(totalCost, codeAdded)}
            </div>
            <div>Applied codes</div>
            <div>
              {codeAdded.map((discount) => <DeleteCode key={discount} todo="DEL" discount={discount} setCode={delPromoCode} />)}
            </div>
          </div>
        ) : <h4>No applied codes</h4>}
        <Promo isCodeTrue={isCodeValid} currenCodes={codeAdded} setIsCodeTrue={setIsCodeValid} setIsCodeAdd={addPromoCode} />
      </div>
    </div>
  );
}

export default Cart;
