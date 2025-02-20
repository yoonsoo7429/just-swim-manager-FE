'use client';

import { getLectureDetail } from '@/_apis';

import { getLecturesInfo } from '@apis';
import { LectureForDashboardProps } from '@types';
import { useEffect, useState } from 'react';
import { LectureDetailInfoModal, AddButton, EditButton } from '@components';

import styles from './page.module.scss';
import { feeFormat } from '@utils';

export default function LecturePage() {
  const [lecturesInfo, setLecturesInfo] = useState<LectureForDashboardProps[]>(
    [],
  );
  const [selectedLecture, setSelectedLecture] =
    useState<LectureForDashboardProps | null>(null);
  const [isLectureDetailModalOpen, setIsLectureDetailModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lecturesInfo = await getLecturesInfo();
        setLecturesInfo(lecturesInfo);
      } catch (error) {
        console.error('Error fetching LectureInfo', error);
      }
    };
    fetchData();
  }, []);

  const handleLectureClick = async (id: string) => {
    try {
      const lectureDetail = await getLectureDetail(id);
      setSelectedLecture(lectureDetail);
      setIsLectureDetailModalOpen(true);
    } catch (error) {
      console.error('Error fetching lecture detail', error);
    }
  };

  const handleCloseModal = () => {
    setIsLectureDetailModalOpen(false);
    setSelectedLecture(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>강습 관리</h2>
        <div className={styles.button_group}>
          <AddButton type="lecture" />
        </div>
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
            {lecturesInfo.map((lecture) => (
              <tr
                key={lecture.lectureId}
                onClick={() => handleLectureClick(lecture.lectureId)}>
                <td>{lecture.lectureTitle}</td>
                <td>{lecture.lectureLevel}</td>
                <td>{lecture.lectureDays}</td>
                <td>{lecture.lectureTime}</td>
                <td>
                  {lecture?.member?.length} / {lecture.lectureCapacity}
                </td>
                <td>{`${feeFormat(lecture.lectureFee)} 원`}</td>

                <td>
                  <EditButton type="lecture" id={lecture.lectureId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLectureDetailModalOpen && selectedLecture && (
        <LectureDetailInfoModal
          detailInfo={selectedLecture}
          hideModal={handleCloseModal}
        />
      )}
    </div>
  );
}
