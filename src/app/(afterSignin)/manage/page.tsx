'use client';

import styles from './page.module.scss';

export default function ManagePage() {
  // 예시 데이터 (실제 데이터는 API 등으로 받아옵니다)
  const totalCustomers = 120; // 전체 고객 수
  const recentCustomers = 5; // 최근 추가된 고객 수
  const totalRegisteredStudents = 80; // 수업에 등록된 고객 수
  const totalReRegisteredStudents = 15; // 재등록한 학생 수
  const totalPayments = 250000; // 총 결제 금액

  return (
    <div className={styles.container}>
      <h2>관리 대시보드</h2>
      <p>
        여기는 관리 대시보드입니다. 고객 관리, 강습 관리, 결제 정보 등의 링크로
        이동할 수 있습니다.
      </p>

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
              <h4>최근 추가된 고객</h4>
              <p>{recentCustomers}명</p>
            </div>
          </div>
        </div>

        {/* 수업 현황 */}
        <div className={styles.dashboardItem}>
          <h3>수업 현황</h3>
          <div className={styles.dashboardStats}>
            <div className={styles.statCard}>
              <h4>수업에 등록된 고객</h4>
              <p>{totalRegisteredStudents}명</p>
            </div>
            <div className={styles.statCard}>
              <h4>재등록 고객</h4>
              <p>{totalReRegisteredStudents}명</p>
            </div>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className={styles.dashboardItem}>
          <h3>결제 정보</h3>
          <div className={styles.statCard}>
            <h4>총 결제 금액</h4>
            <p>{totalPayments}원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
