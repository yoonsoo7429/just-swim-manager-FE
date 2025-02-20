import { LectureForDashboardProps } from './typeLecture';
import { PaymentDetailProps } from './typePayment';

export enum CustomerGender {
  Man = '남자',
  Woman = '여자',
}

export interface CustomerProps {
  customerId: string;
  name: string;
  gender: CustomerGender;
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
  payment: PaymentDetailProps[];
}

export interface CustomerBasicProps {
  name: string;
  gender: CustomerGender;
  phoneNumber: string;
  birthDate: string;
  address: string;
}
