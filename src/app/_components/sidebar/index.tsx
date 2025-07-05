'use client';

import Link from 'next/link';
import styles from './styles.module.scss';
import { JUST_SWIM } from '@data';
import { forwardRef } from 'react';
import Image from 'next/image';

import Symbol from '@assets/Symbol.png';
import Logo from '@assets/logo.jpg';
import IconArrowRight from '@assets/icon_arrow_right.svg';
import IconDashboard from '@assets/icon_dashboard.svg';

function _Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <Image
        src={Logo}
        alt="symbol"
        height={80}
        width={80}
        aria-label={JUST_SWIM}
      />
      <ul>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/about">ABOUT</Link>
        </li>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/program">PROGRAM</Link>
        </li>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/coach">COACH</Link>
        </li>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/contact">CONTACT</Link>
        </li>
      </ul>
    </nav>
  );
}

export default forwardRef(_Sidebar);
