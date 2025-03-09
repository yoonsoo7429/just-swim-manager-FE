'use client';

import { SNS } from '@data';
import { Provider } from '@types';

import styles from './page.module.scss';

import { SNSSignInButton } from './_components/button/snsSigninButton';

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Just-Swim</h1>
        <p>회원 가입 후, Just-Swim의 세계로 들어오세요</p>
      </div>

      {/* 소셜 로그인 버튼 섹션 */}
      <div className={styles.sns_section}>
        {Object.values(SNS).map((sns) => (
          <SNSSignInButton key={sns} sns={sns as Provider} />
        ))}
      </div>
    </div>
  );
}
