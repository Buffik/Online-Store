import React, { useEffect, useState } from 'react';
import useInput from '../../../../hooks/useInput';
import handleCardImg from '../../../utils/handleCardImg';
import isFormValidHandle from '../../../utils/isFormValidHandle';
import styles from './purchase.module.scss';

interface IPurchase {
    // eslint-disable-next-line no-unused-vars
  setShowAffirmative: (bool: boolean) => void
}

function Purchase({ setShowAffirmative }: IPurchase) {
  const [runValidate, setRunValidate] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFormValid, setIsFormValid] = useState(false);
  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>, isFormVal: boolean) => {
    event.preventDefault();
    if (!isFormVal) setRunValidate(true);
    if (isFormVal) {
      setShowAffirmative(true);
    }
  };

  const name = useInput('', runValidate, { isEmpty: true, minLengthName: true, minLengthNameForEachWord: true });
  const phone = useInput('', runValidate, {
    isEmpty: true, isPhoneLengthInvalid: true, isPhoneNotStartWithPlus: true, isPhoneInvalid: true,
  });
  const address = useInput('', runValidate, { isEmpty: true, minLengthAddressForEachWord: true, minLengthAddress: true });
  const email = useInput('', runValidate, { isEmpty: true, isMailInvalid: true });
  const cardNumber = useInput('', runValidate, { isEmpty: true, isCardNumberInvalid: true, isCardNumberLengthInvalid: true });
  const cardMonth = useInput('', runValidate, { isEmpty: true, isCardDateMonthInvalid: true });
  const cardYear = useInput('', runValidate, { isCardDateYearInvalid: true });
  const cardCVV = useInput('', runValidate, { isEmpty: true, isCardCVVInvalid: true });

  useEffect(() => {
    const result = isFormValidHandle([
      name.isAllValid,
      phone.isAllValid,
      address.isAllValid,
      email.isAllValid,
      cardNumber.isAllValid,
      cardMonth.isAllValid,
      cardYear.isAllValid,
      cardCVV.isAllValid,
    ]);
    setIsFormValid(result);
  }, [name.isAllValid,
    phone.isAllValid,
    address.isAllValid,
    email.isAllValid,
    cardNumber.isAllValid,
    cardMonth.isAllValid,
    cardYear.isAllValid,
    cardCVV.isAllValid]);
  return (
    <div className={styles.formWrapper}>
      <form className={styles.myForm} autoComplete="off">
        <h2 className={styles.title}>Personal details</h2>
        {(name.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {name.isEmpty && <div>!! Enter your Name and Surname !!</div>}
            {name.minLengthName && <div>!! Minimum 2 words required !!</div>}
            {name.minLengthNameForEachWord && (
            <div>
              !! Minimum 2 words with 3 letters in each required !!
            </div>
            )}
          </div>
          )}
        <input className={styles.myInput} onChange={(e) => name.onChange(e)} value={name.value} type="text" name="Name" placeholder="Name" />
        {(phone.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {phone.isEmpty && <div>!! Enter your phone !!</div>}
            {phone.isPhoneLengthInvalid && <div>!! Minimum 9 digits required !!</div>}
            {phone.isPhoneNotStartWithPlus && <div>!! Should start from `+` !!</div>}
            {phone.isPhoneInvalid && <div>!! Should contains only digits !!</div>}
          </div>
          )}
        <input className={styles.myInput} onChange={(e) => phone.onChange(e)} value={phone.value} type="text" name="Phone" placeholder="Phone" />
        {(address.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {address.isEmpty && <div>!! Enter your address !!</div>}
            {address.minLengthAddress && <div>!! Minimum 3 words required !!</div>}
            {address.minLengthAddressForEachWord && (
            <div>
              !! Minimum 3 words with 5 letters in each required !!
            </div>
            )}
          </div>
          )}
        <input className={styles.myInput} onChange={(e) => address.onChange(e)} type="text" name="Address" placeholder="Delivery address" />
        {(email.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {email.isEmpty && <div>!! Enter your e-mail !!</div>}
            {email.isMailInvalid && <div>!! E-mail should be correct !!</div>}
          </div>
          )}
        <input className={styles.myInput} onChange={(e) => email.onChange(e)} type="text" name="Email" placeholder="E-mail" />
        <div className={styles.cardWrapper}>
          <h3 className={styles.title}>Credit card details</h3>
          {(cardNumber.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {cardNumber.isEmpty && <div>!! Enter your card number !!</div>}
            {cardNumber.isCardNumberInvalid && (
            <div>
              !! Card number should contain only digits !!
            </div>
            )}
            {cardNumber.isCardNumberLengthInvalid && (
            <div>
              !! Card number length should be at least 16 !!
            </div>
            )}
          </div>
          )}
          <div className={styles.cardNumber}>
            <img className={styles.cardImg} alt="" src={handleCardImg(cardNumber.value)} />
            <input onChange={(e) => cardNumber.onChange(e)} type="text" name="cardNumber" placeholder="Card number" className={styles.cardNumberInput} />
          </div>
          {(cardMonth.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {cardMonth.isEmpty && <div>!! Enter your card date !!</div>}
            {cardCVV.isEmpty && <div>!! Enter your card CVV !!</div>}
            {cardMonth.isCardDateMonthInvalid && <div>!! Enter correct month !!</div>}
            {cardYear.isCardDateYearInvalid && <div>!! Enter correct year !!</div>}
            {cardCVV.isCardCVVInvalid && <div>!! Enter correct CVV !!</div>}
          </div>
          )}
          <div className={styles.otherData}>
            <div className={styles.otherDataExpirationWrapper}>
              <span className={styles.otherDataExpirationPlaceholder}>Date:</span>
              <div className={styles.dataExpiration}>
                <input onChange={(e) => cardMonth.onChange(e)} type="text" name="month" placeholder="MM" />
                <span>/</span>
                <input onChange={(e) => cardYear.onChange(e)} type="text" name="year" placeholder="YY" />
              </div>
            </div>
            <div>
              {' '}
              CVV:
              {' '}
              <input onChange={(e) => cardCVV.onChange(e)} type="text" name="cardCVV" placeholder="CVV" className={styles.otherDataCVV} />
            </div>
          </div>
        </div>
        <button
          type="button"
          className={styles.formButton}
          onClick={(e) => handleClickButton(e, isFormValid)}
        >
          CONFIRM
        </button>
      </form>
    </div>
  );
}

export default Purchase;
