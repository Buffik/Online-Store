import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TProductPartialProps } from '../../../types/types';
import SiteContainer from '../../UI/container/SiteContainer';
import LoadingSpinner from '../../UI/LoadingSpinner';
import styles from './approvePurchase.module.scss';

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
      }, 5000);
    }, []);
  }
  return (
    <SiteContainer>
      <h1 className={styles.text}>
        Thank you for the order! Redirecting in
        {' '}
        {time}
        s...
      </h1>
      <LoadingSpinner />
    </SiteContainer>
  );
}

export default ApprovePurchase;
