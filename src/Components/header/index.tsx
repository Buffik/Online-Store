// import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import formatPrice from '../utils/formatPrice';
import cart from '../../assets/images/cart.svg';

type TProps = {
  productsInCart: TProductPartialProps[];
  products: TProductsItem[] | null;
}

export default function Header(props: TProps) {
  const {
    productsInCart,
    products,
  } = props;

  const cartTotalItems = products?.reduce((acc, elem) => {
    const productInCart = productsInCart.find((item) => item.id === elem.id);
    if (productInCart === undefined) {
      return 0;
    }
    return acc + elem.price * productInCart.count;
  }, 0);

  const cartTotalPrice = productsInCart.reduce((acc, elem) => acc + elem.count, 0);

  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        <NavLink
          className={styles.header__navigation__logo}
          to="/"
        >
          Online Store
        </NavLink>
        <p className={styles.header__navigation__total}>
          {'Cart total: '}
          <span className={styles.header__navigation__total__price}>
            {cartTotalItems
              ? formatPrice(cartTotalItems)
              : '...'}
          </span>
        </p>
        <NavLink
          className={styles.header__navigation__cart}
          to="/cart"
        >
          <img
            src={cart}
            alt="Cart"
          />
          <p className={styles.header__navigation__cart__items}>
            {cartTotalPrice}
          </p>
        </NavLink>
      </nav>
    </header>
  );
}
