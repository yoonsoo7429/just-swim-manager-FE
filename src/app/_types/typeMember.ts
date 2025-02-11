import { CustomerProps } from './typeCustomer';

export interface MemberProps {
  memberId: string;
  customerId: string;
  lectureId: string;
  memberRegistrationDate: string;
  memberCreatedAt: string;
  memberUpdatedAt: string;
  memberDeletedAt: string | null;
}

export interface MemberInfoForLectureProps extends MemberProps {
  customer: CustomerProps;
}
