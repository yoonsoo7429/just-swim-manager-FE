'use server';

import { PaymentBasicProps } from '@types';
import { Fetch } from '@utils';

export async function updatePayment(
  data: PaymentBasicProps,
  id: string,
): Promise<{ status: boolean; message: string }> {
  const result = await Fetch<{
    status: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`,
    method: 'PATCH',
    header: {
      token: true,
      json: true,
      credential: true,
    },
    body: data,
  });

  return result;
}
