'use server';

import { AdminEntity } from '@/_types';
import api from '../api';
import { HTTP_METHODS } from '@data';

export const postAdminSignin = async (data: AdminEntity) => {
  return await api('/auth/signin', HTTP_METHODS.POST, {
    body: JSON.stringify(data),
  });
};
