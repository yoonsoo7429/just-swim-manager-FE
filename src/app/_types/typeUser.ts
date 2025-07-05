import { SNS, USER_TYPE, STATUS } from '@data';

export type Provider = (typeof SNS)[keyof typeof SNS];
export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
export type Status = (typeof STATUS)[keyof typeof STATUS];

export interface UserBasicProps {
  userType: UserType;
  provider: Provider;
  email: string;
  name: string;
  birth: string;
  phoneNumber: string;
  profileImage: string;
  instructorStatus: Status | null;
}

export interface UpdateUserProps extends Partial<UserBasicProps> {}

export interface UserProps {
  userId: string;
  userType: UserType;
  provider: Provider;
  email: string;
  name: string;
  birth: string;
  phoneNumber: string;
  profileImage: string;
  instructorStatus: Status | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
