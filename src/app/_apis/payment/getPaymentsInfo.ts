'use server';

import { notFound } from 'next/navigation';

import { PaymentProps } from '@types';
import { Fetch } from '@utils';

export async function getPaymentsInfo(
  lectureId?: number,
): Promise<PaymentProps[]> {
  const query = lectureId ? `?lectureId=${lectureId}` : '';

  const result = await Fetch<{
    status: boolean;
    message: string;
    data: PaymentProps[];
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/payment${query}`,
    method: 'GET',
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });

  if (result.status) {
    return result.data;
  } else {
    return notFound();
  }
}
