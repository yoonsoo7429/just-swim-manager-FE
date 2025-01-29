import { CustomerProps } from './typeCustomer';
import { LectureForDashboardProps } from './typeLecture';
import { PaymentProps } from './typePayment';

export interface DashboardProps {
  customers: CustomerProps[];
  lectures: LectureForDashboardProps[];
  payments: PaymentProps[];
}
