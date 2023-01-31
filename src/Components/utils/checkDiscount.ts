import { TPromoCodesArr } from '../../types/types';

const checkDiscount = (arr:TPromoCodesArr, code: string) => {
  let result = 0;
  arr.forEach((el) => {
    if (el.name === code.toLocaleLowerCase().trim()) {
      result = el.discount;
    }
  });
  return result;
};

export default checkDiscount;
