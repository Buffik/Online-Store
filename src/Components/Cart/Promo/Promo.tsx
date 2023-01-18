import React, { useEffect, useState } from 'react';
import { TPromoCodesArr } from '../../../types/types';
import checkDiscount from '../../utils/checkDiscount';
import isPromoCodeTrue from '../../utils/isPromoCodeTrue';
import AddCode from './handleCodes/AddCode';
import styles from './promo.module.scss';

interface IPromoProps {
  isCodeTrue: boolean
  currenCodes: number[]
  setIsCodeTrue: (boolean:boolean) => void
  setIsCodeAdd: (event: React.MouseEvent<HTMLButtonElement>, isAdd: boolean) => void
}

function Promo({
  isCodeTrue, setIsCodeTrue, setIsCodeAdd, currenCodes,
}: IPromoProps) {
  const promoCodesArr: TPromoCodesArr = [{ name: 'promo', discount: 10 }, { name: 'another', discount: 15 }];
  const [codeInput, setCodeInput] = useState('');
  useEffect(() => {
    setIsCodeTrue(isPromoCodeTrue(promoCodesArr, codeInput, currenCodes));
  }, [codeInput]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInput}>
        <input className={styles.input} placeholder="Enter promo code" value={codeInput} onChange={(event) => setCodeInput(event.currentTarget.value)} />
      </div>
      <div className={styles.textSummary}>
        {isCodeTrue
          ? <AddCode todo="ADD" code={codeInput} discount={checkDiscount(promoCodesArr, codeInput)} setCode={setIsCodeAdd} inputData={setCodeInput} /> : 'For test: "PROMO", "ANOTHER"' }
      </div>
    </div>
  );
}

export default Promo;
