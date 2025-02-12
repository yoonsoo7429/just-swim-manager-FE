'use server';

import { notFound } from 'next/navigation';

import { LectureBasicProps, LectureProps } from '@types';
import { Fetch } from '@utils';

export async function createLecture(data: LectureBasicProps): Promise<{
  status: boolean;
  message: string;
  data: LectureProps;
}> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: LectureProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/lecture`,
    method: 'POST',
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
