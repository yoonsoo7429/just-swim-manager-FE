'use client';

import { getLectureDetail } from '@/_apis';
import styles from './page.module.scss';

import { getLecturesInfo } from '@apis';
import { LectureForDashboardProps } from '@types';
import { useEffect, useState } from 'react';
import { LectureDetailInfoModal, AddButton, EditButton } from '@components';

export default function LecturePage() {
  const [lecturesInfo, setLecturesInfo] = useState<LectureForDashboardProps[]>(
    [],
  );
  const [selectedLecture, setSelectedLecture] =
    useState<LectureForDashboardProps | null>(null);
  const [isLectureDeltailModalOpen, setIsLectureDeltailModalOpen] =
    useState(false);
  console.log(lecturesInfo);

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
      setIsLectureDeltailModalOpen(true);
    } catch (error) {
      console.error('Error fetching lecture detail', error);
    }
  };

  const handleCloseModal = () => {
    setIsLectureDeltailModalOpen(false);
    setSelectedLecture(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>수업 관리</h2>
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
                <td>{lecture.lectureFee}</td>

                <td>
                  <EditButton id={lecture.lectureId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLectureDeltailModalOpen && selectedLecture && (
        <LectureDetailInfoModal
          detailInfo={selectedLecture}
          hideModal={handleCloseModal}
        />
      )}
    </div>
  );
}
