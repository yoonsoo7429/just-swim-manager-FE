'use server';

import { notFound } from 'next/navigation';

import { LectureDetailProps } from '@types';
import { Fetch } from '@utils';

export async function getLectureDetail(
  lectureId: number,
): Promise<LectureDetailProps> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: LectureDetailProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/lecture/${lectureId}`,
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
