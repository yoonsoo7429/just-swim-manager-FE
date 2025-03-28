'use server';

import { notFound } from 'next/navigation';

import { LectureProps } from '@types';
import { Fetch } from '@utils';

export async function getLecturesInfo(): Promise<LectureProps[]> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: LectureProps[];
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
