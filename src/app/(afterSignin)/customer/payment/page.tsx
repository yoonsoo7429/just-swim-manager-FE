'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { PaymentProps, PaymentState } from '@types';
import { getPaymentsInfo } from '@apis';
import { feeFormat } from '@utils';

export default function PaymentPage() {
  const [paymentsInfo, setPaymentsInfo] = useState<PaymentProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsInfo = await getPaymentsInfo();
        setPaymentsInfo(paymentsInfo);
      } catch (error) {
        console.error('Error fetching PaymentsInfo(Customer)', error);
      }
    };
    fetchData();
  }, []);

  const getPaymentState = (paymentFee: string, lectureFee: string) => {
    let paymentFeeNum = parseInt(paymentFee);
    let lectureFeeNum = parseInt(lectureFee);
    if (paymentFeeNum === 0) return PaymentState.PENDING;
    if (paymentFeeNum < lectureFeeNum) return PaymentState.ADDITIONAL_REQUIRED;
    return PaymentState.COMPLETE;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>결제 정보</h2>
      </div>
      <div className={styles.dashboard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>수업명</th>
              <th>수업료</th>
              <th>결제한 요금</th>
              <th>결제 상태</th>
              <th>결제 날짜</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paymentsInfo.map((payment) => {
              const paymentState = getPaymentState(
                payment.paymentFee,
                payment.lecture.lectureFee,
              );

              return (
                <tr key={payment.paymentId}>
                  <td>{payment.user.name}</td>
                  <td>{payment.lecture.lectureTitle}</td>
                  <td>{`${feeFormat(payment.lecture.lectureFee)} 원`}</td>
                  <td>{`${feeFormat(payment.paymentFee)} 원`}</td>
                  <td>{paymentState}</td>
                  <td>{payment.paymentDate ? payment.paymentDate : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
