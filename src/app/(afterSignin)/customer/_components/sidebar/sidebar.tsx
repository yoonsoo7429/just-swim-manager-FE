'use client';

import Link from 'next/link';
import styles from './sidebar.module.scss';
import JustSwimSVG from '@assets/logo.svg';
import { JUST_SWIM } from '@data';
import IconArrowRight from '@assets/icon_arrow_right.svg';
import IconDashboard from '@assets/icon_dashboard.svg';

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <JustSwimSVG className={styles.sidebar_logo} aria-label={JUST_SWIM} />
      <ul>
        <li>
          <IconDashboard width={24} height={24} fill="#fff" />
          <Link href="/customer">대시 보드</Link>
        </li>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/customer/lecture">수강 관리</Link>
        </li>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/customer/registration">수강 신청</Link>
        </li>
        <li>
          <IconArrowRight width={12} height={12} fill="#fff" />
          <Link href="/customer/payment">결제 기록</Link>
        </li>
      </ul>
    </nav>
  );
}
