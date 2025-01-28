import { CustomerProps } from './typeCustomer';
import { LectureForBashboardProps } from './typeLecture';
import { PaymentProps } from './typePayment';

export interface DashboardProps {
  customers: CustomerProps[];
  lectures: LectureForBashboardProps[];
  payments: PaymentProps[];
}
