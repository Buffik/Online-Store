import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ApprovePurchase from '../../Components/Cart/ApprovePurchase/ApprovePurchase';
import CartProduct from '../../Components/Cart/CartProduct/CartProduct';
import CartPagination from '../../Components/Cart/Pagination/CartPagination';
import DeleteCode from '../../Components/Cart/Promo/handleCodes/DeleteCode';
import Promo from '../../Components/Cart/Promo/Promo';
import Modal from '../../Components/Cart/PurchaseModal/Modal';
import Purchase from '../../Components/Cart/PurchaseModal/Purchase/Purchase';
import CartContainer from '../../Components/UI/container/CartContainer/CartContainer';
import SiteContainer from '../../Components/UI/container/SiteContainer';
import LoadingSpinner from '../../Components/UI/LoadingSpinner';
import countTotalCost from '../../Components/utils/countTotalCost';
import countTotalCount from '../../Components/utils/countTotalCount';
import countTotalSumWithDiscounts from '../../Components/utils/countTotalSumWithDiscounts';
import { TProductsItem, TProductPartialProps } from '../../types/types';
import formatPrice from '../../Components/utils/formatPrice';
import styles from './cart.module.scss';
import emptyCartImg from '../../assets/images/emptyCart.svg';

type TCartProps = {
  isPending: boolean;
  productsInCart: TProductPartialProps[]
  setProductsInCart(arr: TProductPartialProps[]): void;
  productsInCartCount: TProductPartialProps[];
  setProductsInCartCount(arr: TProductPartialProps[]): void;
  products: TProductsItem[] | null;
  increaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  decreaseProductCount(event: React.MouseEvent<HTMLButtonElement>): void;
  formVisible: boolean;
  setFormVisible(bool:boolean): void;
}

function Cart(props: TCartProps) {
  const {
    isPending,
    productsInCart,
    setProductsInCart,
    productsInCartCount,
    setProductsInCartCount,
    products,
    increaseProductCount,
    decreaseProductCount,
    formVisible,
    setFormVisible,
  } = props;
  const [totalCount, setTotalCount] = useState(countTotalCount(productsInCartCount));
  const [totalCost, setTotalCost] = useState(0);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeAdd, setIsCodeAdd] = useState(false);
  const [codeAdded, setCodeAdded] = useState<number[]>([]);
  // Подтверждение покупки
  const [showAffirmative, setShowAffirmative] = useState(false);

  //  Блок с пагинацией

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
      <SiteContainer>
        <LoadingSpinner />
      </SiteContainer>
    );
  }

  if (showAffirmative) {
    return (
      <ApprovePurchase
        setProductsInCart={setProductsInCart}
        showAffirmative={showAffirmative}
        setFormVisible={setFormVisible}
        setProductsInCartCount={setProductsInCartCount}
      />
    );
  }

  if (!products?.length) {
    return (
      <SiteContainer>
        <section className={styles.emptyWrapper}>
          <img className={styles.emptyImg} src={emptyCartImg} alt="" />
          <h1 className={styles.emptyTitle}>Cart is empty</h1>
          <Link to="/" className="">Back to main</Link>
        </section>
      </SiteContainer>
    );
  }

  return (
    <CartContainer>
      <div className={styles.wrapper}>
        <h1 className="visually-hidden">Cart</h1>
        <div className={styles.productsWrapper}>
          <CartPagination
            handleProductsPerPage={handleProductsPerPage}
            productsPerPage={productsPerPage}
            maxPages={maxPages}
            currentPage={currentPage}
            goNextFromCurrentPage={goNextFromCurrentPage}
            goBackFromCurrentPage={goBackFromCurrentPage}
          />
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
            <span className={styles.textTotal}>Total: </span>
            {formatPrice(totalCost)}
          </div>
          {isCodeAdd ? (
            <div>
              <div className={styles.textSummaryWithDiscount}>
                <span className={styles.textTotal}>Total: </span>
                {formatPrice(Number(countTotalSumWithDiscounts(totalCost, codeAdded)))}
              </div>
              <div style={{ textAlign: 'center' }}>Applied codes</div>
              <div>
                {codeAdded.map((discount) => <DeleteCode key={discount} code={discount === 10 ? 'PROMO' : 'ANOTHER'} todo="DEL" discount={discount} setCode={delPromoCode} />)}
              </div>
            </div>
          ) : <h4>No applied codes</h4>}
          <Promo
            isCodeTrue={isCodeValid}
            currenCodes={codeAdded}
            setIsCodeTrue={setIsCodeValid}
            setIsCodeAdd={addPromoCode}
          />
          <button className={styles.byuButton} type="button" onClick={() => setFormVisible(true)}> BUY NOW</button>
        </div>
        <Modal
          visible={formVisible}
          setVisible={setFormVisible}
        >
          <Purchase setShowAffirmative={setShowAffirmative} />

        </Modal>
      </div>
    </CartContainer>

  );
}

export default Cart;
