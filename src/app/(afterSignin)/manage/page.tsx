'use client';

import styles from './page.module.scss';

import { getDashboardInfo } from '@/_apis/auth';
import { useEffect, useState } from 'react';
import { DashboardProps } from '@types';

export default function ManagePage() {
  const [dashboardInfo, setDashboardInfo] = useState<DashboardProps>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardInfo = await getDashboardInfo();
        setDashboardInfo(dashboardInfo);
      } catch (error) {
        console.error('Error fetching DashboardInfo', error);
      }
    };
    fetchData();
  }, []);

  // 총 고객 수
  const totalCustomers = dashboardInfo?.customers.length;

  // 오늘 날짜 계산
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // 오늘 추가된 고객 계산
  const recentCustomers =
    dashboardInfo?.customers.filter((customer) => {
      const createdDate = new Date(customer.customerCreatedAt)
        .toISOString()
        .split('T')[0];
      return createdDate === todayString;
    }).length ?? 0;

  //

  return (
    <div className={styles.container}>
      <h2>관리 대시보드</h2>

      <div className={styles.dashboard}>
        {/* 고객 현황 */}
        <div className={styles.dashboardItem}>
          <h3>고객 현황</h3>
          <div className={styles.dashboardStats}>
            <div className={styles.statCard}>
              <h4>전체 고객 수</h4>
              <p>{totalCustomers}명</p>
            </div>
            <div className={styles.statCard}>
              <h4>오늘 추가된 고객</h4>
              <p>{recentCustomers}명</p>
            </div>
          </div>
        </div>

        {/* 수업 현황 */}
        <div className={styles.dashboardItem}>
          <h3>수업 현황</h3>
          <div className={styles.dashboardStats}>
            {dashboardInfo?.lectures.map((lecture) => (
              <div key={lecture.lectureId} className={styles.statCard}>
                <h4>{lecture.lectureTitle}</h4>
                <p>{lecture.member?.length ?? 0}명</p>
              </div>
            ))}
          </div>
        </div>

        {/* 결제 정보 */}
        <div className={styles.dashboardItem}>
          <h3>결제 정보</h3>
          <div className={styles.statCard}>
            <h4>총 결제 금액</h4>
            <p>
              {dashboardInfo?.payments.reduce(
                (sum, payment) => sum + parseFloat(payment.paymentFee),
                0,
              ) ?? 0}
              원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
