import { LectureProps } from './typeLecture';
import { PaymentProps } from './typePayment';
import { UserProps } from './typeUser';

export interface RegistrationProps {
  registrationId: string;
  user: UserProps;
  lecture: LectureProps;
  payment: PaymentProps[];
  approve: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
