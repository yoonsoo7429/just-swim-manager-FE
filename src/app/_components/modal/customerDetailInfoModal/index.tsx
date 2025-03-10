'use client';

import { CustomerDetailInfoModalProps } from '@types';
import { ModalBody } from '../modalBody';
import { ConfirmModal } from '../confirmModal';
import { useCallback, useState } from 'react';
import { deleteCustomer } from '@apis';

import styles from './styles.module.scss';
import { feeFormat } from '@utils';

export function CustomerDetailInfoModal({
  detailInfo,
  hideModal,
}: CustomerDetailInfoModalProps) {
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
    const response = await deleteCustomer(id);

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
              <h3>고객 정보</h3>
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
            </div>

            <div
              className={`${styles.section} ${detailInfo.lecture.length === 0 ? styles.empty : ''}`}>
              <h4>수강 등록한 강습</h4>
              {detailInfo.lecture.length > 0 ? (
                <ul>
                  {detailInfo.lecture.map((lecture) => (
                    <li key={lecture.lectureId}>
                      <p>강습 명: {lecture.lectureTitle}</p>
                      <p>강습 요일: {lecture.lectureDays}</p>
                      <p>강습 시간: {lecture.lectureTime}</p>
                      <p>강습료: {`${feeFormat(lecture.lectureFee)} 원`}</p>
                      <p>강습 Level: {lecture.lectureLevel}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>아직 등록한 강습이 없습니다.</p>
              )}
            </div>

            <div
              className={`${styles.section} ${detailInfo.payment.length === 0 ? styles.empty : ''}`}>
              <h4>결제 정보</h4>
              {detailInfo.payment.length > 0 ? (
                <ul>
                  {detailInfo.payment.map((payment) => (
                    <li key={payment.paymentId}>
                      <p>수업명: {payment.lectureTitle}</p>
                      <p>결제 요금: {`${feeFormat(payment.paymentFee)} 원`}</p>
                      <p>결제 적용일: {payment.paymentDate}</p>
                      <p>
                        결제일:{' '}
                        {new Date(payment.paymentCreatedAt).toLocaleDateString(
                          'ko-KR',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          },
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>아직 결제한 정보가 없습니다.</p>
              )}
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
          message={'고객 정보를 삭제하시겠습니까?'}
          hideModal={closeDeleteModal}
          confirmCallback={() => deleteInfo(deleteId)}
        />
      )}
    </ModalBody>
  );
}
