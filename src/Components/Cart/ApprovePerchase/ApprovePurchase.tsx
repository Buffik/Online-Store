import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TProductPartialProps } from '../../../types/types';
import styles from './approvePurchase.module.css';

interface IApprovePurchase {
  showAffirmative: boolean
  // eslint-disable-next-line no-unused-vars
  setFormVisible(bool:boolean): void;
  // eslint-disable-next-line no-unused-vars
  setProductsInCart(arr: TProductPartialProps[]): void;
  // eslint-disable-next-line no-unused-vars
  setProductsInCartCount(arr: TProductPartialProps[]): void;
}

function ApprovePurchase({
  showAffirmative,
  setFormVisible,
  setProductsInCart,
  setProductsInCartCount,
}: IApprovePurchase) {
  const time = 3;
  if (showAffirmative) {
    window.localStorage.clear();
    const history = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        setFormVisible(false);
        setProductsInCart([]);
        setProductsInCartCount([]);
        history('/', { replace: true });
      }, 3000);
    }, []);
  }
  return (
    <h1 className={styles.text}>
      Thank you dor order! redirecting in
      {' '}
      {time}
      s...
    </h1>
  );
}

export default ApprovePurchase;
