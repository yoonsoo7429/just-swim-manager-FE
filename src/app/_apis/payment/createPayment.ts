'use server';

import { notFound } from 'next/navigation';

import { PaymentBasicProps, PaymentProps } from '@types';
import { Fetch } from '@utils';

export async function createPayment(data: PaymentBasicProps): Promise<{
  status: boolean;
  message: string;
  data: PaymentProps;
}> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: PaymentProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/payment`,
    method: 'POST',
    header: {
      token: true,
      json: true,
      credential: true,
    },
    body: data,
  });

  if (result.status) {
    return result;
  } else {
    return notFound();
  }
}
