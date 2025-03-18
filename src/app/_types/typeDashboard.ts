import { CustomerProps } from './typeCustomer';
import { LectureDetailProps } from './typeLecture';
import { PaymentProps } from './typePayment';
import { RegistrationProps } from './typeRegistration';

export interface DashboardProps {
  customers: CustomerProps[];
  lectures: LectureDetailProps[];
  payments: PaymentProps[];
  registrations: RegistrationProps[];
}
