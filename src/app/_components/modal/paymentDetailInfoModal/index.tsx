'use client';

import styles from './styles.module.scss';

import { PaymentDetailInfoModalProps } from '@types';
import { ModalBody } from '../modalBody';

export function PaymentDetailInfoModal({
  detailInfo,
  hideModal,
}: PaymentDetailInfoModalProps) {
  return (
    <ModalBody hideModal={hideModal}>
      <div className={styles.modal_content}>
        {detailInfo && detailInfo && (
          <>
            <div className={styles.section}>
              <h3>수강생 결제 정보</h3>
              <p>이름: {detailInfo.user.name}</p>
              <p>주소: {detailInfo.user.address}</p>
              <p>생년 월일: {detailInfo.user.birth}</p>
              <p>성별: {detailInfo.user.gender}</p>
              <p>전화 번호: {detailInfo.user.phoneNumber}</p>
              <p>
                회원 등록 일자:{' '}
                {new Date(detailInfo.user.createdAt).toLocaleDateString()}
              </p>
              <p>수업명: {detailInfo.lecture.lectureTitle}</p>
              <p>결제 요금: {detailInfo.paymentFee}</p>
              <p>결제 날짜: {detailInfo.paymentDate}</p>
            </div>
          </>
        )}
      </div>
    </ModalBody>
  );
}
