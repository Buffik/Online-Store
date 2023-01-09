/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './CarouselImages.module.scss';

interface ICarouselImages {
  value: string
  // eslint-disable-next-line no-unused-vars
  setCurrentImg(str:string): void
}

function CarouselImages({ value, setCurrentImg }: ICarouselImages) {
  return (
    <img className={styles.carouselImg} src={value} onClick={() => setCurrentImg(value)} alt="product" />
  );
}

export default CarouselImages;
