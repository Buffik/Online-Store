import React, { useEffect, useState } from 'react';
import FiltersList from '../../Components/Main/FiltersList';
import ProductsList from '../../Components/Main/ProductsList';
// import TestForMain from '../../Components/TestForMain';
import { TProductPartialProps, TProductsItem } from '../../types/types';
import useSearchParamsObject from '../../hooks/useSearchParamsObject';

type TMainProps = {
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
}

type TParamsObject = Record<string, string>;

// type TIsInSearchParams = {
//   paramName: string;
//   param: string | number;
//   paramsObject: TParamsObject;
// }

type TFilterOptions = 'category' | 'brand' | 'price' | 'stock';

function Main(props: TMainProps) {
  const { productsInCart, addToCart, dropFromCart } = props;
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    const productsList = await response.json();
    setProducts(productsList.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const categoriesList = getFilterParams(products, 'category');

  const brandsList = getFilterParams(products, 'brand');

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

  const filterProducts = (productsArray: TProductsItem[] | []) => {
    let arr = productsArray.slice();
    if (searchParamsObject.category) {
      const params = searchParamsObject.category.split(',');
      arr = arr.filter((elem) => params.includes(elem.category));
    }
    if (searchParamsObject.brand) {
      const params = searchParamsObject.brand.split(',');
      arr = arr.filter((elem) => params.includes(elem.brand));
    }
    return arr;
  };

  const searchInProducts = (productsArray: TProductsItem[] | []) => productsArray;

  const sortProducts = (productsArray: TProductsItem[] | []) => productsArray;

  const filteredProducts = filterProducts(products);
  const filteredSearchedProducts = searchInProducts(filteredProducts);
  const filteredSearchedSortedProducts = sortProducts(filteredSearchedProducts);

  return (
    <main style={{ display: 'flex', gap: '50px' }}>
      <FiltersList
        products={products}
        filteredSearchedProducts={filteredSearchedProducts}
        categoriesList={categoriesList}
        brandsList={brandsList}
        searchParamsObject={searchParamsObject}
        isInSearchParams={isInSearchParams}
        handleCheckboxChange={handleCheckboxChange}
      />
      <ProductsList
        productsInCart={productsInCart}
        addToCart={addToCart}
        dropFromCart={dropFromCart}
        products={filteredSearchedSortedProducts}
      />
    </main>
  );
}

export default Main;
