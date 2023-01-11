import React from 'react';
import { TProductsItem } from '../../types/types';
import styles from './DualSlider.module.scss';

type TDualSliderProps = {
  sliderId: string;
  filter: 'price' | 'stock';
  products: TProductsItem[];
  // eslint-disable-next-line no-unused-vars
  handleSliderMinInput(event: React.ChangeEvent<HTMLInputElement>): void;
  // eslint-disable-next-line no-unused-vars
  handleSliderMaxInput(event: React.ChangeEvent<HTMLInputElement>): void
  filteredSearchedProducts: TProductsItem[] | [];
  searchParamsObject: Record<string, string>;
  // eslint-disable-next-line no-unused-vars
  // fillSlider(filter: 'price' | 'stock'): string;
  }

function DualSlider(props: TDualSliderProps) {
  const {
    sliderId,
    filter,
    products,
    handleSliderMinInput,
    handleSliderMaxInput,
    filteredSearchedProducts,
    searchParamsObject,
    // fillSlider,
  } = props;

  const filtered = filteredSearchedProducts.map((item) => item[filter]);
  const arr = (filtered.length > 0) ? filtered : [0];

  return (
    <section className={styles.dualSlider}>
      <input
        type="range"
        name={`${sliderId}-min`}
        id={`${sliderId}-min`}
        min={Math.min(...products.map((item) => item[filter]))}
        max={Math.max(...products.map((item) => item[filter]))}
        value={searchParamsObject[`${filter}range`]?.split(',')[0] ?? Math.min(...arr)}
        onInput={handleSliderMinInput}
        className={[styles.slider, styles.sliderMin].join(' ')}
      />
      <input
        type="range"
        name={`${sliderId}-max`}
        id={`${sliderId}-max`}
        min={Math.min(...products.map((item) => item[filter]))}
        max={Math.max(...products.map((item) => item[filter]))}
        value={searchParamsObject[`${[filter]}range`]?.split(',')[1] ?? Math.max(...arr)}
        onInput={handleSliderMaxInput}
        className={styles.slider}
        // style={{ background: `${fillSlider(filter)}` }}
      />
      <div className={styles.dualSlider__labels}>
        <p>
          {(sliderId === 'filter-price') ? '€' : ''}
          {searchParamsObject[`${filter}range`]?.split(',')[0] ?? filteredSearchedProducts.length ? Math.min(...arr) : 0}
        </p>
        <p>
          {(sliderId === 'filter-price') ? '€' : ''}
          {searchParamsObject[`${[filter]}range`]?.split(',')[1] ?? filteredSearchedProducts.length ? Math.max(...arr) : 0}
        </p>
      </div>
    </section>
  );
}

export default DualSlider;
