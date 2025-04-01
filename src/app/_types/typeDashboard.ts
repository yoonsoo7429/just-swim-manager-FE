import { CustomerProps } from './typeCustomer';
import { LectureDetailProps, LectureProps } from './typeLecture';
import { MemberProps } from './typeMember';
import { PaymentProps } from './typePayment';
import { RegistrationProps } from './typeRegistration';

export interface DashboardProps {
  customers?: CustomerProps[];
  lectures: LectureProps[] | MemberProps[];
  payments: PaymentProps[];
  registrations: RegistrationProps[];
}
