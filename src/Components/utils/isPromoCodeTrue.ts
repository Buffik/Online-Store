import { TPromoCodesArr } from '../../types/types';

const isPromoCodeTrue = (promoCodesArr: TPromoCodesArr, code:string, currentCodes:number[]) => {
  let result = false;

  promoCodesArr.forEach((item) => {
    if (item.name === code.toLocaleLowerCase().trim() && !currentCodes.includes(item.discount)) {
      result = true;
    }
  });

  return result;
};

export default isPromoCodeTrue;
