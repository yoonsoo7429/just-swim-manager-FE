import { LectureProps } from './typeLecture';
import { MemberProgress } from './typeMember';
import { PaymentProps } from './typePayment';
import { UserProps } from './typeUser';

export interface RegistrationProps {
  registrationId: string;
  user: UserProps;
  lecture: LectureProps;
  payment: PaymentProps[];
  approve: boolean;
  registrationProgress: MemberProgress;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
