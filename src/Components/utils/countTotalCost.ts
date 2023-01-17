import { TProductsItem, TProductPartialProps } from '../../types/types';

const countTotalCost = (arr: TProductsItem[], arr2: TProductPartialProps[]) => {
  const result = arr.reduce<number>((acc, product, index) => {
    const currentProductCount = arr2[index] ? arr2[index].count : 0;
    if (arr.length === arr2.length) {
      return acc + product.price * currentProductCount;
    }
    return acc;
  }, 0);
  return result;
};

export default countTotalCost;
