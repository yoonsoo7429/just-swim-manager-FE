'use client';

import styles from './styles.module.scss';

import { PaymentDetailInfoModalProps } from '@types';
import { useCallback, useState } from 'react';
import { deletePayment } from '@apis';
import { ModalBody } from '../modalBody';
import { ConfirmModal } from '../confirmModal';

export function PaymentDetailInfoModal({
  detailInfo,
  hideModal,
}: PaymentDetailInfoModalProps) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');

  const openDeleteModal = useCallback((id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setDeleteId('');
  }, []);

  const deleteInfo = async (id: string) => {
    const response = await deletePayment(id);

    if (response.status) {
      window.location.reload();
    }
  };

  return (
    <ModalBody hideModal={hideModal}>
      <div className={styles.modal_content}>
        {detailInfo && detailInfo.customer.customerId && (
          <>
            <div className={styles.section}>
              <h3>수강생 결제 정보</h3>
              <p>이름: {detailInfo.customer.name}</p>
              <p>주소: {detailInfo.customer.address}</p>
              <p>생년 월일: {detailInfo.customer.birthDate}</p>
              <p>성별: {detailInfo.customer.gender}</p>
              <p>전화 번호: {detailInfo.customer.phoneNumber}</p>
              <p>
                회원 등록 일자:{' '}
                {new Date(
                  detailInfo.customer.customerCreatedAt,
                ).toLocaleDateString()}
              </p>
              <p>수업명: {detailInfo.lecture.lectureTitle}</p>
              <p>결제 요금: {detailInfo.paymentFee}</p>
              <p>결제 날짜: {detailInfo.paymentDate}</p>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => openDeleteModal(detailInfo.customer.customerId)}
        className={styles.delete_button}>
        고객 삭제
      </button>

      {isDeleteModalOpen && (
        <ConfirmModal
          message={'결제 정보를 삭제하시겠습니까?'}
          hideModal={closeDeleteModal}
          confirmCallback={() => deleteInfo(deleteId)}
        />
      )}
    </ModalBody>
  );
}
