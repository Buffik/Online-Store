import React from 'react';
import { IAddHandler } from '../../../../types/types';
import styles from './code.module.scss';

function AddCode({
  todo, code, discount, setCode, inputData,
}: IAddHandler) {
  return (
    <div className={styles.textCode}>
      {`Code "${code}", discount - ${discount}%`}
      <button className={styles.buttonCode} type="button" value={discount} onClick={(e) => { setCode(e, true); inputData(''); }}>{todo}</button>
    </div>
  );
}

export default AddCode;
