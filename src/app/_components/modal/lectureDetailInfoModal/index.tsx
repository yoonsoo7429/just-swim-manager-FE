'use client';

import styles from './styles.module.scss';

import { LectureDetailInfoModalProps, ProgressColorMap } from '@types';
import { ModalBody } from '../modalBody';
import { ConfirmModal } from '../confirmModal';
import { deleteLecture } from '@apis';
import { useCallback, useState } from 'react';
import moment from 'moment';
import { ExportExcelModal } from '../exportExcelModal';

export function LectureDetailInfoModal({
  detailInfo,
  hideModal,
}: LectureDetailInfoModalProps) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
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
                <th>진도</th>
                <th>전화번호</th>
                <th>등록 일자</th>
              </tr>
            </thead>
            <tbody>
              {detailInfo?.member?.map((member) => {
                const isNew = moment(member?.createdAt).isSame(
                  moment(),
                  'month',
                );
                return (
                  <tr key={member.memberId}>
                    <td>
                      <span
                        style={{
                          backgroundColor: isNew ? '#f1c40f' : '',
                        }}>
                        {member.user?.name}
                      </span>
                    </td>
                    <td>{member.user?.gender}</td>
                    <td>{member.user?.birth}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor:
                            ProgressColorMap[
                              member.memberProgress as keyof typeof ProgressColorMap
                            ] || '#000',
                        }}>
                        {member.memberProgress}
                      </span>
                    </td>
                    <td>{member.user?.phoneNumber}</td>
                    <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.button_group}>
        <button
          onClick={() => openDeleteModal(detailInfo.lectureId)}
          className={styles.delete_button}>
          강습 삭제
        </button>
        <button
          className={styles.export_excel_button}
          onClick={() => setIsExportModalOpen(true)}>
          엑셀 Export
        </button>
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          message={'강습 정보를 삭제하시겠습니까?'}
          hideModal={closeDeleteModal}
          confirmCallback={() => deleteInfo(deleteId)}
        />
      )}

      {isExportModalOpen && (
        <ExportExcelModal onClose={() => setIsExportModalOpen(false)} />
      )}
    </ModalBody>
  );
}
