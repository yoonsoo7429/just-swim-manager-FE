'use server';

import { notFound } from 'next/navigation';

import { CustomerProps } from '@types';
import { Fetch } from '@utils';

export async function getCustomersInfo(): Promise<CustomerProps[]> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: CustomerProps[];
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/customer`,
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
