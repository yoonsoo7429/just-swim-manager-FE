import { PaymentButtonProps } from '@types';

import styles from './styles.module.scss';
import Link from 'next/link';

export function PaymentButton({ type, id, disabled }: PaymentButtonProps) {
  if (disabled) {
    return null;
  }

  let linkHref: string | undefined;

  if (type === 'payment') {
    linkHref = `/manage/payment/edit/${id}`;
  }

  if (!linkHref) {
    return null;
  }

  return (
    <Link href={linkHref} className={styles.link}>
      결제
    </Link>
  );
}
