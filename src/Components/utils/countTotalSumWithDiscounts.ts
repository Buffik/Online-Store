const countTotalSumWithDiscounts = (currentCost: number, arrOfDiscounts: number[]) => {
  const totalDiscounts = arrOfDiscounts.reduce<number>((acc, discount) => {
    // eslint-disable-next-line no-param-reassign
    acc += discount;
    return acc;
  }, 0);

  const result = (currentCost - (currentCost / 100) * totalDiscounts).toFixed(2);

  return result;
};

export default countTotalSumWithDiscounts;
