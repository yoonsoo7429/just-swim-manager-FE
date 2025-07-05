'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from './_components/sidebar';

import Symbol from '@assets/Symbol.png';
import Logo from '@assets/logo.jpg';
import IconBars from '@assets/icon_bars.svg';

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    const hasAuthToken = cookies.includes('authorization=');
    setIsLoggedIn(hasAuthToken);
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <button
          className={styles.sidebar}
          onClick={() => setIsSidebarOpen(true)}>
          <IconBars width={24} height={24} fill="#fff" />
        </button>

        {isSidebarOpen && (
          <>
            <div
              className={styles.sidebar_backdrop}
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className={styles.sidebar_wrapper}>
              <Sidebar />
              <button
                className={styles.close_button}
                onClick={() => setIsSidebarOpen(false)}>
                ✕
              </button>
            </div>
          </>
        )}

        <div className={styles.logo}>
          <Image src={Logo} alt="symbol" />
        </div>
        <ul className={styles.menu}>
          <li>ABOUT</li>
          <li>PROGRAM</li>
          <li>COACH</li>
          <li>CONTACT</li>
        </ul>
        <div className={styles.sub_menu}>
          {isLoggedIn ? (
            <>
              <Link href="/mypage">My Page</Link>
              <button>Sign Out</button>
            </>
          ) : (
            <Link href="/signin">Sign In</Link>
          )}
        </div>
      </nav>

      <main className={styles.hero}>
        {/* <h1>JUST SWIM</h1>
        <p>수영을 더 자유롭게, 더 전문적으로</p>
        <Link href="/signin" className={styles.cta}>
          DIVE IN
        </Link> */}
      </main>

      {/* <button className={styles.floatingChat}>문의</button> */}
    </div>
  );
}
