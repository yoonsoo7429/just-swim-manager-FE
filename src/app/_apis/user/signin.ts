'use server';

import { HTTP_METHODS, HTTP_STATUS } from '@data';

export async function signin(params: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Oauth/${params}`,
    { method: HTTP_METHODS.GET },
  );

  if (response.status === HTTP_STATUS.OK) {
    return response.url as string;
  }
}
