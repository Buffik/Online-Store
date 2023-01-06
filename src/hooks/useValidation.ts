/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { TValidations } from '../types/types';

const useValidation = (value: string, validations:TValidations) => {
  const [isEmpty, setIsEmpty] = useState(false);

  // Имя должно состоять минимум из двух слов
  const [minLengthName, setMinLengthName] = useState(false);
  // Каждое слово в имени не менее 3-х символов
  const [minLengthNameForEachWord, setMinLengthNameForEachWord] = useState(false);

  // Телефон должен содержать не менее 9 цифр
  const [isPhoneLengthInvalid, setIsPhoneLengthInvalid] = useState(false);
  // Телефон должен начинаться с +
  const [isPhoneNotStartWithPlus, setIsPhoneNotStartWithPlus] = useState(false);
  // Телефон должен состоять только из цифр
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

  // Адрес не менее 3-х слов
  const [minLengthAddress, setMinLengthAddress] = useState(false);
  // Каждое слово в адресе не менее 5-ти символов
  const [minLengthAddressForEachWord, setMinLengthAddressForEachWord] = useState(false);

  // Валидациея почты
  const [isMailInvalid, setIsMailInvalid] = useState(false);

  useEffect(() => {
    const validationsKeys = Object.keys(validations);
    validationsKeys.forEach((key) => {
      switch (key) {
        case 'isEmpty':
          if (value.length === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
          break;

        case 'minLengthName':
          if (value.trim().split(' ').length < 2) {
            setMinLengthName(true);
          } else setMinLengthName(false);
          break;

        case 'minLengthNameForEachWord':
          if (value.trim().split(' ').reduce<number>((acc, word) => {
            if (word.length > 2) {
              return acc + 1;
            }
            return acc;
          }, 0) >= 2) {
            setMinLengthNameForEachWord(false);
          } else {
            setMinLengthNameForEachWord(true);
          }
          break;

        case 'isPhoneLengthInvalid':
          if (value.length < 10) {
            setIsPhoneLengthInvalid(true);
          } else {
            setIsPhoneLengthInvalid(false);
          }
          break;

        case 'isPhoneNotStartWithPlus':
          if (value.split('')[0] !== '+') {
            setIsPhoneNotStartWithPlus(true);
          } else {
            setIsPhoneNotStartWithPlus(false);
          }
          break;

        case 'isPhoneInvalid':
          value.split('').forEach((char, index) => {
            if (index !== 0) {
              if (!/[0-9]/.test(char)) {
                setIsPhoneInvalid(true);
              } else setIsPhoneInvalid(false);
            }
          });
          break;

        case 'minLengthAddress':
          if (value.split(' ').length < 3) setMinLengthAddress(true);
          else setMinLengthAddress(false);
          break;

        case 'minLengthAddressForEachWord':
          if (value.split(' ').reduce<number>((acc, word) => {
            if (word.length > 4) {
              return acc + 1;
            }
            return acc;
          }, 0) > 2) {
            setMinLengthAddressForEachWord(false);
          } else {
            setMinLengthAddressForEachWord(true);
          }
          break;

        case 'isMailInvalid':
          if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value) && isMailInvalid) {
            setIsMailInvalid(true);
          } else if (isMailInvalid) {
            setIsMailInvalid(false);
          }
          break;

        default:
          break;
      }
    });
  }, [value]);

  return {
    isEmpty,
    minLengthName,
    minLengthNameForEachWord,
    isPhoneLengthInvalid,
    isPhoneNotStartWithPlus,
    isPhoneInvalid,
    minLengthAddress,
    minLengthAddressForEachWord,
    isMailInvalid,
  };
};

export default useValidation;
