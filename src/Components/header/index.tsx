import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
// тут стили импортированы при помощи модулей, это один из способов подключения стилей.
// В таком случае в компонентах можно использовать повторяющиеся названия для стилей,
// т.к. к ним присоединиться случайный хеш и на самом деле название стиля будет отличаться
import styles from './styles.module.scss';
import { TProductsItem, TProductPartialProps } from '../../types/types';

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
  const activeStyles = useMemo(
    () => (bool: boolean) => (bool
      ? styles.header__navigation__link__active
      : styles.header__navigation__link),
    [],
  );

  const cartTotal = products?.reduce((acc, elem) => {
    const productInCart = productsInCart.find((item) => item.id === elem.id);
    if (productInCart === undefined) {
      return 0;
    }
    return acc + elem.price * productInCart.count;
  }, 0);

  return (
    <div className={styles.header}>
      <nav className={styles.header__navigation}>
        {/* ссылки которые используются для роутинга по страницам SPA
              подробнее можно прочитать в документации библиотеки react-router-dom */}
        <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
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
        <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/cart"
        >
          {'Cart: '}
          {productsInCart.reduce((acc, elem) => acc + elem.count, 0)}
        </NavLink>
        <p style={{ marginLeft: '50px' }}>
          Cart total: $
          {cartTotal}
        </p>
      </nav>
    </div>
  );
}
