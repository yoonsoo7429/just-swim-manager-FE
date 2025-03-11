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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
