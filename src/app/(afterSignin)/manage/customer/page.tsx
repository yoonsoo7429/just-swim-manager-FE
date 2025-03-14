'use client';

import { getMemberDetail, getMembersInfo } from '@/_apis';
import styles from './page.module.scss';

import { MemberProps, ProgressColorMap } from '@types';
import { useEffect, useState } from 'react';
import { CustomerDetailInfoModal, ExportExcelModal } from '@components';
import { UploadExcelModal } from '@/_components/modal/uploadExcelModal';
import { dateFormate } from '@utils';

export default function CustomerPage() {
  const [customersInfo, setCustomersInfo] = useState<MemberProps[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<MemberProps | null>(
    null,
  );
  const [isCustomerDetailModalOpen, setIsCustomerDetailModalOpen] =
    useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersInfo = await getMembersInfo();
        setCustomersInfo(membersInfo);
      } catch (error) {
        console.error('Error fetching MemberInfo', error);
      }
    };
    fetchData();
  }, []);

  const handleCustomerClick = async (id: string) => {
    try {
      const customerDetail = await getMemberDetail(parseInt(id));
      setSelectedCustomer(customerDetail);
      setIsCustomerDetailModalOpen(true);
    } catch (error) {
      console.error('Error fetching member detail', error);
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
              <th>성별</th>
              <th>전화번호</th>
              <th>강습명</th>
              <th>생년월일</th>
              <th>주소</th>
              <th>서비스 가입일</th>
            </tr>
          </thead>
          <tbody>
            {customersInfo.map((member) => (
              <tr
                key={member.memberId}
                onClick={() => handleCustomerClick(member.memberId)}>
                <td>{member.user.name}</td>
                <td>{member.user.gender}</td>
                <td>{member.user.phoneNumber}</td>
                <td>{member.lecture.lectureTitle}</td>
                <td>{member.user.birth}</td>
                <td>{member.user.address}</td>
                <td>{dateFormate(member.user.createdAt)}</td>
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
