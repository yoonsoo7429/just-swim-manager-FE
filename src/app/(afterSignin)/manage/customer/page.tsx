'use client';

import { getCustomerDetail } from '@/_apis';
import styles from './page.module.scss';

import { getCustomersInfo } from '@apis';
import { CustomerDetailProps, CustomerProps } from '@types';
import { useEffect, useState } from 'react';
import {
  CustomerDetailInfoModal,
  AddButton,
  EditButton,
  ExportExcelModal,
} from '@components';
import { UploadExcelModal } from '@/_components/modal/uploadExcelModal';

export default function CustomerPage() {
  const [customersInfo, setCustomersInfo] = useState<CustomerProps[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetailProps | null>(null);
  const [isCustomerDetailModalOpen, setIsCustomerDetailModalOpen] =
    useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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

  const handleCustomerClick = async (id: string) => {
    try {
      const customerDetail = await getCustomerDetail(id);
      setSelectedCustomer(customerDetail);
      setIsCustomerDetailModalOpen(true);
    } catch (error) {
      console.error('Error fetching customer detail', error);
    }
  };

  const handleCloseModal = () => {
    setIsCustomerDetailModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>고객 관리</h2>
        <div className={styles.button_group}>
          <AddButton type="customer" />
          <button
            className={styles.upload_excel_button}
            onClick={() => setIsUploadModalOpen(true)}>
            엑셀 Upload
          </button>
          <button
            className={styles.export_excel_button}
            onClick={() => setIsExportModalOpen(true)}>
            엑셀 Export
          </button>
        </div>
      </div>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customersInfo.map((customer) => (
              <tr
                key={customer.customerId}
                onClick={() => handleCustomerClick(customer.customerId)}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.birthDate}</td>
                <td>{customer.gender}</td>
                <td>
                  {new Date(customer.customerCreatedAt).toLocaleDateString(
                    'ko-KR',
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    },
                  )}
                </td>
                <td>
                  <EditButton type="customer" id={customer.customerId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCustomerDetailModalOpen && selectedCustomer && (
        <CustomerDetailInfoModal
          detailInfo={selectedCustomer}
          hideModal={handleCloseModal}
        />
      )}

      {isUploadModalOpen && (
        <UploadExcelModal onClose={() => setIsUploadModalOpen(false)} />
      )}

      {isExportModalOpen && (
        <ExportExcelModal onClose={() => setIsExportModalOpen(false)} />
      )}
    </div>
  );
}
