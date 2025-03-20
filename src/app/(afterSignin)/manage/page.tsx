'use client';

import styles from './page.module.scss';

import { getDashboardInfo } from '@/_apis/auth';
import { useEffect, useState } from 'react';
import { DashboardProps } from '@types';
import { getPaymentDetail } from '@apis';
import { approveRegistration } from '@/_apis/registration';

export default function ManagePage() {
  const [dashboardInfo, setDashboardInfo] = useState<DashboardProps>();
  console.log(dashboardInfo);

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
      const createdDate = new Date(customer.createdAt)
        .toISOString()
        .split('T')[0];
      return createdDate === todayString;
    }).length ?? 0;

  const handleApprove = async (registrationId: string) => {
    try {
      const registration = dashboardInfo?.registrations.find(
        (reg) => reg.registrationId === registrationId,
      );

      if (!registration || !registration.payment.length) {
        console.error('결제 정보가 없습니다.');
        return;
      }

      const latestPayment = registration.payment.sort(
        (a, b) =>
          new Date(b.paymentDate ?? '').getTime() -
          new Date(a.paymentDate ?? '').getTime(),
      )[0];

      if (!latestPayment) {
        console.error('최근 결제를 찾을 수 없습니다.');
        return;
      }

      const lectureFee = parseFloat(registration.lecture.lectureFee);
      const paymentFee = parseFloat(latestPayment.paymentFee);

      if (paymentFee < lectureFee) {
        // 결제 금액이 부족하면 결제 페이지로 이동
        window.location.href = `/manage/payment`;
      } else {
        // 결제 금액이 충분하면 승인 처리
        await approveRegistration(parseInt(registrationId));
        // 페이지 새로 고침
        window.location.reload();
      }
    } catch (error) {
      console.error('승인 처리 중 오류 발생', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>관리 대시보드</h2>

      <div className={styles.dashboard}>
        {/* 고객 현황 */}
        <div className={styles.dashboardItem}>
          <h3>고객 현황</h3>
          <div className={styles.dashboardStats}>
            <div className={styles.statCard}>
              <h4>전체 수강생 :</h4>
              <p>{totalCustomers}명</p>
            </div>
            <div className={styles.statCard}>
              <h4>오늘 추가 된 수강생 :</h4>
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
                <h4>{lecture.lectureTitle} : </h4>
                <p>{lecture.member?.length ?? 0}명</p>
              </div>
            ))}
          </div>
        </div>

        {/* 결제 정보 */}
        <div className={styles.dashboardItem}>
          <h3>결제 정보</h3>
          <div className={styles.statCard}>
            <h4>총 결제 금액 : </h4>
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

      {/* 수강 신청 현황 */}
      <div className={styles.dashboardRegistration}>
        <h2>수강 신청 관리</h2>
        <div className={styles.dashboardRegistrationItem}>
          <div className={styles.registrationList}>
            {dashboardInfo?.registrations.map((registration) => (
              <div
                key={registration.registrationId}
                className={styles.registrationItem}>
                <h4> {registration.user.name}</h4>
                <p> {registration.lecture.lectureTitle}</p>
                <p> {registration.user.gender}</p>
                <p> {registration.user.phoneNumber}</p>
                <p>
                  신청일: {new Date(registration.createdAt).toLocaleDateString()}
                </p>
                <button
                  className={styles.approveButton}
                  onClick={() => handleApprove(registration.registrationId)}>
                  승인하기
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
