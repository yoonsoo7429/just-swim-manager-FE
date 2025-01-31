'use server';

import { notFound } from 'next/navigation';

import { CustomerBasicProps, CustomerDetailProps } from '@types';
import { Fetch } from '@utils';

export async function updateCustomer(
  data: CustomerBasicProps,
  id: string,
): Promise<{ status: boolean; message: string }> {
  const result = await Fetch<{
    status: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`,
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
