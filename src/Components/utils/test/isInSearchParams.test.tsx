import isInSearchParams from '../isInSearchParams';

const paramsObject = {
  category: 'laptops',
  brand: 'Apple',
  lala: 'la',
};

const paramsObjectMultipleValues = {
  category: 'smartphones,laptops',
  brand: 'Apple,Royal_Mirage,HP Pavilion',
  lala: 'la,la,la',
};

const paramsObjectEmpty = {};

describe('isInSearchParams', () => {
  test('Gets correct results from an object with single values', () => {
    expect(isInSearchParams('category', 'smartphones', paramsObject)).toBe(false);
    expect(isInSearchParams('category', 'laptops', paramsObject)).toBe(true);
    expect(isInSearchParams('brand', 'Apple', paramsObject)).toBe(true);
    expect(isInSearchParams('brand', 'HP Pavilion', paramsObject)).toBe(false);
  });
  test('Gets correct results from an object with multiple values', () => {
    expect(isInSearchParams('category', 'smartphones', paramsObjectMultipleValues)).toBe(true);
    expect(isInSearchParams('category', 'laptops', paramsObjectMultipleValues)).toBe(true);
    expect(isInSearchParams('category', 'fragrance', paramsObjectMultipleValues)).toBe(false);
    expect(isInSearchParams('brand', 'Apple', paramsObjectMultipleValues)).toBe(true);
    expect(isInSearchParams('brand', 'HP Pavilion', paramsObjectMultipleValues)).toBe(true);
    expect(isInSearchParams('brand', 'HP', paramsObjectMultipleValues)).toBe(false);
  });
  test('Gets correct results from an empty object', () => {
    expect(isInSearchParams('category', 'smartphones', paramsObjectEmpty)).toBe(false);
    expect(isInSearchParams('category', 'laptops', paramsObjectEmpty)).toBe(false);
    expect(isInSearchParams('brand', 'Apple', paramsObjectEmpty)).toBe(false);
    expect(isInSearchParams('brand', 'HP Pavilion', paramsObjectEmpty)).toBe(false);
  });
});
