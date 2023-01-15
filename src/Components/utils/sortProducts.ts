import { TProductsItem, TSearchParamsObject } from '../../types/types';

type TsortProducts = (
  productsArray: TProductsItem[] | [],
  searchParamsObject: TSearchParamsObject
) => TProductsItem[] | [];

const sortProducts: TsortProducts = (productsArray, searchParamsObject) => {
  const { sortby } = searchParamsObject;
  switch (sortby) {
    case 'price-ascending':
      return productsArray.sort((a, b) => a.price - b.price);
    case 'price-descending':
      return productsArray.sort((a, b) => b.price - a.price);
    case 'rating-ascending':
      return productsArray.sort((a, b) => a.rating - b.rating);
    case 'rating-descending':
      return productsArray.sort((a, b) => b.rating - a.rating);
    case 'discount-ascending':
      return productsArray.sort((a, b) => a.discountPercentage - b.discountPercentage);
    case 'discount-descending':
      return productsArray.sort((a, b) => b.discountPercentage - a.discountPercentage);
    default:
      return productsArray;
  }
  // if (sortby === 'price-ascending') {
  //   return productsArray.sort((a, b) => a.price - b.price);
  // }
  // if (sortby === 'price-descending') {
  //   return productsArray.sort((a, b) => b.price - a.price);
  // }
  // if (sortby === 'rating-ascending') {
  //   return productsArray.sort((a, b) => a.rating - b.rating);
  // }
  // if (sortby === 'rating-descending') {
  //   return productsArray.sort((a, b) => b.rating - a.rating);
  // }
  // if (sortby === 'discount-ascending') {
  //   return productsArray.sort((a, b) => a.discountPercentage - b.discountPercentage);
  // }
  // if (sortby === 'discount-descending') {
  //   return productsArray.sort((a, b) => b.discountPercentage - a.discountPercentage);
  // }
  // return productsArray;
};

export default sortProducts;
