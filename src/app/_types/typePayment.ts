import { CustomerProps } from './typeCustomer';
import { LectureProps } from './typeLecture';

export interface PaymentProps {
  paymentId: string;
  customerId: string;
  lectureId: string;
  paymentFee: string;
  paymentDate: string;
  paymentCreatedAt: string;
  paymentUpdatedAt: string;
  paymentDeletedAt: string | null;
}

export interface PaymentForDashboardProps extends PaymentProps {
  customer: CustomerProps;
  lecture: LectureProps;
}

export interface PaymentBasicProps {
  customerId: number;
  lectureId: number;
  paymentFee: string;
  paymentDate: string;
}
