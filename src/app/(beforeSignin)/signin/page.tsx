'use client';

import { postSignin } from '@apis';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styled from './page.module.scss';
import { setTokenInCookies } from '@utils';

export default function SigninPage() {
  const router = useRouter();

  const [email, setId] = useState('');
  const [password, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('ID와 Key를 모두 입력해주세요.');
      return;
    }

    const data = { email, password };
    try {
      const response = await postSignin(data);

      if (response.status) {
        const a = await setTokenInCookies(response.data as string);
        router.push('/manage');
      }
    } catch (error) {
      setError('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup');
  };

  return (
    <div className={styled.container}>
      <form onSubmit={handleSignin} className={styled.form}>
        <div className={styled.header}>Just-Swim-Manager</div>
        <input
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setId(e.target.value)}
          className={styled.input}
        />
        <input
          type="password"
          placeholder="비밀 번호를 입력하세요"
          value={password}
          onChange={(e) => setKey(e.target.value)}
          className={styled.input}
        />
        {error && <p className={styled.error}>{error}</p>}{' '}
        <button type="submit" className={styled.button}>
          Sign In
        </button>
        <p className={styled.signupPrompt}>
          계정이 없으신가요?{' '}
          <span className={styled.signupLink} onClick={handleSignupRedirect}>
            회원 가입
          </span>
        </p>
      </form>
    </div>
  );
}
