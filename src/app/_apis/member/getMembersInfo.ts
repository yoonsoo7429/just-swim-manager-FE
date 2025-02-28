'use server';

import { notFound } from 'next/navigation';

import { MemberInfoForLectureProps } from '@types';
import { Fetch } from '@utils';

export async function getMembersInfo(
  lectureId?: string,
): Promise<MemberInfoForLectureProps[]> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/member`;

  if (lectureId) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/member?lectureId=${lectureId}`;
  }

  const result = await Fetch<{
    status: boolean;
    message: string;
    data: MemberInfoForLectureProps[];
  }>({
    url,
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
