'use client';

import styles from './page.module.scss';

import { useEffect, useState } from 'react';
import { PaymentForDashboardProps, PaymentState } from '@types';
import { getPaymentDetail, getPaymentsInfo } from '@apis';
import { AddButton, EditButton } from '@components';
import { PaymentDetailInfoModal } from '@/_components/modal/paymentDetailInfoModal';
import { feeFormat } from '@utils';

export default function PaymentPage() {
  const [paymentsInfo, setPaymentsInfo] = useState<PaymentForDashboardProps[]>(
    [],
  );
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentForDashboardProps | null>(null);
  const [isPaymentDetailModalOpen, setIsPaymentDetailModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsInfo = await getPaymentsInfo();
        setPaymentsInfo(paymentsInfo);
      } catch (error) {
        console.error('Error fetching PaymentInfo', error);
      }
    };
    fetchData();
  }, []);

  const handlePaymentClick = async (id: string) => {
    try {
      const paymentDetail = await getPaymentDetail(id);
      setSelectedPayment(paymentDetail);
      setIsPaymentDetailModalOpen(true);
    } catch (error) {
      console.error('Error fetching payment detail', error);
    }
  };

  const handleCloseModal = () => {
    setIsPaymentDetailModalOpen(false);
    setSelectedPayment(null);
  };

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
        <div className={styles.button_group}>
          <AddButton type="payment" />
        </div>
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
            {paymentsInfo.map((payment) => (
              <tr
                key={payment.paymentId}
                onClick={() => handlePaymentClick(payment.paymentId)}>
                <td>{payment.customer.name}</td>
                <td>{payment.lecture.lectureTitle}</td>
                <td>{`${feeFormat(payment.lecture.lectureFee)} 원`}</td>
                <td>{`${feeFormat(payment.paymentFee)} 원`}</td>
                <td>
                  {getPaymentState(
                    payment.paymentFee,
                    payment.lecture.lectureFee,
                  )}
                </td>
                <td>{payment.paymentDate}</td>

                <td>
                  <EditButton type="payment" id={payment.paymentId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPaymentDetailModalOpen && selectedPayment && (
        <PaymentDetailInfoModal
          detailInfo={selectedPayment}
          hideModal={handleCloseModal}
        />
      )}
    </div>
  );
}
