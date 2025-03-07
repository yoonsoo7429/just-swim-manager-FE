import { UserProps } from './typeUser';

export interface InstructorProps {
  instructorId: string;
  user: UserProps;
  workingLocation: string;
  career: string;
  history: string;
  introduction: string;
  curriculum: string;
  youtubeLink: string;
  instagramLink: string;
  facebookLink: string;
  instructorCreatedAt: string;
  instructorUpdatedAt: string;
  instructorDeletedAt: string | null;
}
