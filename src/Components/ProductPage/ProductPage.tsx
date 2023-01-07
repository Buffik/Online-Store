/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import useFetching from '../../hooks/useFetching';
import { TProductPartialProps, TProductsItemWithImages } from '../../types/types';
import PostService from '../API/PostService';
import ProductAddDropButton from '../UI/button/ProductAddDropButton';
import styles from './productPage.module.scss';

interface IProductPage {
  id: number
  productsInCart: TProductPartialProps[]
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number | undefined): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number | undefined): void;
}

function ProductPage({
  id, productsInCart, addToCart, dropFromCart,
}: IProductPage) {
  const [currentPage, setCurrentPage] = useState<TProductsItemWithImages | null>(null);
  const [fetchProductById, isPending] = useFetching(async () => {
    // вспомнить про ошибку, перекинуть на 404 страницу при неверных данных
    const data = await PostService.getById(id);
    setCurrentPage(data);
  });

  useEffect(() => {
    fetchProductById();
  }, []);

  if (isPending) {
    return (
      <div>
        Is loading...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.breedsWrapper}>
        <div>home</div>
        <div>{currentPage?.category}</div>
        <div>{currentPage?.brand}</div>
        <div>{currentPage?.title}</div>
      </div>
      <div className={styles.productWrapper}>
        <h2>{currentPage?.title}</h2>
        <div className={styles.detailsWrapper}>
          <div className={styles.imagesWrapper}>
            <img src={currentPage?.images[0]} alt={currentPage?.title} />
            <div className={styles.imagesCarouselWrapper}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.infoWrapper}>
            <div>
              Stock:
              {' '}
              {currentPage?.stock}
            </div>
            <div>
              Brand:
              {' '}
              {currentPage?.stock}
            </div>
            <div>
              Description:
              {' '}
              {currentPage?.description}
            </div>
            <div>
              Rating:
              {' '}
              {currentPage?.rating}
            </div>
            <div>
              Category:
              {' '}
              {currentPage?.category}
            </div>
            <div>
              Discount Percentage:
              {' '}
              {currentPage?.discountPercentage}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <div>
              Price €
              {' '}
              {currentPage?.price}
              .00
            </div>
            <button type="button">Buy now</button>
            <ProductAddDropButton
              productId={id}
              productsInCart={productsInCart}
              addToCart={addToCart}
              dropFromCart={dropFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
