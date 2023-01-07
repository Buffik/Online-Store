import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './approvePurchase.module.css';

interface IApprovePurchase {
  showAffirmative: boolean
}

function ApprovePurchase({ showAffirmative }: IApprovePurchase) {
  const time = 3;
  if (showAffirmative) {
    const history = useNavigate();
    useEffect(() => {
      setTimeout(() => {
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
