import React, { ChangeEvent, useEffect, useState } from 'react';
import FiltersList from '../../Components/Main/FiltersList';
import ProductsList from '../../Components/Main/ProductsList';
// import TestForMain from '../../Components/TestForMain';
import { TProductPartialProps, TProductsItem } from '../../types/types';
import useSearchParamsObject from '../../hooks/useSearchParamsObject';
import LoadingSpinner from '../../Components/UI/LoadingSpinner';
import SiteContainer from '../../Components/UI/container/SiteContainer';
import styles from './Main.module.scss';
import setDataToLocalStorage from '../../Components/utils/setDataToLocalStorage';

type TMainProps = {
  productsInCart: TProductPartialProps[];
  // eslint-disable-next-line no-unused-vars
  addToCart(id: number): void;
  // eslint-disable-next-line no-unused-vars
  dropFromCart(id: number): void;
}

type TParamsObject = Record<string, string>;

type TFilterOptions = 'category' | 'brand' | 'price' | 'stock';

function Main(props: TMainProps) {
  const {
    productsInCart,
    addToCart,
    dropFromCart,
  } = props;
  const [products, setProducts] = useState([]);

  const [isPending, setIsPending] = useState(true);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=20');
    const productsList = await response.json();
    setProducts(productsList.products);
    setIsPending(false);
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

  // let filteredSearchedProducts: TProductsItem[] = products.slice();

  const fillSlider = (filter: 'price' | 'stock') => {
    const sliderColor = '#b9b9b9';
    const rangeColor = '#2CB708';
    const max = Math.max(...products.map((item) => item[filter]));
    const min = Math.min(...products.map((item) => item[filter]));
    const valueMin = Number(searchParamsObject[`${[filter]}range`]?.split(',')[0]);
    const valueMax = Number(searchParamsObject[`${[filter]}range`]?.split(',')[1]);
    const rangeDistance = max - min;
    const fromPosition = valueMin - min;
    const toPosition = valueMax - min;
    return `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${((toPosition) / (rangeDistance)) * 100}%, 
      ${sliderColor} ${((toPosition) / (rangeDistance)) * 100}%, 
      ${sliderColor} 100%)`;
  };

  const getMinPrice = (source: TProductsItem[], param: 'price' | 'stock') => {
    if (source.length !== 0) {
      return Math.min(...source.map((item) => item[param]));
    }
    return undefined;
  };
  const getMaxPrice = (source: TProductsItem[], param: 'price' | 'stock') => {
    if (source.length !== 0) {
      return Math.max(...source.map((item) => item[param]));
    }
    return undefined;
  };

  const handleSliderMinInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = (event.target.id === 'filter-price-min') ? 'price' : 'stock';
    const minValue = Number(event.target.value);
    const maxValue = Number(searchParamsObject[`${param}range`]?.split(',')[1] ?? getMaxPrice(products, param));
    setSearchParamsObject({ ...searchParamsObject, [`${param}range`]: [minValue, maxValue].sort((a, b) => a - b).join(',') });
    fillSlider('price');
  };

  const handleSliderMaxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = (event.target.id === 'filter-price-max') ? 'price' : 'stock';
    const minValue = Number(searchParamsObject[`${param}range`]?.split(',')[0] ?? getMinPrice(products, param));
    const maxValue = Number(event.target.value);
    setSearchParamsObject({ ...searchParamsObject, [`${param}range`]: [minValue, maxValue].sort((a, b) => a - b).join(',') });
    fillSlider('stock');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      const copySearchParamsObject = { ...searchParamsObject };
      delete copySearchParamsObject.search;
      setSearchParamsObject(copySearchParamsObject);
    } else {
      setSearchParamsObject({ ...searchParamsObject, search: event.target.value });
    }
  };
  const handleSortingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'default') {
      const copySearchParamsObject = { ...searchParamsObject };
      delete copySearchParamsObject.sortby;
      setSearchParamsObject(copySearchParamsObject);
    } else {
      setSearchParamsObject({ ...searchParamsObject, sortby: event.target.value });
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
    if (searchParamsObject.pricerange) {
      const params = searchParamsObject.pricerange.split(',').map((elem) => Number(elem));
      arr = arr.filter((elem) => elem.price >= params[0] && elem.price <= params[1]);
    }
    if (searchParamsObject.stockrange) {
      const params = searchParamsObject.stockrange.split(',').map((elem) => Number(elem));
      arr = arr.filter((elem) => elem.stock >= params[0] && elem.stock <= params[1]);
    }
    // const minValue = getMinPrice(filteredSearchedProducts)
    // ?? searchParamsObject?.pricerange?.split(',')[0];
    // const maxValue = getMaxPrice(filteredSearchedProducts)
    // ?? searchParamsObject?.pricerange?.split(',')[1];
    // setSearchParamsObject({ ...searchParamsObject,
    // pricerange: [minValue, maxValue].join(',') });
    return arr;
  };

  const searchInProducts = (productsArray: TProductsItem[] | []) => {
    let arr = productsArray.slice();
    if (searchParamsObject.search) {
      const query = searchParamsObject.search.trim().toLowerCase();
      arr = arr.filter((elem) => elem.title.toLowerCase().includes(query)
      || elem.category.toLowerCase().includes(query)
      || elem.brand.toLowerCase().includes(query)
      || elem.description.toLowerCase().includes(query)
      || elem.price.toString().includes(query)
      || elem.discountPercentage.toString().includes(query)
      || elem.rating.toString().includes(query)
      || elem.stock.toString().includes(query));
    }
    return arr;
  };

  const sortProducts = (productsArray: TProductsItem[] | []) => {
    const { sortby } = searchParamsObject;
    if (sortby === 'price-ascending') {
      return productsArray.sort((a, b) => a.price - b.price);
    }
    if (sortby === 'price-descending') {
      return productsArray.sort((a, b) => b.price - a.price);
    }
    if (sortby === 'rating-ascending') {
      return productsArray.sort((a, b) => a.rating - b.rating);
    }
    if (sortby === 'rating-descending') {
      return productsArray.sort((a, b) => b.rating - a.rating);
    }
    if (sortby === 'discount-ascending') {
      return productsArray.sort((a, b) => a.discountPercentage - b.discountPercentage);
    }
    if (sortby === 'discount-descending') {
      return productsArray.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }
    return productsArray;
  };

  const filteredProducts = filterProducts(products);
  const filteredSearchedProducts = searchInProducts(filteredProducts);
  const filteredSearchedSortedProducts = sortProducts(filteredSearchedProducts);

  const handleResetClick = () => {
    setSearchParamsObject({});
    fillSlider('price');
    fillSlider('stock');
  };

  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
    navigator.clipboard.writeText(window.location.href);
  };

  const handleViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = (event.target.id === 'products-view-list') ? 'list' : 'grid';
    setSearchParamsObject({ ...searchParamsObject, view: param });
  };

  const productsView = (searchParamsObject?.view === 'list' || searchParamsObject?.view === 'grid') ? searchParamsObject.view : 'grid';

  // useEffect(() => {
  //   setSearchParamsObject({ ...searchParamsObject, view: 'grid' });
  // }, []);

  useEffect(() => {
    setDataToLocalStorage(productsInCart);
  }, [productsInCart]);

  return (
    <SiteContainer>
      {isPending
        ? (
          <LoadingSpinner />
        )
        : (
          <main className={styles.main}>
            <FiltersList
              products={products}
              filteredSearchedProducts={filteredSearchedProducts}
              categoriesList={categoriesList}
              brandsList={brandsList}
              searchParamsObject={searchParamsObject}
              isInSearchParams={isInSearchParams}
              handleCheckboxChange={handleCheckboxChange}
              handleResetClick={handleResetClick}
              handleCopyClick={handleCopyClick}
              handleSliderMinInput={handleSliderMinInput}
              handleSliderMaxInput={handleSliderMaxInput}
              copied={copied}
              fillSlider={fillSlider}
            />
            <div style={{ width: '100%' }}>
              <div className={styles.findSortContainer}>
                <input
                  type="text"
                  value={searchParamsObject.search ?? ''}
                  onChange={handleSearchChange}
                  placeholder="Find products..."
                  aria-label="Find products."
                />
                <p>
                  {'Found: '}
                  {filteredSearchedSortedProducts.length}
                </p>
                <select name="sort-by" id="sort-by" value={searchParamsObject.sortby} onChange={handleSortingChange}>
                  <option value="default">Sort by</option>
                  <option value="price-ascending">Cheapest first</option>
                  <option value="price-descending">Expensive first</option>
                  <option value="rating-descending">Higher rated first</option>
                  <option value="rating-ascending">Lower rated first</option>
                  <option value="discount-descending">Higher discount first</option>
                  <option value="discount-ascending">Lower discount first</option>
                </select>
                <label htmlFor="products-view-list">
                  <input
                    type="radio"
                    name="products-view"
                    id="products-view-list"
                    checked={productsView === 'list'}
                    onChange={handleViewChange}
                  />
                  List
                </label>
                <label htmlFor="products-view-grid">
                  <input
                    type="radio"
                    name="products-view"
                    id="products-view-grid"
                    checked={productsView === 'grid'}
                    onChange={handleViewChange}
                  />
                  Grid
                </label>
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
