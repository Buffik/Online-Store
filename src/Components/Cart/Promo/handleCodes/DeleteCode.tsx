import React from 'react';
import { IPromoCodeHandler } from '../../../../types/types';
import styles from './code.module.scss';

function DeleteCode({
  todo, code, discount, setCode,
}: IPromoCodeHandler) {
  return (
    <div className={styles.textCode}>
      {`"${code}" discount - ${discount}%!`}
      <button className={styles.buttonCode} type="button" value={discount} onClick={(e) => setCode(e, false)}>{todo}</button>
    </div>
  );
}

export default DeleteCode;
