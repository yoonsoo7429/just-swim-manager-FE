import { ConfirmModalProps } from '@types';

import styles from './styles.module.scss';
import { ConfirmButton } from '@/_components/button';

export function ConfirmModal({
  children,
  message,
  hideModal,
  confirmCallback,
}: ConfirmModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal_content}>
        {children}
        <p>{message}</p>
        <div className={styles.modal_btn}>
          <ConfirmButton text="취소" kind="confirm-sub" onClick={hideModal} />
          <ConfirmButton text="확인" kind="confirm" onClick={confirmCallback} />
        </div>
      </div>
    </div>
  );
}
