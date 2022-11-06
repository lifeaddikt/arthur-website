import React from 'react';
import Image from 'next/image'

import styles from './nav.module.scss';

const Nav = () => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Image width="24" height='24' src='/images/prev.svg'/>
        <p>Prev</p>
      </li>
      <li>
        <p>Next</p>
        <Image width="24" height='24' src='/images/next.svg'/>
      </li>
      <li>
        <Image width="24" height='24' src='/images/grid.svg'/>
        <p>Grid</p>
      </li>
    </ul>
  </nav>
);

export default Nav;
