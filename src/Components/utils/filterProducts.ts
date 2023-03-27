import { TProductsItem, TSearchParamsObject } from '../../types/types';

type TFilterProducts = (
  productsArray: TProductsItem[] | [],
  searchParamsObject: TSearchParamsObject
) => TProductsItem[] | [];

const filterProducts: TFilterProducts = (productsArray, searchParamsObject) => {
  let copy = productsArray.slice();
  if (searchParamsObject.category) {
    const params = searchParamsObject.category.split(',');
    copy = copy.filter((elem) => params.includes(elem.category));
  }
  if (searchParamsObject.brand) {
    const params = searchParamsObject.brand.split(',');
    copy = copy.filter((elem) => params.includes(elem.brand));
  }
  if (searchParamsObject.pricerange) {
    const [min, max] = searchParamsObject.pricerange.split(',').map((elem) => Number(elem));
    copy = copy.filter((elem) => elem.price >= min && elem.price <= max);
  }
  if (searchParamsObject.stockrange) {
    const [min, max] = searchParamsObject.stockrange.split(',').map((elem) => Number(elem));
    copy = copy.filter((elem) => elem.stock >= min && elem.stock <= max);
  }
  return copy;
};

export default filterProducts;
