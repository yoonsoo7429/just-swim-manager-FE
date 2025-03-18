import { LectureProps } from './typeLecture';
import { UserProps } from './typeUser';

export interface RegistrationProps {
  registrationId: string;
  user: UserProps;
  lecture: LectureProps;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
