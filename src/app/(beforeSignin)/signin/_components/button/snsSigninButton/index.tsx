'use client';

import styles from './button.module.scss';
import { useRouter } from 'next/navigation';
import { HTTP_STATUS, TEXT, USER_TYPE, ROUTES } from '@data';
import IconKakao from '@assets/icon_kakao.svg';
import IconNaver from '@assets/icon_naver.svg';
import { getUserDetail, getSignUp } from '@apis';
import { getTokenInCookies } from '@utils';
import { Provider } from '@types';

const SNS_ICONS = {
  kakao: IconKakao,
  naver: IconNaver,
} as const;

export function SNSSignInButton({ sns }: { sns: Provider }) {
  const router = useRouter();
  const Icon = SNS_ICONS[sns];

  const handleOnboarding = async () => {
    const authorizationToken = await getTokenInCookies();

    if (authorizationToken) {
      const userInfo = await getUserDetail();

      if (status === HTTP_STATUS.NOT_ACCEPTABLE) {
        setAddUserToken('');
        return router.replace(ROUTES.ONBOARDING.signin);
      }

      setAddUserProfile({ token: authorizationToken, profile: data?.data });
      const checkType = getUserType(authorizationToken);
      if (
        checkType === USER_TYPE.INSTRUCTOR ||
        checkType === USER_TYPE.CUSTOMER
      ) {
        return router.replace(ROUTES.SCHEDULE.root);
      }
      return router.replace(ROUTES.ONBOARDING.type);
    }
    const redirectURL = await getSignUp(sns);
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
          <p>{TEXT.SIGNUP_PAGE.provider[sns]}</p>
        </div>
      </button>
    </div>
  );
}
