import { SNS, USER_GENDER, USER_TYPE } from '@data';
import { CustomerProps } from './typeCustomer';
import { InstructorProps } from './typeInstructor';

export type Provider = (typeof SNS)[keyof typeof SNS];
export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];

export interface UserBasicProps {
  userType: UserType;
  provider: Provider;
  gender: UserGender;
  email: string;
  name: string;
  birth: string;
  address: string;
  phoneNumber: string;
}

export interface UpdateUserProps extends Partial<UserBasicProps> {}

export interface UserProps {
  userId: string;
  userType: UserType;
  provider: Provider;
  gender: UserGender;
  email: string;
  name: string;
  birth: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserDetailProps extends UserProps {
  customer: CustomerProps | null;
  instructor: InstructorProps | null;
}
