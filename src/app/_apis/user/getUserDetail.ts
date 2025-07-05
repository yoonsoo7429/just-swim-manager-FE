'use server';

import { notFound } from 'next/navigation';

import { UserProps } from '@types';
import { Fetch } from '@utils';

export async function getUserDetail(): Promise<{
  status: number;
  message: string;
  data: UserProps;
}> {
  const result = await Fetch<{
    status: number;
    message: string;
    data: UserProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
    method: 'GET',
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
