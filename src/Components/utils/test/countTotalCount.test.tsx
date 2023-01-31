import countTotalCount from '../countTotalCount';

const firstData = [
  {
    id: 1,
    count: 2,
  },
  {
    id: 2,
    count: 1,
  },
  {
    id: 3,
    count: 5,
  },
  {
    id: 4,
    count: 3,
  },
];

const firstResult = 11;

const secondData = [
  {
    id: 1,
    count: 2,
  },
  {
    id: 2,
    count: 1,
  },
  {
    id: 3,
    count: 5,
  },
  {
    id: 4,
    count: 3,
  },
  {
    id: 5,
    count: 1,
  },
];

const secondResult = 12;

describe('countTotalCount', () => {
  test('Gets the first data array', () => {
    expect(countTotalCount(firstData)).toEqual(firstResult);
  });
  test('Gets the second data array', () => {
    expect(countTotalCount(secondData)).toEqual(secondResult);
  });
});
