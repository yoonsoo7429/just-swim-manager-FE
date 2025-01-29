'use client';

import { detailInfoModalProps } from '@types';
import { ModalBody } from '../modalBody';
import styles from './styles.module.scss';

export function DetailInfoModal({
  detailInfo,
  hideModal,
}: detailInfoModalProps) {
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
                      <p>강습료: {lecture.lectureFee}</p>
                      <p>강습 Level: {lecture.lectureLevel}</p>
                      <p>
                        강습 인원: {lecture.member.length} /{' '}
                        {lecture.lectureCapacity}
                      </p>
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
                      <p>결제료: ${payment.paymentFee}</p>
                      <p>결제 적용일: {payment.paymentDate}</p>
                      <p>결제일: {payment.paymentCreatedAt}</p>
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
    </ModalBody>
  );
}
