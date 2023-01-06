// import React, { useEffect, useState } from 'react';
// import { isTemplateExpression } from 'typescript';
// import { useSearchParams } from 'react-router-dom';
// import ProductsList from '../../Components/Main/ProductsList';
import { TProductsItem } from '../../types/types';

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
  } = props;

  // const handleClick = () => {
  //   setSearchParamsObject({ ...searchParamsObject, category: 'phone,sss' });
  // };

  // const categoriesArray = categoriesList.map((category) => {
  //   const obj = { [category]: isInSearchParams('category', category, searchParamsObject) };
  //   return obj;
  // });
  // console.log(categoriesArray);

  // let arr = new Array(categoriesList.length).fill(false);
  // console.log(arr);
  // arr = arr.map((category) => isInSearchParams('category', category, searchParamsObject));
  // console.log(arr);
  // const [checkedCategories] = useState(
  //   new Array(categoriesList.length).fill(arr),
  // );
  // useEffect(() => console.log('checkedCategories'), []);

  // console.log('checkedCategories');
  // console.log(checkedCategories);

  return (
    <section>
      {/* <button type="button" onClick={handleClick}>add filter</button> */}
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
    </section>
  );
}

export default FiltersList;
