import { TProductsItem, TFilterSelectionTypes } from '../../types/types';

const getFilterOptions = (source: TProductsItem[], filterType: TFilterSelectionTypes) => {
  const set = new Set(source.map((item) => item[filterType]));
  return Array.from(set).sort();
};

export default getFilterOptions;
