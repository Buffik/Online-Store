import React from 'react';
import { Link } from 'react-router-dom';
import ProductAddDropButton from '../UI/button/ProductAddDropButton';
import formatPrice from '../utils/formatPrice';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import styles from './ProductsList.module.scss';

type TProductsListProps = {
  productsInCart: TProductPartialProps[];
  addToCart(id: number): void;
  dropFromCart(id: number): void;
  products: TProductsItem[];
  view: string;
}

export default function ProductsList(props: TProductsListProps) {
  const {
    productsInCart,
    addToCart,
    dropFromCart,
    products,
    view,
  } = props;
  const productsView = (view === 'list') ? styles.products_list : styles.products_grid;
  return (
    <section className={[styles.products, productsView].join(' ')}>
      {
        (!products.length)
          ? 'No products found'
          : products.map((product) => (
            <section key={product.id} className={styles.product}>
              <Link to={`/product/${product.id}`}>
                <img
                  className={styles.product__image}
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={150}
                />
              </Link>
              <div className={styles.product__secondColumn}>
                <h3 className={styles.product__title}>
                  <Link className={styles.product__title__link} to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <dl className={styles.product__parameter}>
                  <dt className={styles.product__parameter__title}>Category: </dt>
                  <dd>{product.category}</dd>
                </dl>
                <dl className={styles.product__parameter}>
                  <dt className={styles.product__parameter__title}>Brand: </dt>
                  <dd>{product.brand}</dd>
                </dl>
                <dl className={styles.product__parameter}>
                  <dt className={styles.product__parameter__title}>Discount: </dt>
                  <dd>
                    {product.discountPercentage}
                    %
                  </dd>
                </dl>
                <dl className={styles.product__parameter}>
                  <dt className={styles.product__parameter__title}>Rating: </dt>
                  <dd>{product.rating}</dd>
                </dl>
                <dl className={styles.product__parameter}>
                  <dt className={styles.product__parameter__title}>Stock: </dt>
                  <dd>{product.stock}</dd>
                </dl>
              </div>
              <div className={styles.product__thirdColumn}>
                <dl className={styles.product__parameter_price}>
                  <dt className={styles.product__parameter_price__title}>Price: </dt>
                  <dd>{formatPrice(product.price)}</dd>
                </dl>
                <div className={styles.product__buttonsContainer}>
                  <ProductAddDropButton
                    productId={product.id}
                    productsInCart={productsInCart}
                    addToCart={addToCart}
                    dropFromCart={dropFromCart}
                  />
                  <Link className={styles.product__link} to={`/product/${product.id}`}>Details</Link>
                </div>
              </div>
            </section>
          ))
        }
    </section>
  );
}
