import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import { TProductPartialProps, TProductsItemWithImages } from '../../types/types';
import PostService from '../API/PostService';
import ProductAddDropButton from '../UI/button/ProductAddDropButton';
import CartContainer from '../UI/container/CartContainer/CartContainer';
import LoadingSpinner from '../UI/LoadingSpinner';
import checkUniqueImgs from '../utils/checkUniqueImgs';
import setDataToLocalStorage from '../utils/setDataToLocalStorage';
import ProductImagesCarousel from './ProductImagesCarousel/ProductImagesCarousel';
import formatPrice from '../utils/formatPrice';
import styles from './productPage.module.scss';

interface IProductPage {
  productsInCart: TProductPartialProps[]
  addToCart(id: number | undefined): void;
  dropFromCart(id: number | undefined): void;
  setFormVisible: (bool:boolean) => void
}

function ProductPage({
  productsInCart, addToCart, dropFromCart, setFormVisible,
}: IProductPage) {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);

  const [currentPage, setCurrentPage] = useState<TProductsItemWithImages>();

  const [fetchProductById, isPending] = useFetching(async () => {
    const data = await PostService.getById(id);
    setCurrentPage(data);
  });

  const [currentImg, setCurrentImg] = useState('');
  const [allImgsSizes, setAllImgsSizes] = useState<number[]>([]);
  const [arrImg, setArrImg] = useState<string[]>([]);
  const [cleanArrImg, setCleanArrImg] = useState<string[]>([]);

  const [getImgSizes] = useFetching(async () => {
    if (currentPage) {
      const response = await PostService.getAllSizes(currentPage.images);
      setAllImgsSizes(response);
    }
  });

  useEffect(() => {
    if (!id || id < 1 || id > 100) {
      navigate('/*', { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProductById();
  }, [id]);

  useMemo(
    () => {
      if (currentPage && currentPage.images.length !== 0) {
        setCurrentImg(currentPage.images[currentPage.images.length - 1]);
        setArrImg(currentPage.images);
        getImgSizes();
      }
    },
    [currentPage],
  );

  useEffect(() => {
    setDataToLocalStorage(productsInCart);
  }, [productsInCart]);

  useMemo(() => {
    if (allImgsSizes.length && allImgsSizes.length > 1) {
      checkUniqueImgs(allImgsSizes, arrImg, setCleanArrImg);
    }
  }, [allImgsSizes]);

  const handleBuyButtonClick = () => {
    const isProductInCart = productsInCart.reduce<boolean>((acc, el) => {
      if (el.id === id) {
        return true;
      }
      return acc;
    }, false);
    if (!isProductInCart) {
      addToCart(id);
    }
    setFormVisible(true);
    navigate('/cart', { replace: true });
  };

  if (isPending) {
    return (
      <CartContainer>
        <div style={{
          marginTop: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <LoadingSpinner />
        </div>
      </CartContainer>
    );
  }

  const linkToCategories = `/?category=${currentPage?.category}`;
  const linkToBrands = `/?category=${currentPage?.category}&brand=${currentPage?.brand}`;

  return (
    <CartContainer>
      <div className={styles.wrapper}>
        <div className={styles.breedsWrapper}>
          <Link to="/">Home</Link>
          <span className={styles.breedsItems}>&gt;&gt;</span>
          <Link
            className={styles.breedsCategory}
            to={linkToCategories}
          >
            {currentPage?.category}
          </Link>
          <span className={styles.breedsItems}>&gt;&gt;</span>
          <Link to={linkToBrands}>{currentPage?.brand}</Link>
          <span className={styles.breedsItems}>&gt;&gt;</span>
          <div>{currentPage?.title}</div>
        </div>
        <div className={styles.productWrapper}>
          <h1>{currentPage?.title}</h1>
          <div className={styles.detailsWrapper}>
            <div className={styles.imagesWrapper}>
              <div className={styles.mainImgWrapper}>
                <img className={styles.mainImg} src={currentImg} alt={currentPage?.title} />
              </div>
              {cleanArrImg.length > 1
              && <ProductImagesCarousel cleanArrImg={cleanArrImg} setCurrentImg={setCurrentImg} />}
            </div>
            <div className={styles.infoWrapper}>
              <div className={styles.infoText}>
                <span className={styles.infoHeaders}>Available stock:</span>
                {' '}
                {currentPage?.stock}
              </div>
              <div className={styles.infoText}>
                <span className={styles.infoHeaders}>Brand:</span>
                {' '}
                {currentPage?.brand}
              </div>
              <div className={styles.infoText}>
                <span className={styles.infoHeaders}>Rating:</span>
                {' '}
                {currentPage?.rating}
              </div>
              <div className={styles.infoText}>
                <span className={styles.infoHeaders}>Category:</span>
                {' '}
                {currentPage?.category}
              </div>
              <div className={styles.infoText}>
                <span className={styles.infoHeaders}>Discount:</span>
                {' '}
                {currentPage?.discountPercentage}
                %
              </div>
              <div className={styles.infoHeaders}>Description:</div>
              <div className={styles.infoDescription}>
                {currentPage?.description}
              </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <div className={styles.productPrice}>
                <span>Price: </span>
                {currentPage
                  ? formatPrice(currentPage?.price)
                  : 0}
              </div>
              <button type="button" onClick={() => handleBuyButtonClick()}>Buy now</button>
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
    </CartContainer>
  );
}

export default ProductPage;
