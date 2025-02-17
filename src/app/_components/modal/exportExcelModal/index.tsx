'use client';

import { excelModalProps } from '@types';
import { useState } from 'react';

import styles from './styles.module.scss';
import { getTokenInCookies } from '@utils';

export function ExportExcelModal({ onClose }: excelModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExport = async () => {
    setIsDownloading(true);

    const token = await getTokenInCookies();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/export/excel`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = '고객 정보.xlsx';
        link.click();

        onClose();
      } else {
        alert('엑셀 파일을 생성하는데 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('엑셀 파일 다운로드 중 오류 발생:', error);
      alert('엑셀 파일 다운로드에 실패했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal_content}>
        <h3>고객 정보 내보내기</h3>
        <div className={styles.button_box}>
          <button onClick={onClose}>취소</button>
          <button onClick={handleExport} disabled={isDownloading}>
            {isDownloading ? '다운로드 중...' : '엑셀 다운로드'}
          </button>
        </div>
      </div>
    </div>
  );
}
