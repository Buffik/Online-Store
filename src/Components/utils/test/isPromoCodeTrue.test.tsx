import isPromoCodeTrue from '../isPromoCodeTrue';

const promoCodesArray = [
  { name: 'true', discount: 10 },
  { name: 'false', discount: 15 },
  { name: 'rs', discount: 20 },
  { name: 'asdf', discount: 25 },
  { name: 'not_code', discount: 30 },
];

const firstCode = 'true';
const firstCurrentCodesArray = [10, 15];
const firstResult = false;

const secondCode = 'rs';
const secondCurrentCodesArray = [10, 15, 25, 30];
const secondResult = true;

const thirdCode = 'ASDF';
const thirdCurrentCodesArray = [10, 15, 20, 30];
const thirdResult = true;

describe('isPromoCodeTrue', () => {
  test('Should check codes from firstCurrentCodesArray', () => {
    expect(isPromoCodeTrue(
      promoCodesArray,
      firstCode,
      firstCurrentCodesArray,
    )).toBe(firstResult);
  });
  test('Should check codes from secondCurrentCodesArray', () => {
    expect(isPromoCodeTrue(
      promoCodesArray,
      secondCode,
      secondCurrentCodesArray,
    )).toBe(secondResult);
  });
  test('Should check codes from thirdCurrentCodesArray', () => {
    expect(isPromoCodeTrue(
      promoCodesArray,
      thirdCode,
      thirdCurrentCodesArray,
    )).toBe(thirdResult);
  });
});
