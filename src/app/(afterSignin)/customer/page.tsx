'use client';

import styles from './page.module.scss';

import { getDashboardInfo } from '@/_apis/auth';
import { useEffect, useState } from 'react';
import { DashboardProps } from '@types';
import { getPaymentDetail } from '@apis';
import { approveRegistration } from '@/_apis/registration';

export default function CustomerPage() {
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

  return (
    <div className={styles.container}>
      <h2>이번 달 일정</h2>
    </div>
  );
}
