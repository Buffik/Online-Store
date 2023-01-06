// import React, { useEffect, useState } from 'react';
// import { isTemplateExpression } from 'typescript';
// import { useSearchParams } from 'react-router-dom';
import useSearchParamsObject from '../../hooks/useSearchParamsObject';
// import ProductsList from '../../Components/Main/ProductsList';
import { TProductsItem } from '../../types/types';

type TFiltersListProps = {
  products: TProductsItem[];
  // productsInCart: TProductPartialProps[];
  // // eslint-disable-next-line no-unused-vars
  // addToCart(id: number): void;
  // // eslint-disable-next-line no-unused-vars
  // dropFromCart(id: number): void;
}

type TFilterOptions = 'category' | 'brand' | 'price' | 'stock';

function FiltersList(props: TFiltersListProps) {
  const { products } = props;

  type TParamsObject = Record<string, string>;
  const isInSearchParams = (
    paramName: string,
    param: string | number,
    paramsObject: TParamsObject,
  ) => {
    if (typeof param === 'number') {
      return false;
    }
    if (!paramsObject[paramName]) {
      return false;
    }
    return paramsObject[paramName].split(',').includes(param);
  };

  const getFilterParams = (source: TProductsItem[], paramName: TFilterOptions) => {
    if (paramName === 'price' || paramName === 'stock') {
      const arr = source.map((item) => item[paramName]);
      return [Math.min(...arr), Math.max(...arr)];
    }
    const set = new Set(source.map((item) => item[paramName]));
    return Array.from(set).sort();
  };

  const [searchParamsObject, setSearchParamsObject] = useSearchParamsObject();
  console.log(searchParamsObject);

  const handleClick = () => {
    setSearchParamsObject({ ...searchParamsObject, category: 'phone,sss' });
  };

  const categoriesList = getFilterParams(products, 'category');

  const categoriesArray = categoriesList.map((category) => {
    const obj = { [category]: isInSearchParams('category', category, searchParamsObject) };
    return obj;
  });
  console.log(categoriesArray);

  const brandsList = getFilterParams(products, 'brand');

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

  const handleCheckboxChange = (filterName: string, filter: string | number) => {
    if (isInSearchParams(filterName, filter, searchParamsObject)) {
      let filterArr = searchParamsObject[filterName].split(',');
      if (filterArr.length === 1) {
        const copySearchParamsObject = { ...searchParamsObject };
        delete copySearchParamsObject[filterName];
        setSearchParamsObject(copySearchParamsObject);
      } else {
        filterArr = filterArr.filter((item) => item !== filter);
        setSearchParamsObject({ ...searchParamsObject, [filterName]: filterArr.join(',') });
      }
    } else if (searchParamsObject[filterName]) {
      setSearchParamsObject({ ...searchParamsObject, [filterName]: `${searchParamsObject[filterName]},${filter}` });
    } else {
      setSearchParamsObject({ ...searchParamsObject, [filterName]: filter.toString() });
    }
  };

  return (
    <section>
      <button type="button" onClick={handleClick}>add filter</button>
      <fieldset>
        <legend>Category:</legend>
        {categoriesList.map((category) => (
          <label key={category} htmlFor={`filter-category-${category}`}>
            <input
              type="checkbox"
              id={`filter-category-${category}`}
              name="category"
              checked={isInSearchParams('category', category, searchParamsObject)}
              onChange={() => handleCheckboxChange('category', category)}
            />
            {category}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Brand:</legend>
        {brandsList.map((brand) => (
          <label key={brand} htmlFor={`filter-brand-${brand}`}>
            <input
              type="checkbox"
              id={`filter-brand-${brand}`}
              name="brand"
              checked={isInSearchParams('brand', brand, searchParamsObject)}
              onChange={() => handleCheckboxChange('brand', brand)}
            />
            {brand}
          </label>
        ))}
      </fieldset>
    </section>
  );
}

export default FiltersList;
