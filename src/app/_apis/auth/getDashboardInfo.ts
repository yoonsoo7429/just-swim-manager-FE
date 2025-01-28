'use server';

import { notFound } from 'next/navigation';

import { DashboardProps } from '@types';
import { Fetch } from '@utils';

export async function getDashboardInfo(): Promise<DashboardProps> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: DashboardProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
    method: 'GET',
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });
  console.log(result);

  if (result.status) {
    return result.data;
  } else {
    return notFound();
  }
}
