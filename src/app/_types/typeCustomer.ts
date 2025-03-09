import { LectureForDashboardProps } from './typeLecture';
import { PaymentDetailProps } from './typePayment';
import { UserProps } from './typeUser';

export enum CustomerProgress {
  FREE_K = '자유형K',
  FREE_S = '자유형S',
  FREE_C = '자유형C',
  BACK_K = '배영K',
  BACK_S = '배영S',
  BACK_C = '배영C',
  BREAST_K = '평영K',
  BREAST_S = '평영S',
  BREAST_C = '평영C',
  BUTTERFLY_K = '접영K',
  BUTTERFLY_S = '접영S',
  BUTTERFLY_C = '접영C',
}

export const ProgressColorMap = {
  [CustomerProgress.FREE_K]: '#3498db',
  [CustomerProgress.FREE_S]: '#1abc9c',
  [CustomerProgress.FREE_C]: '#e74c3c',
  [CustomerProgress.BACK_K]: '#9b59b6',
  [CustomerProgress.BACK_S]: '#f39c12',
  [CustomerProgress.BACK_C]: '#16a085',
  [CustomerProgress.BREAST_K]: '#2ecc71',
  [CustomerProgress.BREAST_S]: '#8e44ad',
  [CustomerProgress.BREAST_C]: '#e67e22',
  [CustomerProgress.BUTTERFLY_K]: '#e74c3c',
  [CustomerProgress.BUTTERFLY_S]: '#f39c12',
  [CustomerProgress.BUTTERFLY_C]: '#2ecc71',
};

export interface CustomerProps {
  customerId: string;
  user: UserProps;
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
  phoneNumber: string;
  birthDate: string;
  address: string;
  progress: CustomerProgress;
}
