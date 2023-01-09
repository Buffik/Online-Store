// import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
// тут стили импортированы при помощи модулей, это один из способов подключения стилей.
// В таком случае в компонентах можно использовать повторяющиеся названия для стилей,
// т.к. к ним присоединиться случайный хеш и на самом деле название стиля будет отличаться
import styles from './styles.module.scss';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import cart from '../../assets/images/cart.svg';

type TProps = {
  // productsInCart: TProductPartialProps[];
  productsInCart: TProductPartialProps[];
  products: TProductsItem[] | null;
  // eslint-disable-next-line no-unused-vars
  // increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  // eslint-disable-next-line no-unused-vars
  // decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
}

// компонент созданный при помощи function declaration,
// можно писать и используя expression. В другом компоненте будет пример
export default function Header(props: TProps) {
  const { productsInCart, products } = props;
  // console.log(`header: ${productsInCartCount.reduce((acc, elem) => acc + elem.count, 0)}`);
  // const { cartItems } = props;
  // можно не обращать внимание на useMemo, это уже более продвинутый уровень
  // ниже функция которая навешивает определенный стиль исходя их переменной isActive,
  // это встроенная переменная в элементе NavLink
  // NavLink мы взяли из react-router-dom
  // const activeStyles = useMemo(
  //   () => (bool: boolean) => (bool
  //     ? styles.header__navigation__link__active
  //     : styles.header__navigation__link),
  //   [],
  // );

  const cartTotal = products?.reduce((acc, elem) => {
    const productInCart = productsInCart.find((item) => item.id === elem.id);
    if (productInCart === undefined) {
      return 0;
    }
    return acc + elem.price * productInCart.count;
  }, 0);

  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        {/* ссылки которые используются для роутинга по страницам SPA
              подробнее можно прочитать в документации библиотеки react-router-dom */}
        <NavLink
          className={styles.header__navigation__logo}
          to="/"
        >
          Online Store
        </NavLink>
        {/* <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/other"
        >
          Other page
        </NavLink> */}
        <p className={styles.header__navigation__total}>
          {'Cart total: '}
          <span className={styles.header__navigation__total__price}>
            {cartTotal
              ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(cartTotal)
              : '...'}
          </span>

        </p>
        <NavLink
          className={styles.header__navigation__cart}
          // className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/cart"
        >
          <img
            src={cart}
            alt="Cart"
          />
          <p className={styles.header__navigation__cart__items}>
            {productsInCart.reduce((acc, elem) => acc + elem.count, 0)}
          </p>
        </NavLink>
      </nav>
    </header>
  );
}
