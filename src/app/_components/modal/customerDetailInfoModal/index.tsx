'use client';

import { CustomerDetailInfoModalProps, ProgressColorMap } from '@types';
import { ModalBody } from '../modalBody';

import styles from './styles.module.scss';
import { feeFormat } from '@utils';

export function CustomerDetailInfoModal({
  detailInfo,
  hideModal,
}: CustomerDetailInfoModalProps) {
  return (
    <ModalBody hideModal={hideModal}>
      <div className={styles.modal_content}>
        {detailInfo && detailInfo.memberId && (
          <>
            <div className={styles.section}>
              <h4>고객 정보</h4>
              <p>이름: {detailInfo.user.name}</p>
              <p>주소: {detailInfo.user.address}</p>
              <p>생년 월일: {detailInfo.user.birth}</p>
              <p>성별: {detailInfo.user.gender}</p>
              <p>전화 번호: {detailInfo.user.phoneNumber}</p>
              <p>
                회원 등록 일자:{' '}
                {new Date(detailInfo.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div
              className={`${styles.section} ${detailInfo.lecture ? styles.empty : ''}`}>
              <h4>수강 등록한 강습</h4>
              {detailInfo.lecture ? (
                <>
                  <p>강습 명: {detailInfo.lecture.lectureTitle}</p>
                  <p>강습 요일: {detailInfo.lecture.lectureDays}</p>
                  <p>강습 시간: {detailInfo.lecture.lectureTime}</p>
                  <p>
                    강습료: {`${feeFormat(detailInfo.lecture.lectureFee)} 원`}
                  </p>
                  <p>강습 Level: {detailInfo.lecture.lectureLevel}</p>
                  <p>
                    개인 진도:{' '}
                    <span
                      style={{
                        backgroundColor:
                          ProgressColorMap[
                            detailInfo.memberProgress as keyof typeof ProgressColorMap
                          ] || '#000',
                      }}>
                      {detailInfo.memberProgress}
                    </span>
                  </p>
                </>
              ) : (
                <p>아직 등록한 강습이 없습니다.</p>
              )}
            </div>
          </>
        )}
      </div>
    </ModalBody>
  );
}
