'use server';

import { notFound } from 'next/navigation';

import { Fetch } from '@utils';

export async function approveRegistration(registrationId: number): Promise<{
  status: boolean;
  message: string;
}> {
  const result = await Fetch<{
    status: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/registration/${registrationId}`,
    method: 'PATCH',
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });

  if (result.status) {
    return result;
  } else {
    return notFound();
  }
}
