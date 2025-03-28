'use server';

import { notFound } from 'next/navigation';

import { RegistrationProps } from '@types';
import { Fetch } from '@utils';

export async function createRegistration(lectureId: number): Promise<{
  status: boolean;
  statusCode?: number;
  message: string;
  data: RegistrationProps;
}> {
  const result = await Fetch<{
    status: boolean;
    statusCode?: number;
    message: string;
    data: RegistrationProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/registration/${lectureId}`,
    method: 'POST',
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });

  if (result.status) {
    return result;
  } else if (result.statusCode === 403) {
    return result;
  } else {
    return notFound();
  }
}
