'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconAdd from '@assets/icon_add.svg';
import styles from './styles.module.scss';

export function AddButton({ type }: { type: string }) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLink = () => {
    return `/${type}/add`;
  };

  return (
    <>
      {mounted && (
        <Link href={getLink()} className={styles.link}>
          <IconAdd />
        </Link>
      )}
    </>
  );
}
