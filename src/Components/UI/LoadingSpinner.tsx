import React from 'react';
import styles from './LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <section className={styles.container}>
      <div className={styles.spinner} />
    </section>
  );
}

export default LoadingSpinner;
