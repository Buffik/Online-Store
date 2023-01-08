import React from 'react';
import styles from './Footer.module.scss';
import logo from '../../assets/images/rs_school_js.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          {'Developed by '}
          <a href="https://github.com/Buffik">Buffik</a>
          {', '}
          <a href="https://github.com/dinara-n">dinara-n</a>
        </p>
        <p>© 2023</p>
        <a href="https://rs.school/js/">
          <img src={logo} width="55.28" height="20.53" alt="" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
