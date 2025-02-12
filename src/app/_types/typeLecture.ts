import { MemberInfoForLectureProps } from './typeMember';

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
  lectureCapacity: number;
  lectureCreatedAt: string;
  lectureUpdatedAt: string;
  lectureDeletedAt: string | null;
}

export interface LectureForDashboardProps extends LectureProps {
  member: MemberInfoForLectureProps[];
}

export interface LectureBasicProps {
  lectureTitle: string;
  lectureLevel: LectureLevel;
  lectureDays: string;
  lectureTime: string;
  lectureFee: string;
  lectureCapacity: number;
}
