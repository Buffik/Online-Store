import React from 'react';
import styles from './cartPagination.module.scss';

interface ICartPagination {
  // eslint-disable-next-line no-unused-vars
  handleProductsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  productsPerPage: number
  maxPages: number
  currentPage: number
  goNextFromCurrentPage: () => void
  goBackFromCurrentPage: () => void
}

function CartPagination({
  handleProductsPerPage,
  productsPerPage,
  maxPages,
  currentPage,
  goNextFromCurrentPage,
  goBackFromCurrentPage,
}: ICartPagination) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>Limit:</span>
      {' '}
      <input className={styles.input} type="number" min="1" max="100" value={productsPerPage} onChange={(e) => handleProductsPerPage(e)} />
      <div>
        <button className={styles.paginateButton} type="button" onClick={() => goBackFromCurrentPage()}>{'<'}</button>
        <span className={styles.paginateText}>
          {' '}
          {currentPage}
          {' '}
          /
          {' '}
          {maxPages}
        </span>
        <button className={styles.paginateButton} type="button" onClick={() => goNextFromCurrentPage()}>{'>'}</button>
      </div>
    </div>
  );
}

export default CartPagination;
