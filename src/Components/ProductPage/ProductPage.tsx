/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import { TProductPartialProps, TProductsItemWithImages } from '../../types/types';
import PostService from '../API/PostService';
import ProductAddDropButton from '../UI/button/ProductAddDropButton';
import LoadingSpinner from '../UI/LoadingSpinner';
import checkUniqueImgs from '../utils/checkUniqueImgs';
import setDataToLocalStorage from '../utils/setDataToLocalStorage';
import ProductImagesCarousel from './ProductImagesCarousel/ProductImagesCarousel';
import styles from './productPage.module.scss';

interface IProductPage {
  productsInCart: TProductPartialProps[]
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number | undefined): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number | undefined): void;
  setFormVisible: (bool:boolean) => void
}

function ProductPage({
  productsInCart, addToCart, dropFromCart, setFormVisible,
}: IProductPage) {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);

  // const [goToCart, setGoToCart] = useState(false);
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
      console.log('render memo');
      if (currentPage && currentPage.images.length !== 0) {
        setCurrentImg(currentPage.images[currentPage.images.length - 1]);
        setArrImg(currentPage.images);
        getImgSizes();
      }
    },
    [currentPage],
  );

  // useEffect(() => {
  //   i;
  // }, [currentPage]);

  useEffect(() => {
    setDataToLocalStorage(productsInCart);
  }, [productsInCart]);

  useMemo(() => {
    if (allImgsSizes.length && allImgsSizes.length > 1) {
      console.log('again');
      checkUniqueImgs(allImgsSizes, arrImg, setCleanArrImg);
    }
  }, [allImgsSizes]);

  const handleBuyButtonClick = () => {
    const isProductInCart = productsInCart.reduce<boolean>((acc, el) => {
      if (el.id === id) {
        // eslint-disable-next-line no-param-reassign
        acc = true;
        return acc;
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
      <div style={{
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.breedsWrapper}>
        <Link to="/">Home</Link>
        <span className={styles.breedsItems}>&gt;&gt;</span>
        <div>{currentPage?.category}</div>
        <span className={styles.breedsItems}>&gt;&gt;</span>
        <div>{currentPage?.brand}</div>
        <span className={styles.breedsItems}>&gt;&gt;</span>
        <div>{currentPage?.title}</div>
      </div>
      <div className={styles.productWrapper}>
        <h2>{currentPage?.title}</h2>
        <div className={styles.detailsWrapper}>
          <div className={styles.imagesWrapper}>
            <img className={styles.mainImg} src={currentImg} alt={currentPage?.title} />
            <ProductImagesCarousel cleanArrImg={cleanArrImg} setCurrentImg={setCurrentImg} />
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
  );
}

export default ProductPage;
