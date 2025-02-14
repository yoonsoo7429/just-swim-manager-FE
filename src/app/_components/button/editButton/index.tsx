import { EditButtonProps } from '@types';

import styles from './styles.module.scss';
import Link from 'next/link';

export function EditButton({ type, id }: EditButtonProps) {
  const linkHref =
    type === 'customer'
      ? `/manage/customer/edit/${id}`
      : `/manage/lecture/edit/${id}`;

  return (
    <Link href={linkHref} className={styles.link}>
      수정
    </Link>
  );
}
