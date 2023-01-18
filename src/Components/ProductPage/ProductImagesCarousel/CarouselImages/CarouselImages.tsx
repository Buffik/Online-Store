import React from 'react';
import styles from './CarouselImages.module.scss';

interface ICarouselImages {
  value: string
  setCurrentImg(str:string): void
}

function CarouselImages({ value, setCurrentImg }: ICarouselImages) {
  return (
    <img className={styles.carouselImg} src={value} onClick={() => setCurrentImg(value)} role="presentation" alt="product" />
  );
}

export default CarouselImages;
