'use server';

import { cookies } from 'next/headers';

export const setTokenInCookies = async (token: string) => {
  (await cookies()).set('authorization', token);

  return token;
};

export const getTokenInCookies = async () => {
  const token = (await cookies()).get('authorization')?.value;

  return token || '';
};

export const removeTokenInCookies = async () => {
  (await cookies()).set('authorization', '', {
    expires: new Date(0),
  });

  return;
};
