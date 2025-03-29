'use server';

import { notFound } from 'next/navigation';

import { RegistrationProps } from '@types';
import { Fetch } from '@utils';

export async function getRegistrationsInfo(): Promise<RegistrationProps[]> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: RegistrationProps[];
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/registration`,
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
