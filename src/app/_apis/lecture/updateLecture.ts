'use server';

import { LectrueBasicProps } from '@types';
import { Fetch } from '@utils';

export async function updateLecture(
  data: LectrueBasicProps,
  id: string,
): Promise<{ status: boolean; message: string }> {
  const result = await Fetch<{
    status: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/lecture/${id}`,
    method: 'PATCH',
    header: {
      token: true,
      json: true,
      credential: true,
    },
    body: data,
  });

  return result;
}
