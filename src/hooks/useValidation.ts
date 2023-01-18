import { useState, useEffect } from 'react';
import areAllInputsValid from '../Components/utils/areAllInputsValid';
import { TValidations } from '../types/types';

const useValidation = (value: string, validations:TValidations) => {
  const [isEmpty, setIsEmpty] = useState(false);

  // Валидация личных данных

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

  // Валидация банковской карточки

  // Номер карты должен состоять только из цифр
  const [isCardNumberInvalid, setIsCardNumberInvalid] = useState(false);
  // Номер карты должен состоять из 16 цифр
  const [isCardNumberLengthInvalid, setIsCardNumberLengthInvalid] = useState(false);

  // Верное количество месяцев
  const [isCardDateMonthInvalid, setIsCardDateMonthInvalid] = useState(false);
  // Верное количество лет
  const [isCardDateYearInvalid, setIsCardDateYearInvalid] = useState(false);

  // Верное количество лет
  const [isCardCVVInvalid, setIsCardCVVInvalid] = useState(false);

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
          if (value.trim().split(' ').join('').length < 10) {
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
          if (!/^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(value)) {
            setIsPhoneInvalid(true);
          } else setIsPhoneInvalid(false);
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
          if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)) {
            setIsMailInvalid(false);
          } else {
            setIsMailInvalid(true);
          }
          break;

        case 'isCardNumberInvalid':
          if (!value.length) setIsCardNumberInvalid(true);
          value.split('').forEach((char) => {
            if (!/[0-9]/.test(char)) {
              setIsCardNumberInvalid(true);
            } else setIsCardNumberInvalid(false);
          });
          break;

        case 'isCardNumberLengthInvalid':
          if (value.length < 16 || value.length > 16) {
            setIsCardNumberLengthInvalid(true);
          } else setIsCardNumberLengthInvalid(false);
          break;

        case 'isCardDateMonthInvalid':
          if (value.trim().length === 1 && !/^([1-9])$/.test(value.trim())) {
            setIsCardDateMonthInvalid(true);
            break;
          } else setIsCardDateMonthInvalid(false);

          if (value.trim().length > 1 && !/^(1[012]|0?[1-9])$/.test(value)) {
            setIsCardDateMonthInvalid(true);
          } else setIsCardDateMonthInvalid(false);
          break;

        case 'isCardDateYearInvalid':
          if (!/^(2[3-9]|[3-9][0-9])$/.test(value)) {
            setIsCardDateYearInvalid(true);
          } else setIsCardDateYearInvalid(false);
          break;

        case 'isCardCVVInvalid':
          if (!/^\d{3}$/.test(value)) {
            setIsCardCVVInvalid(true);
          } else setIsCardCVVInvalid(false);
          break;

        default:
          break;
      }
    });
  }, [value]);

  const isAllValid = areAllInputsValid([isEmpty,
    minLengthName,
    minLengthNameForEachWord,
    isPhoneLengthInvalid,
    isPhoneNotStartWithPlus,
    isPhoneInvalid,
    minLengthAddress,
    minLengthAddressForEachWord,
    isMailInvalid,
    isCardNumberInvalid,
    isCardNumberLengthInvalid,
    isCardDateMonthInvalid,
    isCardDateYearInvalid,
    isCardCVVInvalid]);

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
    isCardNumberInvalid,
    isCardNumberLengthInvalid,
    isCardDateMonthInvalid,
    isCardDateYearInvalid,
    isCardCVVInvalid,
    isAllValid,
  };
};

export default useValidation;
