'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';
import Symbol from '@assets/Symbol.png';
import Onboarding from '@assets/Onboarding.png';

export default function Page() {
  const isLoggedIn = true; // 실제로는 로그인 여부에 따라 분기해야 함 (예: useSession or cookies 등)

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src={Symbol} alt="symbol" />
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
        <h1>JUST SWIM</h1>
        <p>수영을 더 자유롭게, 더 전문적으로</p>
        <Link href="/signin" className={styles.cta}>
          DIVE IN
        </Link>
      </main>

      {/* <button className={styles.floatingChat}>문의</button> */}
    </div>
  );
}
