/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useEffect, useState } from 'react';
import FiltersList from '../../Components/Main/FiltersList';
import ProductsList from '../../Components/Main/ProductsList';
// import TestForMain from '../../Components/TestForMain';
import useSearchParamsObject from '../../hooks/useSearchParamsObject';
import LoadingSpinner from '../../Components/UI/LoadingSpinner';
import SiteContainer from '../../Components/UI/container/SiteContainer';
import styles from './Main.module.scss';
import filterProducts from '../../Components/utils/filterProducts';
import searchInProducts from '../../Components/utils/searchInProducts';
import sortProducts from '../../Components/utils/sortProducts';
import {
  TProductPartialProps, TProductsItem, TFilterRangeTypes,
} from '../../types/types';

type TMainProps = {
  productsInCart: TProductPartialProps[];
  addToCart(id: number): void;
  dropFromCart(id: number): void;
}

function Main(props: TMainProps) {
  const {
    productsInCart,
    addToCart,
    dropFromCart,
  } = props;

  const [products, setProducts] = useState([]);

  const [isPending, setIsPending] = useState(true);

  const fetchProducts = async (source: string) => {
    try {
      const response = await fetch(source);
      const productsList = await response.json();
      return productsList.products;
    } catch (err) {
      throw new Error('Error: Could not fetch products');
    }
  };

  useEffect(() => {
    fetchProducts('https://dummyjson.com/products?limit=20')
      .then((result) => setProducts(result))
      .then(() => setIsPending(false));
  }, []);

  const [searchParamsObject, setSearchParamsObject] = useSearchParamsObject();

  // const fillSlider = (filter: 'price' | 'stock') => {
  //   const sliderColor = '#b9b9b9';
  //   const rangeColor = '#2CB708';
  //   const max = Math.max(...products.map((item) => item[filter]));
  //   const min = Math.min(...products.map((item) => item[filter]));
  //   const valueMin = Number(searchParamsObject[`${[filter]}range`]?.split(',')[0]);
  //   const valueMax = Number(searchParamsObject[`${[filter]}range`]?.split(',')[1]);
  //   const rangeDistance = max - min;
  //   const fromPosition = valueMin - min;
  //   const toPosition = valueMax - min;
  //   return `linear-gradient(
  //     to right,
  //     ${sliderColor} 0%,
  //     ${sliderColor} ${((fromPosition) / (rangeDistance)) * 100}%,
  //     ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
  //     ${rangeColor} ${((toPosition) / (rangeDistance)) * 100}%,
  //     ${sliderColor} ${((toPosition) / (rangeDistance)) * 100}%,
  //     ${sliderColor} 100%)`;
  // };

  const getMinPrice = (source: TProductsItem[], paramName: TFilterRangeTypes) => {
    if (source.length !== 0) {
      return Math.min(...source.map((item) => item[paramName]));
    }
    return 0;
  };
  const getMaxPrice = (source: TProductsItem[], paramName: TFilterRangeTypes) => {
    if (source.length !== 0) {
      return Math.max(...source.map((item) => item[paramName]));
    }
    return 0;
  };

  const handleSliderFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [, filterName, minOrMax] = event.target.id.split('-'); // event.target.id example: filter-price-min
    const param = (filterName === 'price' || filterName === 'stock') ? filterName : 'price';
    let minValue;
    let maxValue;
    if (minOrMax === 'min') {
      minValue = Number(event.target.value);
      maxValue = Number(searchParamsObject[`${filterName}range`]?.split(',')[1] ?? getMaxPrice(products, param));
    }
    if (minOrMax === 'max') {
      minValue = Number(searchParamsObject[`${param}range`]?.split(',')[0] ?? getMinPrice(products, param));
      maxValue = Number(event.target.value);
    }
    if (minValue === undefined || maxValue === undefined) {
      return;
    }
    setSearchParamsObject({ ...searchParamsObject, [`${filterName}range`]: [minValue, maxValue].sort((a, b) => a - b).join(',') });
    // fillSlider('price');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      const copiedSearchParamsObject = { ...searchParamsObject };
      delete copiedSearchParamsObject.search;
      setSearchParamsObject(copiedSearchParamsObject);
    } else {
      setSearchParamsObject({ ...searchParamsObject, search: event.target.value });
    }
  };

  const handleSortingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'default') {
      const copiedSearchParamsObject = { ...searchParamsObject };
      delete copiedSearchParamsObject.sortby;
      setSearchParamsObject(copiedSearchParamsObject);
    } else {
      setSearchParamsObject({ ...searchParamsObject, sortby: event.target.value });
    }
  };

  const filteredProducts = filterProducts(products, searchParamsObject);
  const filteredSearchedProducts = searchInProducts(filteredProducts, searchParamsObject);
  const filteredSearchedSortedProducts = sortProducts(filteredSearchedProducts, searchParamsObject);

  const handleResetClick = () => {
    setSearchParamsObject({});
    // fillSlider('price');
    // fillSlider('stock');
  };

  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
    navigator.clipboard.writeText(window.location.href);
  };

  const handleViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const viewValue = (event.target.id === 'products-view-list') ? 'list' : 'grid';
    setSearchParamsObject({ ...searchParamsObject, view: viewValue });
  };

  const productsView = (searchParamsObject?.view === 'list' || searchParamsObject?.view === 'grid') ? searchParamsObject.view : 'grid';

  return (
    <SiteContainer>
      {isPending
        ? (
          <LoadingSpinner />
        )
        : (
          <main className={styles.main}>
            <h1 className="visually-hidden">Catalog</h1>
            <FiltersList
              products={products}
              filteredSearchedProducts={filteredSearchedProducts}
              searchParamsObject={searchParamsObject}
              setSearchParamsObject={setSearchParamsObject}
              handleResetClick={handleResetClick}
              handleCopyClick={handleCopyClick}
              handleSliderFilter={handleSliderFilter}
              copied={copied}
              // fillSlider={fillSlider}
            />
            <div className={styles.rightColumnWrapper}>
              <div className={styles.findSortContainer}>
                <input
                  type="text"
                  value={searchParamsObject.search ?? ''}
                  onChange={handleSearchChange}
                  placeholder="Find products..."
                  aria-label="Find products."
                />
                <p className={styles.foundText}>
                  {'Found: '}
                  {filteredSearchedSortedProducts.length}
                </p>
                <select name="sort-by" id="sort-by" value={searchParamsObject.sortby ?? 'default'} onChange={handleSortingChange}>
                  <option value="default">Sort by</option>
                  <option value="price-ascending">Cheapest first</option>
                  <option value="price-descending">Expensive first</option>
                  <option value="rating-descending">Higher rated first</option>
                  <option value="rating-ascending">Lower rated first</option>
                  <option value="discount-descending">Higher discount first</option>
                  <option value="discount-ascending">Lower discount first</option>
                </select>
                <div className={styles.productsView}>
                  <input
                    type="radio"
                    name="products-view"
                    id="products-view-grid"
                    checked={productsView === 'grid'}
                    onChange={handleViewChange}
                  />
                  <label
                    className={styles.productsView__label_grid}
                    htmlFor="products-view-grid"
                    title="View products as a grid"
                    aria-label="View products as a grid."
                  />
                  <input
                    type="radio"
                    name="products-view"
                    id="products-view-list"
                    checked={productsView === 'list'}
                    onChange={handleViewChange}
                  />
                  <label
                    className={styles.productsView__label_list}
                    htmlFor="products-view-list"
                    title="View products as a list"
                    aria-label="View products as a list."
                  />
                </div>
              </div>
              <ProductsList
                productsInCart={productsInCart}
                addToCart={addToCart}
                dropFromCart={dropFromCart}
                products={filteredSearchedSortedProducts}
                view={productsView}
              />
            </div>
          </main>
        )}
    </SiteContainer>

  );
}

export default Main;
