'use server';

import { notFound } from 'next/navigation';

import { CustomerBasicProps, CustomerProps } from '@types';
import { Fetch } from '@utils';

export async function createCustomer(data: CustomerBasicProps): Promise<{
  status: boolean;
  message: string;
  data: CustomerProps;
}> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: CustomerProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/customer`,
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
