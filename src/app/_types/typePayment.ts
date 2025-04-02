import { CustomerProps } from './typeCustomer';
import { LectureProps } from './typeLecture';
import { RegistrationProps } from './typeRegistration';
import { UserProps } from './typeUser';

export enum PaymentState {
  COMPLETE = '결제 완료',
  ADDITIONAL_REQUIRED = '추가 결제 필요',
  PENDING = '결제 필요',
}

export interface PaymentProps {
  paymentId: string;
  user: UserProps;
  lecture: LectureProps;
  registration: RegistrationProps;
  paymentFee: string;
  paymentDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentBasicProps {
  lectureId: number | undefined;
  userId: number | undefined;
  paymentFee: string;
  paymentDate: string | null;
}

export interface PaymentDetailProps extends PaymentProps {
  lectureTitle: string;
}
