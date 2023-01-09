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
    <div className={styles}>
      <img src={value} onClick={() => setCurrentImg(value)} alt="product" />
    </div>
  );
}

export default CarouselImages;
