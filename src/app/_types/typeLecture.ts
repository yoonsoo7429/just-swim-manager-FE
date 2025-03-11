import { MemberDetailProps } from './typeMember';

export enum LectureLevel {
  BEGGINER_LEVEL = '초급',
  INTERMEDIATE_LEVEL = '중급',
  ADVANCED_LEVEL = '상급',
  MASTER_LEVEL = '마스터즈',
}

export interface LectureProps {
  lectureId: string;
  lectureTitle: string;
  lectureLevel: LectureLevel;
  lectureDays: string;
  lectureTime: string;
  lectureFee: string;
  lectureCapacity: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  member: MemberDetailProps[];
}

export interface LectureDetailProps extends LectureProps {}

export interface LectureBasicProps {
  lectureTitle: string;
  lectureLevel: LectureLevel;
  lectureDays: string;
  lectureTime: string;
  lectureFee: string;
  lectureCapacity: number;
}
