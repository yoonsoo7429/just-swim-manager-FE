import { RegistrationButtonProps } from '@types';

import styles from './styles.module.scss';

export function RegistrationButton({ onClick }: RegistrationButtonProps) {
  return (
    <button onClick={onClick} className={styles.link}>
      수강 신청
    </button>
  );
}
