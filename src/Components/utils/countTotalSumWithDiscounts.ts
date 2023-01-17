const countTotalSumWithDiscounts = (currentCost: number, arrOfDiscounts: number[]) => {
  const totalDiscounts = arrOfDiscounts.reduce<number>((acc, discount) => acc + discount, 0);

  const result = (currentCost - (currentCost / 100) * totalDiscounts).toFixed(2);

  return result;
};

export default countTotalSumWithDiscounts;
