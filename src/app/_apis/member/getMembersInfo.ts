'use server';

import { notFound } from 'next/navigation';

import { MemberProps } from '@types';
import { Fetch } from '@utils';

export async function getMembersInfo(
  lectureId?: string,
): Promise<MemberProps[]> {
  const result = await Fetch<{
    status: boolean;
    message: string;
    data: MemberProps[];
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/member`,
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
