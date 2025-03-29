'use client';

import { createRegistration, getLecturesInfo } from '@apis';
import { LectureProps } from '@types';
import { useEffect, useState } from 'react';
import { feeFormat } from '@utils';

import styles from './page.module.scss';
import { ConfirmModal, RegistrationButton } from '@components';

export default function RegistrationPage() {
  const [lectureList, setLectureList] = useState<LectureProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<LectureProps | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureList = await getLecturesInfo();
        setLectureList(lectureList);
      } catch (error) {
        console.error('Error fetching LectureList', error);
      }
    };
    fetchData();
  }, []);

  const handleRegistrationClick = (lecture: LectureProps) => {
    setSelectedLecture(lecture);
    setIsModalOpen(true);
  };

  const handleConfirmRegistration = async () => {
    if (selectedLecture) {
      try {
        const registration = await createRegistration(
          parseInt(selectedLecture.lectureId),
        );
        if (registration.statusCode === 403) {
          window.alert(registration.message);
        }
      } catch (error) {
        console.error(error);
      }
      setIsModalOpen(false);
      setSelectedLecture(null);
      window.location.reload();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLecture(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>수강 신청</h2>
      </div>
      <div className={styles.dashboard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>수업명</th>
              <th>급수</th>
              <th>요일</th>
              <th>시간</th>
              <th>인원</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lectureList.map((lecture) => (
              <tr key={lecture.lectureId}>
                <td>{lecture.lectureTitle}</td>
                <td>{lecture.lectureLevel}</td>
                <td>{lecture.lectureDays}</td>
                <td>{lecture.lectureTime}</td>
                <td>
                  {lecture?.member?.length} / {lecture.lectureCapacity}
                </td>
                <td>{`${feeFormat(lecture.lectureFee)} 원`}</td>
                <td>
                  <RegistrationButton
                    onClick={() => handleRegistrationClick(lecture)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 수강 신청 확인 모달 */}
      {isModalOpen && selectedLecture && (
        <ConfirmModal
          message={`${selectedLecture.lectureTitle} 수업을 수강 신청하시겠습니까?`}
          hideModal={handleCloseModal}
          confirmCallback={handleConfirmRegistration}>
          <h3>수강 신청 확인</h3>
        </ConfirmModal>
      )}
    </div>
  );
}
