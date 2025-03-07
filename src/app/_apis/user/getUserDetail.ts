'use server';

import { notFound } from 'next/navigation';

import { UserDetailProps } from '@types';
import { Fetch } from '@utils';

export async function getUserDetail(): Promise<UserDetailProps> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: UserDetailProps;
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
    return result.data;
  } else {
    return notFound();
  }
}
