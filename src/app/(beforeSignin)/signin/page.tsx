'use client';

import { postAdminSignin } from '@apis';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

import styled from './page.module.scss';
import { setTokenInCookies } from '@utils';

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
      const response = await postAdminSignin(data);

      if (response.status) {
        const a = await setTokenInCookies(response.data as string);
        router.push('/manage');
      }
    } catch (error) {
      setError('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className={styled.container}>
      <form onSubmit={handleSignin} className={styled.form}>
        <div className={styled.header}>Just-Swim-Manager</div>
        <input
          type="text"
          placeholder="ID를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={styled.input}
        />
        <input
          type="password"
          placeholder="Key를 입력하세요"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className={styled.input}
        />
        {error && <p className={styled.error}>{error}</p>}{' '}
        <button type="submit" className={styled.button}>
          Signin
        </button>
      </form>
    </div>
  );
}
