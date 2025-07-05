'use client';

import styles from './button.module.scss';
import { useRouter } from 'next/navigation';
import { HTTP_STATUS, TEXT, USER_TYPE, ROUTES } from '@data';
import IconKakao from '@assets/icon_kakao.svg';
import IconNaver from '@assets/icon_naver.svg';
import { getUserDetail, signin } from '@apis';
import { getTokenInCookies } from '@utils';
import { Provider } from '@types';
import { useUserStore } from '@store';

const SNS_ICONS = {
  kakao: IconKakao,
  naver: IconNaver,
} as const;

export function SNSSignInButton({ sns }: { sns: Provider }) {
  const router = useRouter();
  const Icon = SNS_ICONS[sns];

  const handleOnboarding = async () => {
    const redirectURL = await signin(sns);
    if (!redirectURL) {
      throw new Error('Failed to get the redirect URL');
    }
    return router.push(redirectURL!);
  };

  return (
    <div className={styles.button_wrapper}>
      <button
        onClick={handleOnboarding}
        className={`${styles[`${sns}_button`]}`}>
        <div>
          <Icon className={styles.sns_image} />
        </div>
      </button>
    </div>
  );
}
