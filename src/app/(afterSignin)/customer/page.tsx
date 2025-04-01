'use client';

import styles from './page.module.scss';
import aprilCalendar from '@assets/april_calendar.jpg';

import { getDashboardInfo } from '@/_apis/auth';
import { useEffect, useState } from 'react';
import { DashboardProps, MemberProps } from '@types';
import { getPaymentDetail } from '@apis';
import { approveRegistration } from '@/_apis';
import Image from 'next/image';
import moment from 'moment';

export default function CustomerPage() {
  const [dashboardInfo, setDashboardInfo] = useState<DashboardProps>();
  console.log(dashboardInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardInfo = await getDashboardInfo();
        console.log(dashboardInfo);
        setDashboardInfo(dashboardInfo);
      } catch (error) {
        console.error('Error fetching DashboardInfo', error);
      }
    };
    fetchData();
  }, []);

  const currentMonth = moment().format('MM');

  return (
    <div className={styles.container}>
      <h2>{currentMonth}월 일정</h2>
      <div className={styles.dashboard}>
        {/* 달력 */}
        <Image
          src={aprilCalendar}
          alt={`${currentMonth}월 달력`}
          width={550}
          height={550}
        />

        {/* 이번달 수강 목록 */}
        <div className={styles.dashboardItem}>
          <h3>{currentMonth}월 나의 강습</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>수업명</th>
                <th>요일</th>
                <th>날짜</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              {dashboardInfo?.lectures &&
                (dashboardInfo?.lectures as MemberProps[]).map((lecture) => (
                  <tr key={lecture.lecture.lectureId}>
                    <td>{lecture.lecture.lectureTitle}</td>
                    <td>{lecture.lecture.lectureDays}</td>
                    <td>{lecture.lecture.lectureDate}</td>
                    <td>{lecture.lecture.lectureTime}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
