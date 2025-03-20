'use client';

import styles from './page.module.scss';

import { useEffect, useState } from 'react';
import { PaymentProps, PaymentState } from '@types';
import { getPaymentDetail, getPaymentsInfo } from '@apis';
import { AddButton, PaymentButton } from '@components';
import { PaymentDetailInfoModal } from '@/_components/modal/paymentDetailInfoModal';
import { feeFormat } from '@utils';
import SearchInput from '@/_components/form/input/searchInput';

export default function PaymentPage() {
  const [paymentsInfo, setPaymentsInfo] = useState<PaymentProps[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentProps | null>(
    null,
  );
  const [isPaymentDetailModalOpen, setIsPaymentDetailModalOpen] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');

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
      const paymentDetail = await getPaymentDetail(parseInt(id));
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

  const handleSearchChange = (event: { target: HTMLInputElement }) => {
    setSearchValue(event.target.value);
  };

  const filteredPayments = paymentsInfo.filter((payment) => {
    const paymentDate = payment.paymentDate || '';
    const searchTerm = searchValue || '';

    const sanitizedSearchTerm = searchTerm.replace(
      /[-/\\^$*+?.()|[\]{}]/g,
      '\\$&',
    );

    return (
      payment.user.name.includes(sanitizedSearchTerm) ||
      payment.lecture.lectureTitle.includes(sanitizedSearchTerm) ||
      paymentDate.includes(sanitizedSearchTerm)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>결제 정보</h2>
        <div className={styles.button_group}>
          <SearchInput
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="결제 정보 검색"
          />
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
            {paymentsInfo &&
              filteredPayments.map((payment) => {
                const paymentState = getPaymentState(
                  payment.paymentFee,
                  payment.lecture.lectureFee,
                );

                return (
                  <tr
                    key={payment.paymentId}
                    onClick={() => handlePaymentClick(payment.paymentId)}>
                    <td>{payment.user.name}</td>
                    <td>{payment.lecture.lectureTitle}</td>
                    <td>{`${feeFormat(payment.lecture.lectureFee)} 원`}</td>
                    <td>{`${feeFormat(payment.paymentFee)} 원`}</td>
                    <td>{paymentState}</td>
                    <td>{payment.paymentDate ? payment.paymentDate : '-'}</td>

                    <td>
                      <PaymentButton
                        type="payment"
                        id={payment.paymentId}
                        disabled={paymentState === PaymentState.COMPLETE}
                      />
                    </td>
                  </tr>
                );
              })}
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
