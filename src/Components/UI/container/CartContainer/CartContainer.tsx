import React from 'react';
import styles from './cartContainer.module.scss';

type TSiteContainer = {
  children: React.ReactNode;
}

function CartContainer(props: TSiteContainer) {
  const { children } = props;
  return (
    <div className={styles.container}>{children}</div>
  );
}

export default CartContainer;
