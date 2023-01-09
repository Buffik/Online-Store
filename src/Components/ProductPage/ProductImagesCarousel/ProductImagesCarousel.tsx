import React from 'react';
import CarouselImages from './CarouselImages/CarouselImages';
import styles from './ProductImagesCarousel.module.scss';

interface IProductImagesCarousel {
  cleanArrImg: string[]
  // eslint-disable-next-line no-unused-vars
  setCurrentImg(str:string): void
}

function ProductImagesCarousel({ cleanArrImg, setCurrentImg }: IProductImagesCarousel) {
  return (
    <div className={styles}>
      {
      cleanArrImg.map(
        (img) => <CarouselImages key={img} value={img} setCurrentImg={setCurrentImg} />,
      )
}

    </div>
  );
}

export default ProductImagesCarousel;
