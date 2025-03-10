'use client';

import styles from './layout.module.scss';

import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTokenInCookies, setTokenInCookies } from '@utils';
import Sidebar from './_components/sidebar/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  const params = useSearchParams().get('token');

  useEffect(() => {
    const fetchToken = async () => {
      if (params) {
        setTokenInCookies(params);
      }

      await getTokenInCookies();
    };

    fetchToken();
  }, [params]);

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
