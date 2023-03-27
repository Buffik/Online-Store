import { TProductPartialProps } from '../../types/types';

const countTotalCount = (arr: TProductPartialProps[]) => {
  const result = arr.reduce<number>((acc, product) => acc + product.count, 0);
  return result;
};

export default countTotalCount;
