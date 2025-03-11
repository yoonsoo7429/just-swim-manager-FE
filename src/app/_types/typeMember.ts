import { CustomerProps } from './typeCustomer';
import { LectureProps } from './typeLecture';
import { UserProps } from './typeUser';

export enum MemberProgress {
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
  [MemberProgress.FREE_K]: '#3498db',
  [MemberProgress.FREE_S]: '#1abc9c',
  [MemberProgress.FREE_C]: '#e74c3c',
  [MemberProgress.BACK_K]: '#9b59b6',
  [MemberProgress.BACK_S]: '#f39c12',
  [MemberProgress.BACK_C]: '#16a085',
  [MemberProgress.BREAST_K]: '#2ecc71',
  [MemberProgress.BREAST_S]: '#8e44ad',
  [MemberProgress.BREAST_C]: '#e67e22',
  [MemberProgress.BUTTERFLY_K]: '#e74c3c',
  [MemberProgress.BUTTERFLY_S]: '#f39c12',
  [MemberProgress.BUTTERFLY_C]: '#2ecc71',
};

export interface MemberProps {
  memberId: string;
  user: UserProps;
  lecture: LectureProps;
  memberProgress: MemberProgress;
  memberRegistrationDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MemberDetailProps extends MemberProps {
  user: UserProps;
}
