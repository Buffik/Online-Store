import isInSearchParams from './isInSearchParams';
import { TFilterSelectionTypes, TSearchParamsObject, TSetSearchParamsObject } from '../../types/types';

type THandleCheckboxFilter = (
  filterName: TFilterSelectionTypes,
  filterValue: string,
  searchParamsObject: TSearchParamsObject,
  setSearchParamsObject: TSetSearchParamsObject
) => void;

const handleCheckboxFilter:
THandleCheckboxFilter = (filterName, filterValue, searchParamsObject, setSearchParamsObject) => {
  const addToSearchParams = () => {
    if (searchParamsObject[filterName] !== undefined) {
      setSearchParamsObject({ ...searchParamsObject, [filterName]: `${searchParamsObject[filterName]},${filterValue}` });
    } else {
      setSearchParamsObject({ ...searchParamsObject, [filterName]: filterValue });
    }
  };

  const removeFromSearchParams = () => {
    let filterArr = searchParamsObject[filterName].split(',');
    if (filterArr.length === 1) {
      const copiedSearchParamsObject = { ...searchParamsObject };
      delete copiedSearchParamsObject[filterName];
      setSearchParamsObject(copiedSearchParamsObject);
    } else {
      filterArr = filterArr.filter((item) => item !== filterValue);
      setSearchParamsObject({ ...searchParamsObject, [filterName]: filterArr.join(',') });
    }
  };

  if (isInSearchParams(filterName, filterValue, searchParamsObject)) {
    removeFromSearchParams();
  } else {
    addToSearchParams();
  }
};

export default handleCheckboxFilter;
