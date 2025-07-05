'use client';

import styles from './pages.module.scss';

import { useEffect, useState } from 'react';
import { USER_TYPE, TEXT, HTTP_STATUS, ROUTES } from '@data';
import { UserType } from '@types';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserDetail, updateUser } from '@apis';
import Image from 'next/image';

import Symbol from '@assets/Symbol.png';
import IconInputValid from '@assets/icon_input_valid.svg';
import { setTokenInCookies } from '@utils';

export default function Type() {
  const router = useRouter();
  const token = useSearchParams().get('token');

  const [userType, setUserType] = useState<UserType>();
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [valid, setValid] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkUserType = async () => {
      if (token) {
        await setTokenInCookies(token);

        try {
          const data = await getUserDetail();
          setName(data?.data.name);

          if (data?.data.userType) {
            router.replace(ROUTES.ONBOARDING.home);
          }
        } catch (err: any) {
          console.error('[checkUserType error]', err);
          setErrorMsg(err?.message || '에러가 발생했습니다.');
        }
      } else {
        console.log('token이 없습니다.');
      }
    };

    checkUserType();
  }, [router]);

  useEffect(() => {
    const isValid =
      userType !== null &&
      name.trim().length > 0 &&
      birth.length === 10 &&
      phoneNumber.length === 13;

    setValid(isValid);
  }, [userType, name, birth, phoneNumber]);

  const handleNextPage = async () => {
    const { status } = await updateUser({
      name,
      birth,
      phoneNumber,
      userType,
    });

    if (status === true) {
      router.push(ROUTES.ONBOARDING.home);
    }
  };

  const handleInputName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleInputBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자만 남김

    if (value.length > 8) value = value.slice(0, 8);

    if (value.length >= 7) {
      value = `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6)}`;
    } else if (value.length >= 5) {
      value = `${value.slice(0, 4)}.${value.slice(4)}`;
    } else {
      value = value;
    }

    setBirth(value);
  };

  const handleInputPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length >= 8) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    } else if (value.length >= 4) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }

    setPhoneNumber(value);
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Image src={Symbol} alt="symbol" />
          </div>
        </nav>

        <div className={styles.user_info_section}>
          <h1>회원 가입을 완료해주세요</h1>

          {/* 유저 타입 */}
          <div className={styles.input_wrapper}>
            <div className={styles.content}>
              {Object.values(USER_TYPE).map((data) => (
                <button
                  key={data}
                  className={`${styles.button} ${userType === data ? styles.selected : ''}`}
                  onClick={() => {
                    setUserType(data);
                  }}>
                  {TEXT.TYPE_SELECT_PAGE.userType[data]}
                </button>
              ))}
            </div>
          </div>

          {/* 이름 */}
          <div className={styles.nickname_wrapper}>
            <input
              type="text"
              value={name}
              onChange={handleInputName}
              className={styles.nickname}
            />
            {valid && <IconInputValid width={18} height={18} />}
          </div>

          {/* 전화 번호 */}
          <div className={styles.input_wrapper}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handleInputPhoneNumber}
              inputMode="numeric"
              placeholder="전화번호 ex) 010-1234-5678"
              className={styles.input}
            />
          </div>

          {/* 생년 월일 */}
          <div className={styles.input_wrapper}>
            <input
              type="text"
              value={birth}
              onChange={handleInputBirth}
              inputMode="numeric"
              placeholder="생년월일 ex) 1995.09.13"
              className={styles.input}
            />
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className={styles.profile_setting_footer}>
          <div className={styles.button_wrapper}>
            <button
              className={`${styles.select_button} ${valid ? styles.active : ''}`}
              onClick={handleNextPage}>
              {valid ? TEXT.COMMON.done : TEXT.COMMON.next}
            </button>
          </div>
        </div>
      </div>
      {errorMsg && <div className={styles.error_box}>{errorMsg}</div>}
    </>
  );
}
