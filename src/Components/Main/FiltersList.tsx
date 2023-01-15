import React from 'react';
import DualSlider from './DualSlider';
import isInSearchParams from '../utils/isInSearchParams';
import styles from './FiltersList.module.scss';
import handleCheckboxFilter from '../utils/handleCheckboxChange';
import getFilterOptions from '../utils/getFilterOptions';
import {
  TProductsItem, TSearchParamsObject, TSetSearchParamsObject, TFilterSelectionTypes,
} from '../../types/types';

type TFiltersListProps = {
  products: TProductsItem[];
  filteredSearchedProducts: TProductsItem[] | [];
  searchParamsObject: TSearchParamsObject;
  setSearchParamsObject: TSetSearchParamsObject;
  handleResetClick(): void;
  handleCopyClick(): void;
  handleSliderFilter(event: React.ChangeEvent<HTMLInputElement>): void;
  copied: boolean;
  // fillSlider(filter: 'price' | 'stock'): string;
}

function FiltersList(props: TFiltersListProps) {
  const {
    products,
    filteredSearchedProducts,
    searchParamsObject,
    setSearchParamsObject,
    handleResetClick,
    handleCopyClick,
    handleSliderFilter,
    copied,
    // fillSlider,
  } = props;

  const categoriesList = getFilterOptions(products, 'category');
  const brandsList = getFilterOptions(products, 'brand');

  type TItemsCount = (items: TProductsItem[], key: TFilterSelectionTypes, value: string) => number;
  const itemsCount:
    TItemsCount = (items, key, value) => items.filter((product) => product[key] === value).length;

  return (
    <section className={styles.filters}>
      <h2 className="visually-hidden">Filters</h2>
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
                checked={isInSearchParams('category', category.toString(), searchParamsObject)}
                onChange={() => handleCheckboxFilter('category', category.toString(), searchParamsObject, setSearchParamsObject)}
              />
              <label className={styles.filter__label} htmlFor={`filter-category-${category}`}>
                {category}
                {' '}
                <span className={styles.filter__label__count}>
                  {itemsCount(filteredSearchedProducts, 'category', category)}
                  /
                  {itemsCount(products, 'category', category)}
                </span>
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
                checked={isInSearchParams('brand', brand.toString(), searchParamsObject)}
                onChange={() => handleCheckboxFilter('brand', brand.toString(), searchParamsObject, setSearchParamsObject)}
              />
              <label className={styles.filter__label} htmlFor={`filter-brand-${brand}`}>
                {brand}
                {' '}
                <span className={styles.filter__label__count}>
                  {itemsCount(filteredSearchedProducts, 'brand', brand)}
                  /
                  {itemsCount(products, 'brand', brand)}
                </span>
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
          handleSliderFilter={handleSliderFilter}
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
          handleSliderFilter={handleSliderFilter}
          searchParamsObject={searchParamsObject}
          filteredSearchedProducts={filteredSearchedProducts}
          // fillSlider={fillSlider}
        />
      </div>
    </section>
  );
}

export default FiltersList;
