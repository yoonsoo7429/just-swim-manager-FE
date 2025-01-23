'use client';

import { postAdminSignin } from '@apis';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styled from './page.module.scss';

export default function SigninPage() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !key) {
      setError('ID와 Key를 모두 입력해주세요.');
      return;
    }

    const data = { id, key };
    try {
      const reponse = await postAdminSignin(data);

      if (reponse.status === 200) {
      }
      alert('sign success!');
    } catch (error) {
      setError('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className={styled.container}>
      <form
        onSubmit={handleSignin}
        className={styled.form} // SCSS 클래스 적용
      >
        <h1 className={styled.header}>관리자 로그인</h1>
        <input
          type="text"
          placeholder="ID를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={styled.input} // SCSS 클래스 적용
        />
        <input
          type="password"
          placeholder="Key를 입력하세요"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className={styled.input} // SCSS 클래스 적용
        />
        {error && <p className={styled.error}>{error}</p>}{' '}
        {/* SCSS 클래스 적용 */}
        <button
          type="submit"
          className={styled.button} // SCSS 클래스 적용
        >
          로그인
        </button>
      </form>
    </div>
  );
}
