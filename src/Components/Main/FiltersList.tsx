import React from 'react';
import { TProductsItem } from '../../types/types';
import DualSlider from './DualSlider';
import styles from './FiltersList.module.scss';

type TParamsObject = Record<string, string>;

type TFiltersListProps = {
  products: TProductsItem[];
  filteredSearchedProducts: TProductsItem[] | [];
  categoriesList: number[] | string[];
  brandsList: number[] | string[];
  searchParamsObject: Record<string, string>;
  // eslint-disable-next-line no-unused-vars
  isInSearchParams(paramName: string, param: string | number, paramsObject: TParamsObject): boolean;
  // eslint-disable-next-line no-unused-vars
  handleCheckboxChange(filterName: string, filter: string | number): void;
  handleResetClick(): void;
  // eslint-disable-next-line no-unused-vars
  handleCopyClick(): void;
  // eslint-disable-next-line no-unused-vars
  handleSliderMinInput(event: React.ChangeEvent<HTMLInputElement>): void;
  // eslint-disable-next-line no-unused-vars
  handleSliderMaxInput(event: React.ChangeEvent<HTMLInputElement>): void
  copied: boolean;
  // eslint-disable-next-line no-unused-vars
  // fillSlider(filter: 'price' | 'stock'): string;
}

function FiltersList(props: TFiltersListProps) {
  const {
    products,
    filteredSearchedProducts,
    categoriesList,
    brandsList,
    searchParamsObject,
    isInSearchParams,
    handleCheckboxChange,
    handleResetClick,
    handleCopyClick,
    handleSliderMinInput,
    handleSliderMaxInput,
    copied,
    // fillSlider,
  } = props;

  return (
    <section className={styles.filters}>
      <div className={styles.filter__buttons}>
        <button className={styles.filter__button} type="button" onClick={handleResetClick}>Reset</button>
        <button className={styles.filter__button} type="button" onClick={handleCopyClick}>{copied ? 'Filters copied' : 'Copy filters'}</button>
      </div>
      <h3 className={styles.filter__title}>Category</h3>
      <ul className={styles.filter__section}>
        {categoriesList.map((category) => (
          <li key={category}>
            <div>
              <input
                type="checkbox"
                id={`filter-category-${category}`}
                name="category"
                checked={isInSearchParams('category', category, searchParamsObject)}
                onChange={() => handleCheckboxChange('category', category)}
              />
              <label className={styles.filter__label} htmlFor={`filter-category-${category}`}>
                {category}
                {' '}
                (
                {filteredSearchedProducts.filter((product) => product.category === category).length}
                /
                {products.filter((product) => product.category === category).length}
                )
              </label>
            </div>
          </li>
        ))}
      </ul>
      <h3 className={styles.filter__title}>Brand</h3>
      <ul className={styles.filter__section}>
        {brandsList.map((brand) => (
          <li key={brand}>
            <div>
              <input
                type="checkbox"
                id={`filter-brand-${brand}`}
                name="brand"
                checked={isInSearchParams('brand', brand, searchParamsObject)}
                onChange={() => handleCheckboxChange('brand', brand)}
              />
              <label className={styles.filter__label} htmlFor={`filter-brand-${brand}`}>
                {brand}
                {' '}
                (
                {filteredSearchedProducts.filter((product) => product.brand === brand).length}
                /
                {products.filter((product) => product.brand === brand).length}
                )
              </label>
            </div>

          </li>
        ))}
      </ul>
      <h3 className={styles.filter__title}>Price</h3>
      <div className={styles.filter__section}>
        <DualSlider
          sliderId="filter-price"
          filter="price"
          products={products}
          handleSliderMinInput={handleSliderMinInput}
          handleSliderMaxInput={handleSliderMaxInput}
          searchParamsObject={searchParamsObject}
          filteredSearchedProducts={filteredSearchedProducts}
          // fillSlider={fillSlider}
        />
      </div>
      <h3 className={styles.filter__title}>Stock</h3>
      <div className={styles.filter__section}>
        <DualSlider
          sliderId="filter-stock"
          filter="stock"
          products={products}
          handleSliderMinInput={handleSliderMinInput}
          handleSliderMaxInput={handleSliderMaxInput}
          searchParamsObject={searchParamsObject}
          filteredSearchedProducts={filteredSearchedProducts}
          // fillSlider={fillSlider}
        />
      </div>
    </section>
  );
}

export default FiltersList;
