'use server';

import { notFound } from 'next/navigation';

import { CustomerDetailProps } from '@types';
import { Fetch } from '@utils';

export async function getCustomerDetail(
  id: string,
): Promise<CustomerDetailProps> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: CustomerDetailProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`,
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
