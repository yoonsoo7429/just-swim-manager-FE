'use server';

import { UserEntity } from '@/_types';
import { HTTP_METHODS } from '@data';
import api from '../api';

export const postSignin = async (data: UserEntity) => {
  return await api('/signin', HTTP_METHODS.POST, {
    body: JSON.stringify(data),
  });
};
