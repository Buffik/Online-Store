import { useEffect, useState } from 'react';
import { TValidations } from '../types/types';
import useValidation from './useValidation';

const useInput = (initialValue: string, runValidate: boolean, validations: TValidations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  useEffect(() => {
    if (runValidate) {
      setIsDirty(true);
    } else setIsDirty(false);
  }, [runValidate]);

  const onChange = (data: string) => {
    setValue(data);
  };

  return {
    value,
    isDirty,
    onChange,
    ...valid,
  };
};

export default useInput;
