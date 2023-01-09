import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteContainer from '../../Components/UI/container/SiteContainer';
import styles from './PageNotFound.module.scss';
import emptyBox from '../../assets/images/empty.png';

function PageNotFound() {
  return (
    <main className={styles.main}>
      <SiteContainer>
        <section className={styles.message}>
          <img src={emptyBox} alt="" />
          <h1 className={styles.title}>404 Page Not Found!</h1>
          <p className={styles.text}>This page does not seem to exist.</p>
          <NavLink
            className={styles.link}
            to="/"
          >
            Back to main
          </NavLink>
        </section>
      </SiteContainer>
    </main>
  );
}

export default PageNotFound;
