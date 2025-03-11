import { LectureDetailProps } from './typeLecture';
import { PaymentDetailProps } from './typePayment';
import { UserProps } from './typeUser';

export interface CustomerProps {
  customerId: string;
  user: UserProps;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
