'use server';

import { notFound } from 'next/navigation';

import { Fetch } from '@utils';

export async function deletePayment(id: string): Promise<{
  status: boolean;
  message: string;
}> {
  const result = await Fetch<{
    status: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`,
    method: 'DELETE',
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });

  if (!result.status) {
    return notFound();
  }

  return result;
}
