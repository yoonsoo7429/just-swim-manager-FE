'use server';

import { AdminEntity } from '@/_types';
import { HTTP_METHODS } from '@data';
import api from '../api';

export const postAdminSignin = async (data: AdminEntity) => {
  return await api('/signin', HTTP_METHODS.POST, {
    body: JSON.stringify(data),
  });
};
