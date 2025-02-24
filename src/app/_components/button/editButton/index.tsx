import { EditButtonProps } from '@types';

import styles from './styles.module.scss';
import Link from 'next/link';

export function EditButton({ type, id }: EditButtonProps) {
  let linkHref: string | undefined;

  if (type === 'customer') {
    linkHref = `/manage/customer/edit/${id}`;
  } else if (type === 'lecture') {
    linkHref = `/manage/lecture/edit/${id}`;
  } else if (type === 'payment') {
    linkHref = `/manage/payment/edit/${id}`;
  }

  if (!linkHref) {
    return null;
  }

  return (
    <Link href={linkHref} className={styles.link}>
      수정
    </Link>
  );
}
