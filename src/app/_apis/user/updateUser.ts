'use server';

import { notFound } from 'next/navigation';

import { UpdateUserProps } from '@types';
import { Fetch } from '@utils';

export async function updateUser(
  data: UpdateUserProps,
): Promise<{ status: boolean; message: string }> {
  const result = await Fetch<{
    status: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/userInfo`,
    method: 'PATCH',
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
