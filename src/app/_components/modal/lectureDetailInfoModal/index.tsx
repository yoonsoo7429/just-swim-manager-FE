'use client';

import { LectureDetailInfoModalProps } from '@types';
import { ModalBody } from '../modalBody';
import styles from './styles.module.scss';
import { ConfirmModal } from '../confirmModal';
import { deleteLecture } from '@apis';
import { useCallback, useState } from 'react';

export function LectureDetailInfoModal({
  detailInfo,
  hideModal,
}: LectureDetailInfoModalProps) {
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
    const response = await deleteLecture(id);

    if (response.status) {
      window.location.reload();
    }
  };
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
              </tr>
            </thead>
            <tbody>
              {detailInfo?.member?.map((member) => (
                <tr key={member.memberId}>
                  <td>{member.customer?.name}</td>
                  <td>{member.customer?.gender}</td>
                  <td>{member.customer?.birthDate}</td>
                  <td>{member.customer?.phoneNumber}</td>
                  <td>
                    {new Date(
                      member.customer.customerCreatedAt,
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={() => openDeleteModal(detailInfo.lectureId)}
        className={styles.delete_button}>
        강습 삭제
      </button>

      {isDeleteModalOpen && (
        <ConfirmModal
          message={'강습 정보를 삭제하시겠습니까?'}
          hideModal={closeDeleteModal}
          confirmCallback={() => deleteInfo(deleteId)}
        />
      )}
    </ModalBody>
  );
}
