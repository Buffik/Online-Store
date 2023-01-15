import React from 'react';
import { TProductsItem, TSearchParamsObject, TFilterRangeTypes } from '../../types/types';
import formatPrice from '../utils/formatPrice';
import styles from './DualSlider.module.scss';

type TDualSliderProps = {
  sliderId: string;
  filter: TFilterRangeTypes;
  products: TProductsItem[];
  handleSliderFilter(event: React.ChangeEvent<HTMLInputElement>): void;
  filteredSearchedProducts: TProductsItem[] | [];
  searchParamsObject: TSearchParamsObject;
  // fillSlider(filter: 'price' | 'stock'): string;
  }

function DualSlider(props: TDualSliderProps) {
  const {
    sliderId,
    filter,
    products,
    handleSliderFilter,
    filteredSearchedProducts,
    searchParamsObject,
    // fillSlider,
  } = props;

  const filterValuesTotal = (products.length > 0)
    ? products.map((item) => item[filter])
    : [0];

  const minTotalFilterValue = Math.min(...filterValuesTotal);
  const maxTotalFilterValue = Math.max(...filterValuesTotal);

  const filterValues = (filteredSearchedProducts.length > 0)
    ? filteredSearchedProducts.map((item) => item[filter])
    : [0];

  const [minFilterValue, maxFilterValue] = searchParamsObject[`${filter}range`]?.split(',')
    ?? [Math.min(...filterValues), Math.max(...filterValues)];

  return (
    <section className={styles.dualSlider}>
      <input
        type="range"
        name={`${sliderId}-min`}
        id={`${sliderId}-min`}
        min={minTotalFilterValue}
        max={maxTotalFilterValue}
        value={minFilterValue}
        onInput={handleSliderFilter}
        className={[styles.slider, styles.sliderMin].join(' ')}
      />
      <input
        type="range"
        name={`${sliderId}-max`}
        id={`${sliderId}-max`}
        min={minTotalFilterValue}
        max={maxTotalFilterValue}
        value={maxFilterValue}
        onInput={handleSliderFilter}
        className={[styles.slider, styles.sliderMax].join(' ')}
        // style={{ background: `${fillSlider(filter)}` }}
      />
      <div className={styles.slider__labels}>
        <p className={styles.slider__labelMin}>
          {sliderId === 'filter-price'
            ? formatPrice(Number(minFilterValue))
            : minFilterValue}
        </p>
        <p className={styles.slider__labelMax}>
          {sliderId === 'filter-price'
            ? formatPrice(Number(maxFilterValue))
            : maxFilterValue}
        </p>
      </div>
    </section>
  );
}

export default DualSlider;
