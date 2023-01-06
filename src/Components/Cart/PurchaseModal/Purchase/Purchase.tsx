import React, { useState } from 'react';
import useInput from '../../../../hooks/useInput';
import styles from './purchase.module.scss';

function Purchase() {
  const [runValidate, setRunValidate] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFormValid, setIsFormValid] = useState(false);
  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>, isFormVal: boolean) => {
    event.preventDefault();
    if (!isFormVal) setRunValidate(true);
  };
  const name = useInput('', runValidate, { isEmpty: true, minLengthName: true, minLengthNameForEachWord: true });
  const phone = useInput('', runValidate, {
    isEmpty: true, isPhoneLengthInvalid: true, isPhoneNotStartWithPlus: true, isPhoneInvalid: true,
  });
  const address = useInput('', runValidate, { minLengthAddressForEachWord: true, minLengthAddress: true });

  return (
    <div className={styles.formWrapper}>
      <form className={styles.myForm} autoComplete="off">
        <h2>Personal details</h2>
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
        <input onChange={(e) => name.onChange(e)} value={name.value} type="text" name="Name" placeholder="Name" />
        {(phone.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {phone.isEmpty && <div>!! Enter your phone !!</div>}
            {phone.isPhoneLengthInvalid && <div>!! Minimum 9 digits required !!</div>}
            {phone.isPhoneNotStartWithPlus && <div>!! Should start from `+` !!</div>}
            {phone.isPhoneInvalid && <div>!! Should contains only digits !!</div>}
          </div>
          )}
        <input onChange={(e) => phone.onChange(e)} value={phone.value} type="text" name="Phone" placeholder="Phone" />
        {(phone.isDirty)
          && (
          <div className={styles.errorTextWrapper}>
            {address.isEmpty && <div>!! Enter your phone !!</div>}
            {address.minLengthAddress && <div>!! Minimum 3 words required !!</div>}
            {address.minLengthAddressForEachWord && (
            <div>
              !! Minimum 3 words with 5 letters in each required !!
            </div>
            )}
          </div>
          )}
        <input onChange={(e) => address.onChange(e)} type="text" name="Address" placeholder="Delivery address" />
        <input type="text" name="Email" placeholder="E-mail" />
        <div className={styles.cardWrapper}>
          <h3>Credit card details</h3>
          <div className={styles.cardNumber}>
            <img alt="" src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg" />
            <input type="text" name="cardNumber" placeholder="Card number" className={styles.cardNumberInput} />
          </div>
          <div className={styles.otherData}>
            <div className="valid-data">
              {' '}
              VALID:
              {' '}
              <input type="text" name="cardDate" placeholder="Valid Thru" className={styles.otherDataDate} />
            </div>
            <div className="cvv-data">
              {' '}
              CVV:
              {' '}
              <input type="text" name="cardCVV" placeholder="Code" className={styles.otherDataCVV} />
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
