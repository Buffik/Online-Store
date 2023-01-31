import isFormValidHandle from '../isFormValidHandle';

const firstArray = [true, true, false, true];
const firstResult = false;

const secondArray = [true, true, true, true];
const secondResult = true;

const thirdArray = [true, true, true, true, false];
const thirdResult = false;

describe('isFormValidHandle', () => {
  test('Gets the first array', () => {
    expect(isFormValidHandle(firstArray)).toEqual(firstResult);
  });
  test('Gets the second array', () => {
    expect(isFormValidHandle(secondArray)).toEqual(secondResult);
  });
  test('Gets the third array', () => {
    expect(isFormValidHandle(thirdArray)).toEqual(thirdResult);
  });
});
