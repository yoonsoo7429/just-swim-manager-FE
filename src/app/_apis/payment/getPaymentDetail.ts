'use server';

import { notFound } from 'next/navigation';

import { PaymentProps } from '@types';
import { Fetch } from '@utils';

export async function getPaymentDetail(
  paymentId: number,
): Promise<PaymentProps> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: PaymentProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/payment/${paymentId}`,
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
