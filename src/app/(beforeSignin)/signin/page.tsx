'use client';

import { useRouter } from 'next/navigation';
import { SNS } from '@data';
import { Provider } from '@types';

import styles from './page.module.scss';

import { SNSSignInButton } from './_components/button/snsSigninButton';

export default function SigninPage() {
  const router = useRouter();

  const handleSNSLogin = (provider: Provider) => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>Just-Swim</div>

      {/* 소셜 로그인 버튼 섹션 */}
      <div className={styles.sns_section}>
        {Object.values(SNS).map((sns) => (
          <SNSSignInButton key={sns} sns={sns as Provider} />
        ))}
      </div>
    </div>
  );
}
