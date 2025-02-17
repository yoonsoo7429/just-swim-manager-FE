'use client';

import { UploadExcelModalProps } from '@types';
import { useState } from 'react';

import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { getTokenInCookies } from '@utils';

export function UploadExcelModal({ onClose }: UploadExcelModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('엑셀 파일을 선택해주세요.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const token = await getTokenInCookies();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploads/excel`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.status) {
        onClose();
        router.refresh();
      }
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal_content}>
        <h3>엑셀 업로드</h3>
        <input
          name="file"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />
        <div className={styles.button_box}>
          <button onClick={onClose}>취소</button>
          <button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </div>
    </div>
  );
}
