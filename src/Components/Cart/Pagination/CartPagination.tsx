import React from 'react';

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
    <div>
      Limit:
      {' '}
      <input type="number" min="1" max="100" value={productsPerPage} onChange={(e) => handleProductsPerPage(e)} />
      <div>
        <button type="button" onClick={() => goBackFromCurrentPage()}>{'<'}</button>
        {currentPage}
        {' '}
        /
        {' '}
        {maxPages}
        <button type="button" onClick={() => goNextFromCurrentPage()}>{'>'}</button>
      </div>
    </div>
  );
}

export default CartPagination;
