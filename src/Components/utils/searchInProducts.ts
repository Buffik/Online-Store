import { TProductsItem, TSearchParamsObject } from '../../types/types';

type TSearchInProducts = (
  productsArray: TProductsItem[] | [],
  searchParamsObject: TSearchParamsObject
) => TProductsItem[] | [];

const searchInProducts: TSearchInProducts = (productsArray, searchParamsObject) => {
  let copy = productsArray.slice();
  if (searchParamsObject.search) {
    const query = searchParamsObject.search.trim().toLowerCase();
    copy = copy.filter((elem) => elem.title.toLowerCase().includes(query)
    || elem.category.toLowerCase().includes(query)
    || elem.brand.toLowerCase().includes(query)
    || elem.description.toLowerCase().includes(query)
    || elem.price.toString().includes(query)
    || elem.discountPercentage.toString().includes(query)
    || elem.rating.toString().includes(query)
    || elem.stock.toString().includes(query));
  }
  return copy;
};

export default searchInProducts;
