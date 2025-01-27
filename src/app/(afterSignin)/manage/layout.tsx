'use client';

import { ReactNode } from 'react';
import Sidebar from './_components/sidebar/sidebar';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
