import { EditButtonProps } from '@types';

import styles from './styles.module.scss';
import Link from 'next/link';

export function EditButton({ id }: EditButtonProps) {
  return (
    <Link href={`/manage/customer/edit/${id}`} className={styles.link}>
      수정
    </Link>
  );
}
