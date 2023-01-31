import { TFilterSelectionTypes } from '../../types/types';

type TIsInSearchParams = (
  paramKey: TFilterSelectionTypes,
  paramValue: string,
  paramsObject: Record<string, string>,
) => boolean;

const isInSearchParams: TIsInSearchParams = (paramKey, paramValue, paramsObject) => {
  if (!paramsObject[paramKey]) {
    return false;
  }
  return paramsObject[paramKey].split(',').includes(paramValue);
};

export default isInSearchParams;
