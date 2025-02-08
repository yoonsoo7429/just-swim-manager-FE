'use server';

import { notFound } from 'next/navigation';

import { CustomerBasicProps } from '@types';
import { Fetch } from '@utils';

export async function uploadExcel(file: File): Promise<{
  status: boolean;
  message: string;
  data: CustomerBasicProps[];
}> {
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData.get('file'));

  try {
    const result = await Fetch<{
      status: boolean;
      message: string;
      data: CustomerBasicProps[];
    }>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/uploads/excel`,
      method: 'POST',
      header: {
        token: true,
        json: false,
        credential: true,
      },
      body: formData,
    });
    console.log(result);

    if (!result) {
      throw new Error('파일 업로드 요청 실패');
    }

    if (!result.status) {
      return notFound();
    }

    return result;
  } catch (error) {
    console.error('업로드 중 오류 발생:', error);
    throw error;
  }
}
