'use server';

import { notFound } from 'next/navigation';

import { LectureForDashboardProps } from '@types';
import { Fetch } from '@utils';

export async function getLecturesInfo(): Promise<LectureForDashboardProps[]> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: LectureForDashboardProps[];
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/lecture`,
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
