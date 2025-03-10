'use client';

import styles from './pages.module.scss';

import { useLayoutEffect, useState } from 'react';
import { USER_GENDER, USER_TYPE, TEXT, HTTP_STATUS, ROUTES } from '@data';
import { UserGender, UserType } from '@types';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserDetail, updateUser } from '@apis';
import { useUserStore } from '@store';
import { getTokenInCookies, setTokenInCookies } from '@utils';

export default function Type() {
  const router = useRouter();
  const params = useSearchParams().get('token');

  const [type, setType] = useState<UserType>();
  const [gender, setGender] = useState<UserGender>();
  const [address, setAddress] = useState<string>('');
  const [token, setToken] = useState<string>();
  const [instructorKey, setInstructorKey] = useState<string>('');

  const [collapsed, setCollapsed] = useState({
    gender: false,
    address: true,
    type: true,
  });

  const { setAddUserToken, setAddUserProfile, getUserType } = useUserStore();

  // useLayoutEffect(() => {
  //   const checkToken = async () => {
  //     if (params) {
  //       const newToken = await setTokenInCookies(params);
  //       setAddUserToken(newToken);

  //       const result = await getUserDetail();
  //       setAddUserProfile({ token: newToken, profile: result.data });
  //       if (result.data.userType) {
  //         return router.push(ROUTES.MANAGE.root);
  //       }
  //       setToken(newToken);
  //     } else {
  //       const authorizationToken = await getTokenInCookies();
  //       const userType = getUserType(authorizationToken);

  //       if (userType) {
  //         return router.replace(ROUTES.MANAGE.root);
  //       }
  //       setToken(authorizationToken);
  //     }
  //   };
  //   checkToken();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const toggleCollapse = (field: 'gender' | 'address' | 'type') => {
    setCollapsed({ gender: true, address: true, type: true, [field]: false });
  };

  const handleSetType = async () => {
    if (!gender || !address.trim() || !type) {
      alert('성별, 주소, 타입을 모두 선택해주세요.');
      return;
    }

    if (type === USER_TYPE.INSTRUCTOR && !instructorKey.trim()) {
      alert('인증키를 입력해주세요.');
      return;
    }

    if (!token) {
      router.replace(ROUTES.ONBOARDING.signin);
    } else {
      const result = await updateUser({ gender, address, userType: type });

      if (result.status) {
        setAddUserProfile({
          token: token,
          profile: { userType: type },
        });
        return router.push(ROUTES.MANAGE.root);
      }
    }
  };
  return (
    <div className={styles.container}>
      <h1>회원 가입을 완료해주세요</h1>
      {/* 성별 선택 */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => toggleCollapse('gender')}>
          <span>{gender ? `성별: ${gender}` : '성별을 선택하세요'}</span>
        </div>
        {!collapsed.gender && (
          <div className={styles.content}>
            {Object.values(USER_GENDER).map((g) => (
              <button
                key={g}
                className={`${styles.button} ${gender === g ? styles.selected : ''}`}
                onClick={() => {
                  setGender(g);
                  setCollapsed((prev) => ({
                    ...prev,
                    gender: true,
                    address: false,
                  }));
                }}>
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 주소 입력 */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => toggleCollapse('address')}>
          <span>{address ? `주소: ${address}` : '주소를 입력하세요'}</span>
        </div>
        {!collapsed.address && (
          <div className={styles.content}>
            <input
              type="text"
              placeholder="예: 서울특별시 강남구"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
            />
            <button
              className={styles.next_button}
              onClick={() =>
                setCollapsed((prev) => ({ ...prev, address: true, type: false }))
              }>
              다음
            </button>
          </div>
        )}
      </div>

      {/* 타입 선택 */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => toggleCollapse('type')}>
          <span>
            {type
              ? `회원 타입: ${TEXT.TYPE_SELECT_PAGE.type[type]}`
              : '회원 타입을 선택하세요'}
          </span>
        </div>
        {!collapsed.type && (
          <div className={styles.content}>
            {Object.values(USER_TYPE).map((data) => (
              <button
                key={data}
                className={`${styles.button} ${type === data ? styles.selected : ''}`}
                onClick={() => {
                  setType(data);
                  setCollapsed((prev) => ({ ...prev, type: true }));
                }}>
                {TEXT.TYPE_SELECT_PAGE.type[data]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 인증키 입력 (수영 강사 선택 시) */}
      {type === USER_TYPE.INSTRUCTOR && (
        <div className={styles.section}>
          <div className={styles.header}>수영 강사 인증키 입력</div>
          <div className={styles.content}>
            <input
              type="text"
              placeholder="인증키를 입력하세요"
              value={instructorKey}
              onChange={(e) => setInstructorKey(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      )}

      {/* 완료 버튼 */}
      {gender && address.trim() && type && (
        <button className={styles.submit_button} onClick={handleSetType}>
          완료
        </button>
      )}
    </div>
  );
}
