import React from 'react';
import styles from './SiteContainer.module.scss';

type TSiteContainer = {
  children: React.ReactNode;
}

function SiteContainer(props: TSiteContainer) {
  const { children } = props;
  return (
    <div className={styles.container}>{children}</div>
  );
}

export default SiteContainer;
