'use client';

import styles from './page.module.scss';

import { useEffect, useState } from 'react';
import { LectureProps, RegistrationProps } from '@types';
import { getMembersInfo } from '@apis';
import { feeFormat } from '@utils';
import { getRegistrationsInfo } from '@/_apis/registration/getRegistrationsInfo';

export default function LecturePage() {
  const [lectureList, setLectureList] = useState<LectureProps[]>([]);
  const [registrationList, setRegistrationList] = useState<RegistrationProps[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [members, registrations] = await Promise.all([
          getMembersInfo(),
          getRegistrationsInfo(),
        ]);
        const uniqueLectures = Array.from(
          new Map(members.map((m) => [m.lecture.lectureId, m.lecture])).values(),
        );
        setLectureList(uniqueLectures);
        setRegistrationList(registrations);
      } catch (error) {
        console.error('수강 목록을 불러오지 못했습니다', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>수강 목록</h2>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>수강 신청 목록</h2>
        </div>
        <div className={styles.dashboard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>수업명</th>
                <th>급수</th>
                <th>요일</th>
                <th>시간</th>
                <th>금액</th>
                <th>신청 현황</th>
              </tr>
            </thead>
            <tbody>
              {registrationList.map((registration) => {
                const { approve, deletedAt, lecture } = registration;

                // 신청 현황 상태 설정
                let status = '대기중';
                if (approve) {
                  status = '승인 완료';
                } else if (deletedAt) {
                  status = '신청 취소';
                }

                return (
                  <tr key={lecture.lectureId}>
                    <td>{lecture.lectureTitle}</td>
                    <td>{lecture.lectureLevel}</td>
                    <td>{lecture.lectureDays}</td>
                    <td>{lecture.lectureTime}</td>
                    <td>{`${feeFormat(lecture.lectureFee)} 원`}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
