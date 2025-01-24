'use server';

import { cookies } from 'next/headers';

export const setTokenInCookies = async (token: string) => {
  (await cookies()).set('token', token);

  return token;
};

export const getTokenInCookies = async () => {
  const token = (await cookies()).get('token')?.value;

  return token || '';
};

export const removeTokenInCookies = async () => {
  (await cookies()).set('token', '', {
    expires: new Date(0),
  });

  return;
};
