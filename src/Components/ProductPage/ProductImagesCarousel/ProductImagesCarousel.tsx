import React, { useState } from 'react';
import CarouselImages from './CarouselImages/CarouselImages';
import styles from './ProductImagesCarousel.module.scss';

interface IProductImagesCarousel {
  cleanArrImg: string[]
  setCurrentImg(str:string): void
}

function ProductImagesCarousel({ cleanArrImg, setCurrentImg }: IProductImagesCarousel) {
  const amountOfImgs = cleanArrImg.length;
  const IMAGE_WIDTH = 190;

  const [currentOffset, setCurrentOffset] = useState(0);

  const handleLeftArrowClick = (px: number) => {
    const newOffset = px + IMAGE_WIDTH;
    const result = Math.min(newOffset, 0);
    setCurrentOffset(result);
  };

  const handleRightArrowClick = (px: number) => {
    const newOffset = px - IMAGE_WIDTH;
    const containerWidth = -(IMAGE_WIDTH * (amountOfImgs - 1));
    const result = Math.max(newOffset, containerWidth);
    setCurrentOffset(result);
  };

  return (
    <div className={styles.carouselWrapper}>
      <button onClick={() => handleLeftArrowClick(currentOffset)} className={styles.carouselButton} type="button">{'<'}</button>
      <div className={styles.carousel}>
        <div className={styles.carouselData} style={{ transform: `translateX(${currentOffset}px)` }}>
          {
        cleanArrImg.map(
          (img) => <CarouselImages key={img} value={img} setCurrentImg={setCurrentImg} />,
        )
          }
        </div>
      </div>
      <button onClick={() => handleRightArrowClick(currentOffset)} className={styles.carouselButton} type="button">{'>'}</button>
    </div>
  );
}

export default ProductImagesCarousel;
