import { useSearchParams } from 'react-router-dom';

type TSearchParamsObject = Record<string, string>;

const useSearchParamsObject = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const entries = Array.from(searchParams.entries());
  const searchParamsObject: TSearchParamsObject = {};
  entries.forEach((entry) => {
    const [key, value] = entry;
    searchParamsObject[key] = value;
  });
  return [searchParamsObject, setSearchParams] as const;
};

export default useSearchParamsObject;
