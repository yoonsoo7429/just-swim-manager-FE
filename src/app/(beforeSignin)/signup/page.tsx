'use client';

import { postSignup } from '@apis';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './page.module.scss';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const data = { email, password };
    try {
      const response = await postSignup(data);

      if (response.error === 'Conflict') {
        setError('사용 중인 이메일입니다.');
      }

      if (response.status) {
        router.push('/signin');
      }
    } catch (error) {
      setError('서버와의 통신 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignup} className={styles.form}>
        <div className={styles.header}>Just-Swim-Manager</div>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? '가입 중...' : 'Sign Up'}
        </button>
        <p className={styles.signupPrompt}>
          이미 계정이 있으신가요?{' '}
          <span
            className={styles.signupLink}
            onClick={() => router.push('/signin')}>
            로그인
          </span>
        </p>
      </form>
    </div>
  );
}
