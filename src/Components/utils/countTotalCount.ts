import { TProductPartialProps } from '../../types/types';

const countTotalCount = (arr: TProductPartialProps[]) => {
  const result = arr.reduce<number>((acc, product) => {
    // eslint-disable-next-line no-param-reassign
    acc += product.count;
    return acc;
  }, 0);
  return result;
};

export default countTotalCount;
