import countTotalSumWithDiscounts from '../countTotalSumWithDiscounts';

const firstCurrenCost = 100;

const firstArrayOfDiscounts = [10, 20];

const firstResult = '70.00';

const secondCurrenCost = 1000;

const secondArrayOfDiscounts = [10, 20, 15];

const secondResult = '550.00';

describe('countTotalSumWithDiscounts', () => {
  test('Gets the first sum with discount', () => {
    expect(countTotalSumWithDiscounts(firstCurrenCost, firstArrayOfDiscounts)).toBe(firstResult);
  });
  test('Gets the second data array', () => {
    expect(countTotalSumWithDiscounts(
      secondCurrenCost,
      secondArrayOfDiscounts,
    )).toBe(secondResult);
  });
});
