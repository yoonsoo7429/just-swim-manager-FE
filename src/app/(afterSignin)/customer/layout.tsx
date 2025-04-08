'use client';

import styles from './layout.module.scss';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTokenInCookies, setTokenInCookies } from '@utils';
import Sidebar from './_components/sidebar/sidebar';
import { ROUTES } from '@data';

export default function Layout({ children }: { children: ReactNode }) {
  const params = useSearchParams().get('token');
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (params) {
        await setTokenInCookies(params);
        setReady(true);
        const cleanUrl = window.location.pathname;
        router.replace(cleanUrl);
        return;
      }

      const cookieToken = await getTokenInCookies();

      if (!cookieToken) {
        router.replace(ROUTES.ONBOARDING.signin);
        return;
      }
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
