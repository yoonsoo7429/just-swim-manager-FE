'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import IconArrowLeft from '@assets/icon_arrow_left.svg';
import { HistoryBackHeaderProps } from '@types';

import styles from './styles.module.scss';

/**
 * @param {string} title Header의 제목
 */
export function HistoryBackHeader({ title }: HistoryBackHeaderProps) {
  const router = useRouter();

  const handleBack = (event: React.MouseEvent) => {
    event.preventDefault();
    router.back();
  };

  return (
    <header className={styles.header}>
      <div className={styles.title_wrapper}>
        <Link href="/" onClick={handleBack}>
          <IconArrowLeft width={24} height={24} fill="black" />
        </Link>
        <h1>{title}</h1>
      </div>
    </header>
  );
}
