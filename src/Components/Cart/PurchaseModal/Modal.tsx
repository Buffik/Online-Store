/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './modal.module.scss';

interface IModal {
  children: React.ReactNode
  visible: boolean
  setVisible: (bool:boolean) => void
}

function Modal({ children, visible, setVisible }: IModal) {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }
  return (
    <div
      className={rootClasses.join(' ')}
      onClick={() => setVisible(false)}
      onKeyUp={(e) => {
        if (e.key === 'Escape') {
          setVisible(false);
        }
      }}
    >
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
