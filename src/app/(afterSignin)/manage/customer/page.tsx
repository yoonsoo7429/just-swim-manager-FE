'use client';

import styles from './page.module.scss';

import { getCustomersInfo } from '@apis';
import { CustomerProps } from '@types';
import { useEffect, useState } from 'react';

export default function CustomerPage() {
  const [customersInfo, setCustomersInfo] = useState<CustomerProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersInfo = await getCustomersInfo();
        setCustomersInfo(customersInfo);
      } catch (error) {
        console.error('Error fetching CustomerInfo', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>고객 관리</h2>
      <div className={styles.dashboard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>주소</th>
              <th>전화번호</th>
              <th>생년월일</th>
              <th>성별</th>
              <th>서비스 가입일</th>
            </tr>
          </thead>
          <tbody>
            {customersInfo.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.birthDate}</td>
                <td>{customer.gender}</td>
                <td>
                  {new Date(customer.customerCreatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
