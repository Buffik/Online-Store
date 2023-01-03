import React from 'react';
import styles from './ProductCartButton.module.scss';

interface CartButtonProps {
  children: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  onClick: (event:React.MouseEvent<HTMLButtonElement>) => void
  value: number

}

function ProductCartButton({ children, onClick, value }: CartButtonProps) {
  return (
    <button type="button" value={value} onClick={onClick} className={styles.myBtn}>
      {children}
    </button>
  );
}

export default ProductCartButton;
