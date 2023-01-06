/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import PostService from '../../Components/API/PostService';
import CartProduct from '../../Components/Cart/CartProduct/CartProduct';
import CartPagination from '../../Components/Cart/Pagination/CartPagination';
import DeleteCode from '../../Components/Cart/Promo/handleCodes/DeleteCode';
import Promo from '../../Components/Cart/Promo/Promo';
import Modal from '../../Components/Cart/PurchaseModal/Modal';
import Purchase from '../../Components/Cart/PurchaseModal/Purchase/Purchase';
// eslint-disable-next-line no-unused-vars
import countTotalCost from '../../Components/utils/countTotalCost';
import countTotalCount from '../../Components/utils/countTotalCount';
import countTotalSumWithDiscounts from '../../Components/utils/countTotalSumWithDiscounts';
// import useFetching from '../../hooks/useFetching';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import styles from './cart.module.scss';

type TCartProps = {
  productsInCart: TProductPartialProps[]
  isPending: boolean;
  productsInCartCount: TProductPartialProps[];
  products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
}

function Cart(props: TCartProps) {
  const {
    productsInCart, isPending, productsInCartCount, products, increaseProductCount, decreaseProductCount,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [totalCount, setTotalCount] = useState(countTotalCount(productsInCartCount));
  // eslint-disable-next-line no-unused-vars
  const [totalCost, setTotalCost] = useState(0);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeAdd, setIsCodeAdd] = useState(false);
  const [codeAdded, setCodeAdded] = useState<number[]>([]);

  //  Блок с пагинацией

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStateToProductsPerPage = Number(searchParams.get('limit')) || 3;
  const initialStateToCurrentPage = Number(searchParams.get('page')) || 1;

  const [currentPage, setCurrentPage] = useState(initialStateToCurrentPage);
  const [productsPerPage, setProductsPerPage] = useState(initialStateToProductsPerPage);

  const handleProductsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currenValue = Number(event.target.value);
    if (products && currenValue <= products.length) {
      setProductsPerPage(currenValue);
    }
  };

  const params = { limit: productsPerPage.toString(), page: currentPage.toString() };

  let lastProductIndex = currentPage * productsPerPage;
  let firstProductIndex = lastProductIndex - productsPerPage;
  let maxPages = 1;
  if (products && products.length) {
    maxPages = Math.ceil(products.length / productsPerPage);
  }
  useEffect(() => {
    setSearchParams(params);
    lastProductIndex = currentPage * productsPerPage;
    firstProductIndex = lastProductIndex - productsPerPage;
  }, [currentPage, productsPerPage, products]);

  const currentProducts = products?.slice(firstProductIndex, lastProductIndex);

  const goNextFromCurrentPage = () => {
    if (currentPage <= maxPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goBackFromCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (currentProducts && !currentProducts.length) {
    goBackFromCurrentPage();
  }
  //  Конец блока с пагинацией

  useEffect(() => {
    setTotalCount(countTotalCount(productsInCartCount));
  }, [productsInCartCount, productsInCart]);

  useEffect(() => {
    if (products) {
      setTotalCost(countTotalCost(products, productsInCartCount));
    }
  }, [productsInCartCount, products]);

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

  if (!products?.length) {
    return (
      <div>
        Cart is empty
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.productsWrapper}>
        <CartPagination handleProductsPerPage={handleProductsPerPage} productsPerPage={productsPerPage} maxPages={maxPages} currentPage={currentPage} goNextFromCurrentPage={goNextFromCurrentPage} goBackFromCurrentPage={goBackFromCurrentPage} />
        { currentProducts?.map((product: TProductsItem, index) => (
          <CartProduct
            key={product.id}
            productIndex={index + 1 + firstProductIndex}
            id={product.id}
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
            data={productsInCartCount[index + firstProductIndex]}
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
      <Modal
        visible
        setVisible={(bool) => { console.log(bool); }}
      >
        <Purchase />

      </Modal>
    </div>
  );
}

export default Cart;
