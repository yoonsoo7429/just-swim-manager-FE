'use server';

import { notFound } from 'next/navigation';

import { PaymentForDashboardProps } from '@types';
import { Fetch } from '@utils';

export async function getPaymentDetail(
  id: string,
): Promise<PaymentForDashboardProps> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: PaymentForDashboardProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`,
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
