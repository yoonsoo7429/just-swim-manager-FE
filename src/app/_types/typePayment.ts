import { CustomerProps } from './typeCustomer';
import { LectureProps } from './typeLecture';

export enum PaymentState {
  COMPLETE = '결제 완납',
  ADDITIONAL_REQUIRED = '추가 결제 필요',
  PENDING = '결제 필요',
}

export interface PaymentProps {
  paymentId: string;
  customerId: string;
  lectureId: string;
  paymentFee: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PaymentForDashboardProps extends PaymentProps {
  customer: CustomerProps;
  lecture: LectureProps;
}

export interface PaymentBasicProps {
  customerId: string | undefined;
  lectureId: string | undefined;
  paymentFee: string;
  paymentDate: string;
}

export interface PaymentDetailProps extends PaymentProps {
  lectureTitle: string;
}
