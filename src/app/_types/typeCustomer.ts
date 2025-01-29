import { LectureForDashboardProps } from './typeLecture';
import { PaymentProps } from './typePayment';

export interface CustomerProps {
  customerId: string;
  name: string;
  gender: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
  customerCreatedAt: string;
  customerUpdatedAt: string;
  customerDeletedAt: string | null;
}

export interface CustomerDetailProps {
  customer: CustomerProps;
  lecture: LectureForDashboardProps[];
  payment: PaymentProps[];
}
