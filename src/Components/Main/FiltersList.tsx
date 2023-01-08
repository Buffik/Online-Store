import React from 'react';
import { TProductsItem } from '../../types/types';
import DualSlider from './DualSlider';

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
  fillSlider(filter: 'price' | 'stock'): string;
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
    fillSlider,
  } = props;

  return (
    <section>
      <button type="button" onClick={handleResetClick}>Reset</button>
      <button type="button" onClick={handleCopyClick}>{copied ? 'Filters copied' : 'Copy filters'}</button>
      <fieldset>
        <legend>Category:</legend>
        {categoriesList.map((category) => (
          <label key={category} htmlFor={`filter-category-${category}`} style={{ display: 'flex' }}>
            <input
              type="checkbox"
              id={`filter-category-${category}`}
              name="category"
              checked={isInSearchParams('category', category, searchParamsObject)}
              onChange={() => handleCheckboxChange('category', category)}
            />
            {category}
            (
            {filteredSearchedProducts.filter((product) => product.category === category).length}
            /
            {products.filter((product) => product.category === category).length}
            )
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Brand:</legend>
        {brandsList.map((brand) => (
          <label key={brand} htmlFor={`filter-brand-${brand}`} style={{ display: 'flex' }}>
            <input
              type="checkbox"
              id={`filter-brand-${brand}`}
              name="brand"
              checked={isInSearchParams('brand', brand, searchParamsObject)}
              onChange={() => handleCheckboxChange('brand', brand)}
            />
            {brand}
            (
            {filteredSearchedProducts.filter((product) => product.brand === brand).length}
            /
            {products.filter((product) => product.brand === brand).length}
            )
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Price:</legend>
        <DualSlider
          sliderId="filter-price"
          filter="price"
          products={products}
          handleSliderMinInput={handleSliderMinInput}
          handleSliderMaxInput={handleSliderMaxInput}
          searchParamsObject={searchParamsObject}
          filteredSearchedProducts={filteredSearchedProducts}
          fillSlider={fillSlider}
        />
      </fieldset>
      <fieldset>
        <legend>Stock:</legend>
        <DualSlider
          sliderId="filter-stock"
          filter="stock"
          products={products}
          handleSliderMinInput={handleSliderMinInput}
          handleSliderMaxInput={handleSliderMaxInput}
          searchParamsObject={searchParamsObject}
          filteredSearchedProducts={filteredSearchedProducts}
          fillSlider={fillSlider}
        />
      </fieldset>
    </section>
  );
}

export default FiltersList;
