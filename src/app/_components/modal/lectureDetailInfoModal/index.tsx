'use client';

import { LectureDetailInfoModalProps } from '@types';
import { ModalBody } from '../modalBody';
import styles from './styles.module.scss';
import { EditButton } from '@/_components/button';

export function LectureDetailInfoModal({
  detailInfo,
  hideModal,
}: LectureDetailInfoModalProps) {
  return (
    <ModalBody hideModal={hideModal}>
      <div className={styles.modal_content}>
        <div className={styles.section}>
          <h4>수강생 목록</h4>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>이름</th>
                <th>성별</th>
                <th>생년 월일</th>
                <th>전화번호</th>
                <th>등록 일자</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {detailInfo?.member?.map((member) => (
                <tr key={member.lectureId}>
                  <td>{member.customer?.name}</td>
                  <td>{member.customer?.gender}</td>
                  <td>{member.customer?.birthDate}</td>
                  <td>{member.customer?.phoneNumber}</td>
                  <td>
                    {new Date(
                      member.customer.customerCreatedAt,
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <EditButton id={member.memberId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModalBody>
  );
}
