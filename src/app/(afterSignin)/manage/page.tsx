// app/manage/page.tsx

import styles from './page.module.scss';

export default function ManagePage() {
  return (
    <div className={styles.pageContainer}>
      <h2>관리 대시보드</h2>
      <p>
        여기는 관리 대시보드입니다. 고객 관리, 강습 관리, 결제 정보 등의 링크로
        이동할 수 있습니다.
      </p>

      <div className={styles.dashboard}>
        <div className={styles.dashboardItem}>
          <h3>고객 관리</h3>
          <p>고객 정보를 관리하고, 회원을 관리할 수 있습니다.</p>
          <button className={styles.linkButton}>
            <a href="/manage/customer">고객 관리 페이지로 이동</a>
          </button>
        </div>

        <div className={styles.dashboardItem}>
          <h3>강습 관리</h3>
          <p>강습 관련 정보를 관리할 수 있습니다.</p>
          <button className={styles.linkButton}>
            <a href="/manage/lesson">강습 관리 페이지로 이동</a>
          </button>
        </div>

        <div className={styles.dashboardItem}>
          <h3>결제 정보</h3>
          <p>결제 관련 정보를 관리하고, 결제 내역을 확인할 수 있습니다.</p>
          <button className={styles.linkButton}>
            <a href="/manage/payment">결제 관리 페이지로 이동</a>
          </button>
        </div>
      </div>
    </div>
  );
}
